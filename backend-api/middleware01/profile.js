// const multer = require('multer')
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './public/profile')
//     },
//     filename: (req, file, cb) => {
//         cb(null, 'command-' + Date.now() + '.' +
//         file.originalname.split('.')[file.originalname.split('.').length-1])}
// })

// exports.profile = multer({ storage: storage }).single('profile_image');

const multer = require('multer');

// Configure storage for Multer
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './public/profiles'); // Ensure this directory exists
    },
    filename: function(req, file, callback) {
        // Create a unique filename for the uploaded file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, uniqueSuffix + '-' + file.originalname);
    }
});

// Configure Multer to use the defined storage and file filter for image uploads
const upload = multer({ 
    storage: storage,
    fileFilter: function(req, file, callback) {
        // Accept images only
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
    }
}).single('profile_image'); // 'profile_image' is the name of the file input field

module.exports = upload;
