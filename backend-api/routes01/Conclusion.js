const express = require("express");
const router = express.Router();

const { create_Conclusionfile,list_Conclusionfile,search_Conclusionfile, update_Conclusionfile, delete_Conclusionfile,updateConclusionOrder } = require("../controllers/conclusion");
const {conclusion_upload} = require("../middleware/conclusion_file");

router.post("/api/v1/create_Conclusionfile", conclusion_upload, create_Conclusionfile);
router.get('/api/v1/list_Conclusionfile/:meeting_id', list_Conclusionfile)
router.get('/api/v1/search_Conclusionfile/:id', search_Conclusionfile)
router.put('/api/v1/update_Conclusionfile/:_id', conclusion_upload, update_Conclusionfile);
router.delete('/api/v1/delete_Conclusionfile/:id', delete_Conclusionfile);

router.post('/api/v1/update_conclusion_order', updateConclusionOrder);

module.exports = router;