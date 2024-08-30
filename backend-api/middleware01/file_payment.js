const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/payment')
    },
    filename: (req, file, cb) => {
        cb(null, 'payment-' + Date.now() + '.' +
        file.originalname.split('.')[file.originalname.split('.').length-1])}
})

exports.upload_payment = multer({ storage: storage }).single('file');