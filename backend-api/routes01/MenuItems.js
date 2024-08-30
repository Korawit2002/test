const express = require("express");
const router = express.Router();
const { auth } = require('../middleware/auth')

const {menuitems,create_menu,update_menu,delete_menu,list_menu} = require("../controllers/menu_items");


router.get("/api/v1/list_menu",list_menu);
/**
 * @swagger
 * /api/v1/list_menu:
 *   get:
 *     summary: Menu Items.
 *     tags: [Menu]
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


router.post("/api/v1/create_menu",create_menu);
/**
 * @swagger
 * /api/v1/create_menu:
 *   post:
 *     summary: Create a new menu
 *     tags: [Menu]
 *     requestBody:
 *       required: flse
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - title
 *              - company_id
 *             properties:
 *               title:
 *                 type: string
 *               meta_title:
 *                 type: string
 *               meta_description:
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

router.put("/api/v1/update_menu",update_menu);
/**
 * @swagger
 * /api/v1/update_menu:
 *   put:
 *     summary: Update menu
 *     tags: [Menu]
 *     requestBody:
 *       required: flse
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - menu_id
 *              - title
 *             properties:
 *               menu_id:
 *                 type: integer
 *               title:
 *                 type: string
 *               meta_title:
 *                 type: string
 *               meta_description:
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

 router.delete('/api/v1/delete_menu/:menu_id', delete_menu)
 /**
 * @swagger
 * /api/v1/delete_menu/{menu_id}:
 *   delete:
 *     summary: Delete menu.
 *     tags: [Menu]
 *     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: menu_id
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


router.get('/api/v1/menuitems/:menu_id', menuitems)
/**
* @swagger
* /api/v1/menuitems/{menu_id}:
*   get:
*     summary: show menu.
*     tags: [Menu]
*     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
*     parameters:
*       - in: path
*         name: menu_id
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