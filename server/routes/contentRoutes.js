const express = require('express');
/**
 * The `router` variable represents an instance of the Express Router, which is used to create modular
 * routes within an Express application or API. It provides an easy way to define routes for specific
 * URL paths and HTTP methods.
 *
 * @type {Router}
 * @memberOf Express
 */
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const verifyRole = require("../middleware/verifyRole");
const {getAllContents, deleteContent, getBasicCatalogs, createContent} = require("../controllers/contentController");


router.get('/', getAllContents);

router.delete('/delete', verifyRole(["delete"]), deleteContent);

router.get('/get-basic-catalogs', authMiddleware, getBasicCatalogs);

router.post('/create', verifyRole(["create"]), createContent);

module.exports = router;