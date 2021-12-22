const express = require('express');

const filesController = require('../controllers/files');

const router = express.Router();

router.post('/upload', filesController.onFileUpload);
router.get('/download', filesController.onFileDownload);

module.exports = router;