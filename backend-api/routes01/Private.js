const express = require("express");
const router = express.Router();

const { create_privatefile,list_privatefile,search_privatefile, update_privatefile, delete_privatefile,updatePrivateOrder } = require("../controllers/private_file");
const {private_file} = require("../middleware/private_file");

router.post("/api/v1/create_privatefile", private_file, create_privatefile);
router.get('/api/v1/list_privatefile/:meeting_id', list_privatefile)
router.get('/api/v1/search_privatefile/:id', search_privatefile)
router.put('/api/v1/update_privatefile/:_id', private_file, update_privatefile);
router.delete('/api/v1/delete_privatefile/:id', delete_privatefile);

router.post('/api/v1/update_private_order', updatePrivateOrder);

module.exports = router;