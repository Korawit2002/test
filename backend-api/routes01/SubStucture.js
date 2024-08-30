const express = require("express");
const router = express.Router();

const {list_substucture,create_substucture,update_substucture,delete_substucture,substucture} = require("../controllers/sub_stucture");


router.get("/api/v1/list_substucture", list_substucture);
/**
 * @swagger
 * /api/v1/list_substucture:
 *   get:
 *     summary: โครงสร้างย่อย/แผนก
 *     tags: [SubStucture]
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


router.post("/api/v1/create_substucture",create_substucture);
/**
 * @swagger
 * /api/v1/create_substucture:
 *   post:
 *     summary: Create a new sub menu
 *     tags: [SubStucture]
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
 *             properties:
 *               title:
 *                 type: string
 *               main_stucture_id:
 *                 type: string
 *               main_stucture_name:
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

router.put("/api/v1/update_substucture",update_substucture);
/**
 * @swagger
 * /api/v1/update_substucture:
 *   put:
 *     summary: Update sub menu
 *     tags: [SubStucture]
 *     requestBody:
 *       required: flse
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - sub_stucture_id
 *              - title
 *             properties:
 *               sub_stucture_id:
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

 router.delete('/api/v1/delete_substucture/:id', delete_substucture)
 /**
 * @swagger
 * /api/v1/delete_substucture/{id}:
 *   delete:
 *     summary: Delete sub menu.
 *     tags: [SubStucture]
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
 *                     sub_stucture_id:
 *                       type: integer
 *                       example: 1018
*/


router.get('/api/v1/substucture/:id', substucture)
/**
* @swagger
* /api/v1/substucture/{id}:
*   get:
*     summary: โครงสร้างย่อย/ข้อมูลแผนก
*     tags: [SubStucture]
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