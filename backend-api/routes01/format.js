const express = require("express");
const router = express.Router();
const { auth } = require('../middleware/auth')

const {create_format,update_format,delete_format,list_format,search_format} = require("../controllers/format");


router.get("/api/v1/list_format",list_format);
/**
 * @swagger
 * /api/v1/list_format:
 *   get:
 *     summary: format.
 *     tags: [รูปแบบการแสดงชื่อของผู้เข้าร่วมประชุม]
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


router.post("/api/v1/create_format",create_format);
/**
 * @swagger
 * /api/v1/create_format:
 *   post:
 *     summary: Create
 *     tags: [รูปแบบการแสดงชื่อของผู้เข้าร่วมประชุม]
 *     requestBody:
 *       required: flse
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - formats_name
 *              - meeting_id 
 *             properties:
 *               formats_name:
 *                 type: string
 *               meeting_id:
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

router.put("/api/v1/update_format",update_format);
/**
 * @swagger
 * /api/v1/update_format:
 *   put:
 *     summary: Update
 *     tags: [รูปแบบการแสดงชื่อของผู้เข้าร่วมประชุม]
 *     requestBody:
 *       required: flse
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - formats_id
 *              - formats_name
 *             properties:
 *               formats_id:
 *                 type: integer
 *               formats_name:
 *                 type: string
 *     responses:
 *       200:
 *         description: The update menu
 *         content:
 *           application/json:
 *             schema:
 *              # $ref: '#/components/schemas/company'
 *       500:
 *         description: Server error
 */

 router.delete('/api/v1/delete_format/:id', delete_format)
 /**
 * @swagger
 * /api/v1/delete_format/{id}:
 *   delete:
 *     summary: Delete
 *     tags: [รูปแบบการแสดงชื่อของผู้เข้าร่วมประชุม]
 *     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: id
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
 *                     id:
 *                       type: integer
 *                       example: 1018
*/

router.get('/api/v1/search_format/:meeting_id', search_format)
/**
* @swagger
* /api/v1/search_format/{meeting_id}:
*   get:
*     summary: search
*     tags: [รูปแบบการแสดงชื่อของผู้เข้าร่วมประชุม]
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
*                     id:
*                       type: integer
*                       example: 1018
*/

module.exports = router;