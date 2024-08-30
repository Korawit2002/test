const express = require("express");
const router = express.Router();

const {list_childmenu,create_child_menu,update_childmenu,delete_childmenu} = require("../controllers/child_menu");


router.get("/api/v1/list_childmenu", list_childmenu);
/**
 * @swagger
 * /api/v1/list_childmenu:
 *   get:
 *     summary: Child Menu.
 *     tags: [ChildMenu]
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


router.post("/api/v1/create_child_menu",create_child_menu);

/**
 * @swagger
 * /api/v1/create_child_menu:
 *   post:
 *     summary: Create a new sub menu
 *     tags: [ChildMenu]
 *     requestBody:
 *       required: flse
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - title 
 *              - menu_id
 *              - sub_menu_id
 *             properties:
 *               title:
 *                 type: string
 *               menu_id:
 *                 type: integer
 *               sub_menu_id:
 *                 type: integer 
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

router.put("/api/v1/update_childmenu",update_childmenu);
/**
 * @swagger
 * /api/v1/update_childmenu:
 *   put:
 *     summary: Update sub menu
 *     tags: [ChildMenu]
 *     requestBody:
 *       required: flse
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - id
 *              - title
 *              - sub_menu_id
 *              - menu_id
 *             properties:
 *               id:
 *                 type: integer
 *               title:
 *                 type: integer
 *               sub_menu_id:
 *                 type: integer
 *               menu_id:
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

 router.delete('/api/v1/delete_childmenu/:id', delete_childmenu)
 /**
 * @swagger
 * /api/v1/delete_submenu/{id}:
 *   delete:
 *     summary: Delete sub menu.
 *     tags: [ChildMenu]
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