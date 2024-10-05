// linkRoutes.js
const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController');

router.get('/', (req, res) => res.redirect('/links'));
router.get('/links', linkController.getAllLinks);
router.get('/links/new', linkController.getNewLinkForm);
router.post('/links', linkController.createLink);

// Routes for editing and deleting links
router.get('/links/:id/edit', linkController.editLink);
router.post('/links/:id/edit', linkController.updateLink);
router.post('/links/:id/delete', linkController.deleteLink);

module.exports = router;