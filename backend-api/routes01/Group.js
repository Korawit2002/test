const express = require("express");
const router = express.Router();
const { auth } = require('../middleware/auth')
const { createGroup, getAllGroups, getGroupById, updateGroup, deleteGroup,getGroupsByMeetingId } = require("../controllers/group");

router.post('/api/v1/create_group',createGroup);
router.get('/api/v1/list_groups',getAllGroups);
/**
 * @swagger
 * /api/v1/list_groups:
 *   get:
 *     summary: list.
 *     tags: [กลุ่มชั้นความลับ]
 *     responses:
 *       200:
 *         description: A list of group.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: integer
 *                         description: The user ID.
 *                         example: 10
 *                       id:
 *                         type: integer
 *                         example: 10
 *                       name_en:
 *                         type: string
 *                         example: 
 *                       name_th:
 *                         type: string
 *                         example: กรุงเทพมหานคร
 */
router.get('/api/v1/search_group/:id',getGroupById);
/**
 * @swagger
 * /api/v1/search_group/{meeting_id}:
 *   get:
 *     summary: โชว์ข้อมูลตาม หัวข้อวาระการประชุมหลัีก.
 *     tags: [กลุ่มชั้นความลับ]
 *     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: meeting_id
 *         required: true
 *         description: รหัสเมนู
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     meeting_id:
 *                       type: integer
 *                       example: 1018
 */
router.get('/api/v1/group_byid/:meeting_id', getGroupsByMeetingId);
/**
 * @swagger
 * /api/v1/group_byid/{meeting_id}:
 *   get:
 *     summary: โชว์ข้อมูลตาม หัวข้อวาระการประชุมหลัีก.
 *     tags: [กลุ่มชั้นความลับ]
 *     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: meeting_id
 *         required: true
 *         description: รหัสเมนู
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     meeting_id:
 *                       type: integer
 *                       example: 1018
 */
router.put('/api/v1/update_group/:id',updateGroup);
router.delete('/api/v1/delete_group/:id',deleteGroup);

module.exports = router;