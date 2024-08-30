const express = require("express");
const router = express.Router();

const {list_childstucture,create_childstucture,update_childstucture,delete_childstucture,childstucture} = require("../controllers/child_stucture");


router.get("/api/v1/list_childstucture", list_childstucture);
/**
 * @swagger
 * /api/v1/list_childstucture:
 *   get:
 *     summary: โครงสร้างย่อย/ตำแหน่ง
 *     tags: [ChildStucture]
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


router.post("/api/v1/create_childstucture",create_childstucture);
/**
 * @swagger
 * /api/v1/create_childstucture:
 *   post:
 *     summary: Create a new sub menu
 *     tags: [ChildStucture]
 *     requestBody:
 *       required: flse
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - title 
 *              - main_stucture_id
 *              - main_stucture_name
 *              - sub_stucture_id
 *              - sub_stucture_name
 *             properties:
 *               title:
 *                 type: string
 *               main_stucture_id:
 *                 type: string
 *               main_stucture_name:
 *                 type: string
 *               sub_stucture_id:
 *                 type: string
 *               sub_stucture_name:
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

router.put("/api/v1/update_childstucture",update_childstucture);
/**
 * @swagger
 * /api/v1/update_childstucture:
 *   put:
 *     summary: Update sub menu
 *     tags: [ChildStucture]
 *     requestBody:
 *       required: flse
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - main_stucture_id
 *              - sub_stucture_id
 *              - child_stucture_id
 *              - title
 *             properties:
 *               main_stucture_id:
 *                 type: integer
 *               sub_stucture_id:
 *                 type: integer
 *               child_stucture_id:
 *                 type: integer
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: The update sub menu
 *         content:
 *           application/json:
 *             schema:
 *              # $ref: '#/components/schemas/menuitems'
 *       500:
 *         description: Server error
 */

 router.delete('/api/v1/delete_childstucture/:id', delete_childstucture)
 /**
 * @swagger
 * /api/v1/delete_childstucture/{id}:
 *   delete:
 *     summary: Delete sub menu.
 *     tags: [ChildStucture]
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
 *                     child_stucture_id:
 *                       type: integer
 *                       example: 1018
*/


router.get('/api/v1/childstucture/:id', childstucture)
/**
* @swagger
* /api/v1/childstucture/{id}:
*   get:
*     summary: โครงสร้างย่อย/ข้อมูลตำแหน่ง
*     tags: [ChildStucture]
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
*                     id:
*                       type: integer
*                       example: 1018
*/

module.exports = router;