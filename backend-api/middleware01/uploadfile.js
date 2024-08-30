const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/command')
    },
    filename: (req, file, cb) => {
        cb(null, 'command-' + Date.now() + '.' +
        file.originalname.split('.')[file.originalname.split('.').length-1])}
})

exports.upload_commandfile = multer({ storage: storage }).single('file');