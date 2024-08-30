const express = require("express");
const router = express.Router();
const { auth } = require('../middleware/auth')

const {create_role,update_role,delete_role,list_role} = require("../controllers/role");


router.get("/api/v1/list_role",list_role);
/**
 * @swagger
 * /api/v1/list_role:
 *   get:
 *     summary: บทบาท.
 *     tags: [Roles]
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


router.post("/api/v1/create_role",create_role);
/**
 * @swagger
 * /api/v1/create_role:
 *   post:
 *     summary: Create
 *     tags: [Roles]
 *     requestBody:
 *       required: flse
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - role_name
 *              - company_id 
 *             properties:
 *               role_name:
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

router.put("/api/v1/update_role",update_role);
/**
 * @swagger
 * /api/v1/update_role:
 *   put:
 *     summary: Update
 *     tags: [Roles]
 *     requestBody:
 *       required: flse
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - role_id
 *              - role_name
 *             properties:
 *               role_id:
 *                 type: integer
 *               role_name:
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

 router.delete('/api/v1/delete_role/:id', delete_role)
 /**
 * @swagger
 * /api/v1/delete_role/{id}:
 *   delete:
 *     summary: Delete
 *     tags: [Roles]
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

module.exports = router;