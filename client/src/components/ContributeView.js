import {useContext, useState} from "react";
import useApi, {callApi} from "../hooks/useAPI";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

function ContributeView() {
  const {user} = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [theme, setTheme] = useState('');
  const [contentUrl, setContentUrl] = useState('');
  const {data: basicCatalogs} = useApi("contents/get-basic-catalogs");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError(false);

    if (![title, category, theme].every(
        item => item !== ""
    )) {
      setError("Por favor llena todos los campos obligatorios");
      return;
    }

    try {
      const response = await callApi(user, "contents/create", "post", {
        title, category, theme, contentUrl, createdBy: user._id
      });

      if (response.hasOwnProperty("error")) {
        setError(response.error.serverMessage);
        return;
      }

      setTitle("");
      setDescription("");
      setContentUrl("");
      setTheme("");
      setCategory("");

      alert("Contenido creado correctamente");

      navigate("/")

    } catch (error) {
      setError("Por favor llena todos los campos");
    }
  };

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleThemeChange = (event) => setTheme(event.target.value);
  const handleCategoryChange = (event) => setCategory(event.target.value);
  const handleContentURLChange = (event) => setContentUrl(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);


  return (
      <div style={{
        background: 'linear-gradient(270deg, #3b82f6, #6366f1)',
        backgroundSize: '300% 100%',
        animation: 'gradient-animation 10s ease infinite',
      }} className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full space-y-8 shadow-lg p-6 bg-white" style={{borderRadius: "30px"}}>

          <div>
            <h2 className="mt-6 text-center text-3xl font-black text-black">Crear contenido</h2>
            <p className="text-center text-sm mt-1">Los campos con * son obligatorios</p>
            <form className="mt-8 space-y-6">

              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="title" className="sr-only">Título</label>
                  <input id="title" name="title" value={title} onChange={handleTitleChange} type="text"
                         autoComplete="title" required
                         className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-blue-500
                  focus:border-blue-500 focus:z-10 sm:text-sm"
                         placeholder="Título *"/>
                </div>
                <div>
                  <label htmlFor="description" className="sr-only">Descripción</label>
                  <input id="description" value={description} onChange={handleDescriptionChange} name="description"
                         type="text"
                         autoComplete="description" required
                         className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-blue-500
                  focus:border-blue-500 focus:z-10 sm:text-sm"
                         placeholder="Descripción"/>
                </div>
                <div>
                  <label htmlFor="contentUrl" className="sr-only">URL contenido</label>
                  <input id="contentUrl" value={contentUrl} onChange={handleContentURLChange} name="contentUrl"
                         type="text"
                         autoComplete="contentUrl" required
                         className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-blue-500
                  focus:border-blue-500 focus:z-10 sm:text-sm"
                         placeholder="URL contenido"/>
                </div>
                <div>
                  <label htmlFor="theme" className="sr-only">Tema</label>
                  <select value={theme} onChange={handleThemeChange} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                     placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500
                     focus:border-blue-500 focus:zfocus:border-blue-500 focus:z-10 sm:text-sm" name="theme" id="theme">
                    <option value="" disabled>Elige un tema *</option>
                    {basicCatalogs?.themes?.map(theme => (
                        <option key={theme._id} value={theme._id}>{theme.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="category" className="sr-only">Categoría</label>
                  <select value={category} onChange={handleCategoryChange} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                     placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500
                     focus:border-blue-500 focus:zfocus:border-blue-500 focus:z-10 sm:text-sm" name="category"
                          id="category">
                    <option value="" disabled>Elige una categoría *</option>
                    {basicCatalogs?.categories?.map(category => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                {

                }
              </div>
              <button onClick={handleSubmit}
                      className="group relative mt-6 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Subir contenido
              </button>

              {error && <div className="text-red-600 text-center my-4 text-1xl">
                {error}
              </div>}
            </form>
          </div>
        </div>
      </div>
  );

}


export default ContributeView;