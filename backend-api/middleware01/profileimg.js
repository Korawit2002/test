// const multer = require('multer')
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb (null, './public/profile')
//     },
//     filename: (req, file, cb) => {
//         cb (null, 'command-' + Date.now() + '.' +
//         file.originalname.split('.')[file.originalname.split('.').length-1])}
// })

// exports.profile_image = multer({ storage: storage }).single('file');

const multer = require('multer');
const path = require('path');

// // Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/profile') // make sure this directory exists
  },
  filename: (req, file, cb) => {
    // Generates a unique filename with the current timestamp and the file's original extension
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

// // File filter for validating file type
// const fileFilter = (req, file, cb) => {
//   // Allowed file extensions
//   const filetypes = /jpeg|jpg|png/;
//   // Check extension
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   // Check mime type
//   const mimetype = filetypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb(new Error('Error: Images Only! (JPEG, JPG, PNG)'));
//   }
// };

const fileFilter = (req, file, cb) => {
    if(file.mimetype.split("/")[0] === "image") {
        cb(null, true)
    }else{
        cb(new Error('Error: Images Only! (JPEG, JPG, PNG)'))
    }
}

const filenameChanger = (req, file , cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
}

// Initialize upload variable with updated limits and file filter
const profile_img = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter,
  filename: filenameChanger,
}).single('file'); // Use .single('file') if you are expecting a single file

exports.profile_img = profile_img;
