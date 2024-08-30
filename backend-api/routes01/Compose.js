const express = require("express");
const router = express.Router();

const { create_composefile,list_composefile,search_composefile, update_composefile, delete_composefile,list_composefile_other,list_composefile_pin,updateComposeOrder } = require("../controllers/compose");
const {compose_upload} = require("../middleware/compose_upload");

router.post("/api/v1/create_composefile", compose_upload, create_composefile);
router.get('/api/v1/list_composefile/:meeting_id', list_composefile)
router.get('/api/v1/search_composefile/:id', search_composefile)
router.put('/api/v1/update_composefile/:_id', compose_upload, update_composefile);
router.delete('/api/v1/delete_composefile/:id', delete_composefile);
router.get('/api/v1/list_composefile_other/:meeting_id', list_composefile_other)
router.get('/api/v1/list_composefile_pin/:meeting_id', list_composefile_pin)

router.post('/api/v1/update_compose_order', updateComposeOrder);

module.exports = router;