let express = require('express');
let config = require('../../config/index');
let utils = require('../../utils/index');
let dateFormat = require('dateformat');
let multer  = require('multer');

let folder = "";
let img_real_path = "";
let img_dir = "";
let filename;

const fse = require('fs-extra');

function sanitizeFile(file, cb) {

    let fileExts = ['png', 'jpg', 'jpeg'];
    let filenameArr = file.originalname.split('.');
    let isAllowedExt = fileExts.includes(filenameArr[filenameArr.length-1].toLowerCase());

    if(isAllowedExt){
        return cb(null ,true) // no errors
    }
    else{
        let error_message = { code: 500, message: "Your File Type is not JPG or PNG."};
        cb(error_message)
    }
}

const router = express.Router();
router.get('/', function(req, res, next) {
    utils.printJSON(res, utils.getJSONObject(507, "Get Method is not available.", null));
});

router.post('/', (req, res) => {

    folder = dateFormat(Date.now(), "yyyy/mm/dd/");
    img_real_path = config.getUploadImagePath() + folder;
    img_dir = "/assets/images/" + folder;

    if (!fse.ensureDirSync(img_real_path)){
        fse.mkdirsSync(img_real_path);
    }

    let storage = multer.diskStorage({
        destination: img_real_path,
        filename: function (req, file, callback) {
            let filenameArr = file["originalname"].split('.');
            let extension = "." + filenameArr[filenameArr.length-1].toLowerCase();
            filename = dateFormat(Date.now(), "yyyymmddHHMMss") + Math.floor(Math.random() * 100) + extension;
            callback(null, filename);
        }
    });

    let fileSize = 150 * 10000; //in bytes to mb (* 10000)
    let limits = {
        "fileSize": fileSize
    };

    let upload = multer({
        storage: storage,
        limits: limits,
        fileFilter: function (req, file, callback) {
            sanitizeFile(file, callback);
        }
    }).single('myfile');

    upload(req, res, (err) => {
        if(err) {
            utils.printJSON(res, utils.getJSONObject(err.code, err.message, null));
        } else {
            let result = {};
            result.filename = filename;
            result.image = config.getStaticDomain() + img_dir + filename;
            result.image_path = img_dir + filename;
            utils.printJSON(res, utils.getJSONObject(200, "Success.", result));
        }
    });
});

module.exports = router;