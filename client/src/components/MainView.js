import React, {useState, useEffect, useContext} from 'react';
import useApi, {callApi} from "../hooks/useAPI";
import defaultImage from '../assets/default_card_cover.jpeg';
import Badge from "./layout/Badge";
import Navbar from "./layout/Navbar";
import {useAuth} from "../context/AuthContext";
import {WebSocketContext} from "../context/WebsocketContext";


/**
 * Renders a list of content items.
 *
 * @param {Object} contents - An array of content items.
 * @param {string} contents[].coverImage - The URL of the cover image for the content item.
 * @param {string} contents[].title - The title of the content item.
 * @param {Object} contents[].category - The category of the content item.
 * @param {string} contents[].category.name - The name of the category.
 * @param {string} contents[].description - The description of the content item.
 * @param mutate
 * @param {string} contents[].contentUrl - The URL of the content.
 * @param {Object} contents[].createdBy - The creator of the content item.
 * @param {string} contents[].createdBy.username - The username of the creator.
 * @param {string} contents[].createdAt - The creation date of the content item in ISO format.
 *
 * @returns {Component}
 */
const ContentList = ({contents}) => {
  const {user, userIsAdmin, logout} = useAuth();


  const handleDeleteContent = async (contentId) => {
    try {
      await callApi(user, "contents/delete", "delete", {
        contentId
      });
      alert("Eliminado correctamente")
    } catch (error) {
      if (error.status === 401) {
        logout()
      }
      alert("No se pudo eliminar el elemento")
    }
  }


  return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
        {contents?.map((content, index) => {

          const url = content?.category?.name?.toLowerCase() === "videos"
              ? new URL(content.contentUrl)
              : null;

          const videoID = url ? url.searchParams.get("v") : null;

          return (
              <div
                  key={index}
                  className="flex flex-col bg-white rounded-2xl p-5 shadow-md hover:scale-105 transition-all duration-150"
              >
                {
                  content?.category?.name?.toLowerCase() === "videos" ? (
                      <img
                          className="rounded-2xl w-full h-64 object-cover mb-5"
                          src={`https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`}
                          alt="YouTube video thumbnail"
                      />
                  ) : content?.category?.name?.toLowerCase() === "images" ? (
                      <img
                          className="rounded-2xl w-full h-64 object-cover mb-5"
                          src={content.contentUrl || defaultImage}
                          alt="Card"
                      />
                  ) : null
                }
                <h2 className="font-bold text-2xl mb-2 text-gray-900">
                  {content.title}
                </h2>
                <p className="text-gray-700 flex-grow">
                  {content.description}
                </p>
                {content.theme &&
                    <span className="inline-block font-black  rounded-full text-indigo-600 text-md mr-2 my-3">
                      #{content?.theme?.name}
                    </span>
                }

                <hr className="mt-4 mb-4"/>
                {content.category && <Badge>{content?.category?.name}</Badge>}


                <div className="mt-3 flex items-center justify-between">
                  {content.createdBy && user &&
                      <small className="text-gray-500 "> Subido por
                        <span className='capitalize font-black mx-1'>
                          {content.createdBy.username}
                        </span>
                        <span className="mx-1 text-xs italic">
                          {content.createdBy._id === user._id && "(Osea por ti :D)"}
                        </span>
                      </small>
                  }

                  {content.contentUrl && content.category.name === "videos" &&
                      <a
                          className="bg-indigo-500 text-white py-2 px-5 rounded-md transition-colors durarion-200"
                          href={content.contentUrl}
                          rel="noreferrer noopener"
                          target="_blank"
                      > <i className="fa-solid fa-up-right-from-square"></i> Abrir video</a>
                  }
                  {content.contentUrl && content.category.name !== "videos" && <a
                      className="bg-indigo-500 text-white py-2 px-5 rounded-md transition-colors durarion-200"
                      href={content.contentUrl}
                      download
                  ><i className="fa-solid fa-arrow-down"></i> Descargar </a>
                  }

                  {userIsAdmin() &&
                      <button onClick={async () => {
                        await handleDeleteContent(content._id)
                      }}
                              className="bg-red-500 text-white py-2 px-5 rounded-md transition-colors durarion-200"
                      >
                        <i className="fa-solid fa-trash"></i> Eliminar
                      </button>
                  }
                </div>
              </div>
          )
        })}
      </div>
  );
}

/**
 * Represents the main view component.
 * @constructor
 */
const MainView = () => {
  const [contents, setContents] = useState([]);
  const {data} = useApi("contents/", "get", {});
  const {user} = useAuth();
  const {wsMessage} = useContext(WebSocketContext);

  useEffect(() => {
    if (wsMessage) {
      if (wsMessage.eventType === "deleteContent") {
        setContents(contents.filter(
            item => item._id !== wsMessage.contentId)
        );
      }

      if (wsMessage.eventType === "createContent") {
        setContents(prevContents => [...prevContents, wsMessage.content]);
      }

    }
  }, [wsMessage]);

  useEffect(() => {
    setContents(data);
  }, [data]);

  return (
      <div>
        <Navbar/>
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-black text-center my-10 text-var(--turquoise)">
            Bienvenid@{user && <span>, <span className="mx-2 capitalize">
            {user.username}
          </span>
          </span>}
            <i className="fa-solid fa-face-grin-beam text-indigo-500"></i>
          </h1>
          <ContentList contents={contents}/>
        </div>
      </div>
  );
};

export default MainView;