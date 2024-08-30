const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/document')
    },
    filename: (req, file, cb) => {
        cb(null, 'shipping-' + Date.now() + '.' +
        file.originalname.split('.')[file.originalname.split('.').length-1])}
})

exports.upload_shipping = multer({ storage: storage }).single('file');