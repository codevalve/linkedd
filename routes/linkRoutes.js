const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController');

router.get('/', (req, res) => res.redirect('/links'));
router.get('/links', linkController.getAllLinks);
router.get('/links/new', linkController.getNewLinkForm);
router.post('/links', linkController.createLink);

module.exports = router;