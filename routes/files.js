const express = require('express');

const filesController = require('../controllers/files');

const router = express.Router();

router.get('/names', filesController.getFilenames);
router.post('/upload', filesController.uploadFile);
router.get('/download', filesController.downloadFile);

module.exports = router;