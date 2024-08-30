const express = require("express");
const router = express.Router();
const { auth } = require('../middleware/auth')

const {meeting_type,create_meeting_type,update_meeting_type,delete_meeting_type,list_meeting_type} = require("../controllers/meeting_type");


router.get("/api/v1/list_meeting_type",list_meeting_type);
/**
 * @swagger
 * /api/v1/list_meeting_type:
 *   get:
 *     summary: Menu Items.
 *     tags: [Meeting Type]
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


router.post("/api/v1/create_meeting_type",create_meeting_type);
/**
 * @swagger
 * /api/v1/create_meeting_type:
 *   post:
 *     summary: Create a new menu
 *     tags: [Meeting Type]
 *     requestBody:
 *       required: flse
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - type_name
 *              - company_id
 *             properties:
 *               type_name:
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

router.put("/api/v1/update_meeting_type",update_meeting_type);
/**
 * @swagger
 * /api/v1/update_meeting_type:
 *   put:
 *     summary: Update menu
 *     tags: [Meeting Type]
 *     requestBody:
 *       required: flse
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - type_id
 *              - type_name
 *             properties:
 *               type_id:
 *                 type: integer
 *               type_name:
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

 router.delete('/api/v1/delete_meeting_type/:type_id', delete_meeting_type)
 /**
 * @swagger
 * /api/v1/delete_meeting_type/{type_id}:
 *   delete:
 *     summary: Delete menu.
 *     tags: [Meeting Type]
 *     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: type_id
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
 *                     type_id:
 *                       type: integer
 *                       example: 1018
*/


router.get('/api/v1/meeting_type/:type_id', meeting_type)
/**
* @swagger
* /api/v1/meeting_type/{type_id}:
*   get:
*     summary: show menu.
*     tags: [Meeting Type]
*     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
*     parameters:
*       - in: path
*         name: type_id
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