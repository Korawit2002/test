const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/map')
    },
    filename: (req, file, cb) => {
        cb(null, 'map-' + Date.now() + '.' +
        file.originalname.split('.')[file.originalname.split('.').length-1])}
})

exports.upload_map = multer({ storage: storage }).single('file');