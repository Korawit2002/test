const express = require("express");
const router = express.Router();
const { auth } = require('../middleware/auth')

const {create_email,update_email,delete_email,list_email,search_email} = require("../controllers/setup_email");

router.get("/api/v1/list_email", list_email);
/**
 * @swagger
 * /api/v1/list_email:
 *   get:
 *     summary: ตั้งค่า Email
 *     tags: [ตั้งค่า Email]
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
router.post("/api/v1/create_email",create_email);
/**
 * @swagger
 * /api/v1/create_email:
 *   post:
 *     summary: ตั้งค่า Email
 *     tags: [ตั้งค่า Email]
 *     requestBody:
 *       required: flse
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - user_id 
 *              - email_name
 *              - sender_name
 *              - company_id
 *             properties:
 *               user_id:
 *                 type: string
 *               email_name:
 *                 type: string
 *               sender_name:
 *                 type: string 
 *               company_id:
 *                 type: string  
 *     responses:
 *       200:
 *         description: The created menu
 *         content:
 *           application/json:
 *             schema:
 *              # $ref: '#/components/schemas/create_sub_menu'
 *       500:
 *         description: Server error
 */

// router.post("/api/v1/create_email",create_email);
// /**
//  * @swagger
//  * /api/v1/create_email:
//  *   post:
//  *     summary: ตั้งค่า Email
//  *     tags: [ตั้งค่า Email]
//  *     requestBody:
//  *       required: flse
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *              - user_id
//  *              - email_name
//  *              - sender_name 
//  *              - company_id 
//  *             properties:
//  *               user_id:
//  *                 type: string
//  *               email_name:
//  *                 type: string 
//  *               sender_name:
//  *                 type: string 
//  *               company_id:
//  *                 type: string 
//  *              responses:
//  *       200:
//  *         description: The created menu
//  *         content:
//  *           application/json:
//  *             schema:
//  *              # $ref: '#/components/schemas/menuitems'
//  *       500:
//  *         description: Server error
//  */

router.put("/api/v1/update_email",update_email);
// /**
//  * @swagger
//  * /api/v1/update_email:
//  *   put:
//  *     summary: Update
//  *     tags: [ตั้งค่า Email]
//  *     requestBody:
//  *       required: flse
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *              - user_id
//  *              - email_name
//  *              - sender_name
//  *             properties:
//  *               role_id:
//  *                 type: integer
//  *               role_name:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: The update menu
//  *         content:
//  *           application/json:
//  *             schema:
//  *              # $ref: '#/components/schemas/company'
//  *       500:
//  *         description: Server error
//  */

 router.delete('/api/v1/delete_email/:id', delete_email)
//  /**
//  * @swagger
//  * /api/v1/delete_email/{id}:
//  *   delete:
//  *     summary: Delete
//  *     tags: [ตั้งค่า Email]
//  *     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         description: รหัสเมนู
//  *         schema:
//  *           type: integer
//  *     responses:
//  *       200:
//  *         description: A single user.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 data:
//  *                   type: object
//  *                   properties:
//  *                     id:
//  *                       type: integer
//  *                       example: 1018
// */

router.get('/api/v1/search_email/:id', search_email)
/**
* @swagger
* /api/v1/search_email/{id}:
*   get:
*     summary: show sub menu.
*     tags: [ตั้งค่า Email]
*     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: รหัส
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
*                     sub_menu_id:
*                       type: integer
*                       example: 1018
*/

module.exports = router;