const express = require("express");
const router = express.Router();


const {create_commandfile,list_commandfile,delete_commandfile,search_commandfile,update_commandfile,updateCommandOrder} = require("../controllers/command_file");
const {create_comments,list_comments} = require("../controllers/comments");

const {upload_commandfile} = require("../middleware/uploadfile");
const {upload_commentfile} = require("../middleware/comments_file");


router.post("/api/v1/create_commandfile",upload_commandfile,create_commandfile);
router.get('/api/v1/list_commandfile/:meeting_id', list_commandfile)
router.delete('/api/v1/delete_commandfile/:id', delete_commandfile)
router.put('/api/v1/update_commandfile/:id', upload_commandfile, update_commandfile)

router.post('/api/v1/update_command_order', updateCommandOrder);

router.get('/api/v1/search_commandfile/:id', search_commandfile)

router.post("/api/v1/create_comments",upload_commentfile,create_comments);
router.get('/api/v1/list_comments/:meeting_id', list_comments)

module.exports = router;