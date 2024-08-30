const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/comments')
    },
    filename: (req, file, cb) => {
        cb(null, 'comments-' + Date.now() + '.' +
        file.originalname.split('.')[file.originalname.split('.').length-1])}
})

exports.upload_commentfile = multer({ storage: storage }).single('file');

