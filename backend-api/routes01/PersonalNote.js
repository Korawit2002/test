
const express = require("express");
const router = express.Router();
const { auth } = require('../middleware/auth')

const {search_note,create_personal_note,list_personal_note} = require("../controllers/personal_note");


router.get("/api/v1/list_personal_note",list_personal_note);
/**
 * @swagger
 * /api/v1/list_personal_note:
 *   get:
 *     summary: โน๊ตส่วนตัว.
 *     tags: [โน๊ตส่วนตัว]
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


router.post("/api/v1/create_personal_note",create_personal_note);
/**
 * @swagger
 * /api/v1/create_personal_note:
 *   post:
 *     summary: Create a new menu
 *     tags: [โน๊ตส่วนตัว]
 *     requestBody:
 *       required: flse
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - note
 *             properties:
 *               meeting_id:
 *                 type: string
 *               note:
 *                 type: string
 *               user_id:
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

router.get('/api/v1/search_note/:meeting_id/:user_id', search_note)
// /**
// * @swagger
// * /api/v1/search_note/{meeting_id}/{user_id}:
// *   get:
// *     summary: โน๊ตส่วนตัว
// *     tags: [โน๊ตส่วนตัว]
// *     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
// *     parameters:
// *       - in: path
// *         name: meeting_id
// *         required: true
// *         description: รหัสเมนู
// *         schema:
// *           type: integer
// *     responses:
// *       200:
// *         description: A single user.
// *         content:
// *           application/json:
// *             schema:
// *               type: object
// *               properties:
// *                 data:
// *                   type: object
// *                   properties:
// *                     menu_id:
// *                       type: integer
// *                       example: 1018
// */

module.exports = router;