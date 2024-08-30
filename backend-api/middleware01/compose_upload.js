const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/compose/') // make sure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

// Initialize upload variable
const compose_upload = multer({
  storage: storage,
  limits: { fileSize: 300000000 }, // 1MB file size limit is incorrect in the comment, it's actually 300MB as per 300000000 bytes
  // Add file filter here if needed
}).array('files', 30); // 'files' is the name of the input field, 30 is the max number of files

exports.compose_upload = compose_upload;
