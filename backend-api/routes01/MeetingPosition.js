const express = require("express");
const router = express.Router();
const { auth } = require('../middleware/auth')

const {meeting_position,create_meeting_position,update_meeting_position,delete_meeting_position,list_meeting_position} = require("../controllers/meeting_position");


router.get("/api/v1/list_meeting_position",list_meeting_position);
/**
 * @swagger
 * /api/v1/list_meeting_position:
 *   get:
 *     summary: ตำแหน่งในที่ประชุม.
 *     tags: [Meeting Position/ตำแหน่งในที่ประชุม]
 *     responses:
 *       200:
 *         description: A list of users.
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


router.post("/api/v1/create_meeting_position",create_meeting_position);
/**
 * @swagger
 * /api/v1/create_meeting_position:
 *   post:
 *     summary: Create a new menu
 *     tags: [Meeting Position/ตำแหน่งในที่ประชุม]
 *     requestBody:
 *       required: flse
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - position_name
 *              - company_id
 *             properties:
 *               position_name:
 *                 type: string
 *               company_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: The created menu
 *         content:
 *           application/json:
 *             schema:
 *              # $ref: '#/components/schemas/menuitems'
 *       500:
 *         description: Server error
 */

router.put("/api/v1/update_meeting_position",update_meeting_position);
/**
 * @swagger
 * /api/v1/update_meeting_position:
 *   put:
 *     summary: Update menu
 *     tags: [Meeting Position/ตำแหน่งในที่ประชุม]
 *     requestBody:
 *       required: flse
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - position_id
 *              - position_name
 *             properties:
 *               position_id:
 *                 type: integer
 *               position_name:
 *                 type: string
 *     responses:
 *       200:
 *         description: The update menu
 *         content:
 *           application/json:
 *             schema:
 *              # $ref: '#/components/schemas/menuitems'
 *       500:
 *         description: Server error
 */

 router.delete('/api/v1/delete_meeting_position/:position_id', delete_meeting_position)
 /**
 * @swagger
 * /api/v1/delete_meeting_position/{position_id}:
 *   delete:
 *     summary: Delete menu.
 *     tags: [Meeting Position/ตำแหน่งในที่ประชุม]
 *     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: position_id
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
 *                     position_id:
 *                       type: integer
 *                       example: 1018
*/


router.get('/api/v1/meeting_position/:position_id', meeting_position)
/**
* @swagger
* /api/v1/meeting_position/{position_id}:
*   get:
*     summary: show menu.
*     tags: [Meeting Position/ตำแหน่งในที่ประชุม]
*     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
*     parameters:
*       - in: path
*         name: position_id
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
*                     menu_id:
*                       type: integer
*                       example: 1018
*/

module.exports = router;