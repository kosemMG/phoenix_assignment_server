const path = require('path');
const fs = require('fs');

const UPLOAD_DIR_NAME = 'MY-FILES';

exports.getFilenames = (req, res) => {
  const uploadPath = path.join(__dirname, '..', UPLOAD_DIR_NAME);
  if (!fs.existsSync(uploadPath)) {
    return res.json([]);
  }

  const files = fs.readdirSync(uploadPath);

  return res.json(files);
};

exports.uploadFile = async (req, res) => {

  const uploadPath = path.join(__dirname, '..', UPLOAD_DIR_NAME);

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const file = req.files['file'];
  const filesBeforeUpload = fs.readdirSync(uploadPath);

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
        files: filesBeforeUpload,
        message: 'No files were uploaded.',
        result: 'failed'
      });
  }

  if (filesBeforeUpload.includes(file.name)) {
    return res.status(400).json({
      files: filesBeforeUpload,
      message: 'File with this name already exists.',
      result: 'failed'
    });
  }

  const uploadFilePath = path.join(uploadPath, file.name);

  try {
    await file.mv(uploadFilePath);
  } catch(err) {
    return res.status(500).json(err);
  }

  const files = fs.readdirSync(uploadPath);

  return res.json({
    files,
    message: 'File uploaded successfully!',
    result: 'succeeded'
  });
};

exports.downloadFile = (req, res) => {
  const { filename } = req.query;
  const file = path.join(__dirname, '..', UPLOAD_DIR_NAME, filename);

  return res.download(file);
};
