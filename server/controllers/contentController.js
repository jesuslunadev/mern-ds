const Content = require('../models/ContentStructure');
const Category = require('../models/ContentCategory');
const Theme = require('../models/Theme');
const {wss} = require('../websocket');

/**
 * Retrieves all content documents from the database and attaches related information from referenced models.
 *
 * @param {Object} req - The HTTP request.
 * @param {Object} res - The HTTP response.
 * @returns {Array} An array of the content documents.
 */
exports.getAllContents = async (req, res) => {
  try {
    const contents = await Content.find({})
        .populate("category")
        .populate("createdBy")
        .populate("theme");


    res.status(200).json(contents);
  } catch (error) {
    res.status(500).json({message: "Error al recuperar los contenidos", error: error.message});

  }
};

/**
 * Removes a content document from the database identified by the contentId property in the request body.
 * If successful, send a websocket notification to the connected clients.
 *
 * @param {Object} req - The HTTP request.
 * @param {Object} res - The HTTP response.
 * @returns {Object} An object indicating success.
 */
exports.deleteContent = async (req, res) => {
  try {
    const {contentId} = req.body;
    const content = await Content.findByIdAndDelete(contentId);

    if (!content) {
      return res.status(404).json({message: "No se encontró el recurso"});
    }

    for (const client of wss.clients) {
      if (client.readyState === 1) {
        client.send(JSON.stringify({
          eventType: "deleteContent",
          contentId,
        }));
      }
    }

    res.status(204).json({success: true});
  } catch (error) {
    res.status(500).json({message: "Error al eliminar el contenido", error: error.message});

  }
};

/**
 * Creates a new content document in the database and sends a websocket notification after successful creation.
 * The document data comes from the HTTP request body.
 *
 * @param {Object} req - The HTTP request.
 * @param {Object} res - The HTTP response.
 * @returns {Object} Success indication and newly created document.
 */
exports.createContent = async (req, res) => {
  try {
    const {
      title, category, description, theme, createdBy, contentUrl
    } = req.body;

    let content = await Content.create({
      title, category, description, theme, createdBy, contentUrl
    });

    content = await Content.findById(content._id)
        .populate("category")
        .populate("createdBy")
        .populate("theme");

    for (const client of wss.clients) {
      if (client.readyState === 1) {
        client.send(JSON.stringify({
          eventType: "createContent",
          content,
        }));
      }
    }

    res.status(201).json({success: true});
  } catch (error) {
    res.status(500).json({message: "Error al insertar el contenido", error: error.message});

  }
};

/**
 * Retrieves basic catalogs (categories and themes) uses in the application from the database.
 *
 * @param {Object} req - The HTTP request.
 * @param {Object} res - The HTTP response.
 * @returns {Object} Catalogs (categories and themes).
 */
exports.getBasicCatalogs = async (req, res) => {
  try {
    const categories = await Category.find({});
    const themes = await Theme.find({});
    res.status(200).json({categories, themes});
  } catch (error) {
    res.status(500).json({message: "Error al consultar los datos", error: error.message});

  }
}