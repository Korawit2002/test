const express = require("express");
const router = express.Router();

const {list_submenu,create_sub_menu,update_submenu,delete_submenu,submenu} = require("../controllers/subMenu");


router.get("/api/v1/list_submenu", list_submenu);
/**
 * @swagger
 * /api/v1/list_submenu:
 *   get:
 *     summary: Sub Menu.
 *     tags: [SubMenu]
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


router.post("/api/v1/create_sub_menu",create_sub_menu);
/**
 * @swagger
 * /api/v1/create_sub_menu:
 *   post:
 *     summary: Create a new sub menu
 *     tags: [SubMenu]
 *     requestBody:
 *       required: flse
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - title 
 *              - menu_id
 *             properties:
 *               title:
 *                 type: string
 *               menu_id:
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

router.put("/api/v1/update_submenu",update_submenu);
/**
 * @swagger
 * /api/v1/update_submenu:
 *   put:
 *     summary: Update sub menu
 *     tags: [SubMenu]
 *     requestBody:
 *       required: flse
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - sub_menu_id
 *              - title
 *             properties:
 *               sub_menu_id:
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

 router.delete('/api/v1/delete_submenu/:sub_menu_id', delete_submenu)
 /**
 * @swagger
 * /api/v1/delete_submenu/{sub_menu_id}:
 *   delete:
 *     summary: Delete sub menu.
 *     tags: [SubMenu]
 *     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: sub_menu_id
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


router.get('/api/v1/submenu/:sub_menu_id', submenu)
/**
* @swagger
* /api/v1/submenu/{sub_menu_id}:
*   get:
*     summary: show sub menu.
*     tags: [SubMenu]
*     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
*     parameters:
*       - in: path
*         name: sub_menu_id
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
// // router.post("/api/v1/create_sub_menu",create_sub_menu);
// // router.post("/api/v1/create_child_menu",create_child_menu);


module.exports = router;