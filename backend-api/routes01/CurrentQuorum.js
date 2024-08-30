const express = require("express");
const router = express.Router();
const { auth } = require('../middleware/auth')

const {search_current,create_current,update_current,delete_current,list_current} = require("../controllers/current_quorum");


router.get("/api/v1/list_current",list_current);
/**
 * @swagger
 * /api/v1/list_current:
 *   get:
 *     summary: list.
 *     tags: [องค์ประชุมชุดปัจจุบัน]
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


router.post("/api/v1/create_current",create_current);
/**
 * @swagger
 * /api/v1/create_current:
 *   post:
 *     summary: Create a new menu
 *     tags: [องค์ประชุมชุดปัจจุบัน]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               title:
 *                 type: string
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               main_stucture:
 *                 type: string
 *               sub_stucture:
 *                 type: string
 *               child_stucture:
 *                 type: string
 *               email:
 *                 type: string
 *               position_id:
 *                 type: string
 *               position_name:
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

// router.put("/api/v1/update_current",update_current);
// /**
//  * @swagger
//  * /api/v1/update_current:
//  *   put:
//  *     summary: Update menu
//  *     tags: [องค์ประชุมชุดปัจจุบัน]
//  *     requestBody:
//  *       required: flse
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *              - type_id
//  *              - type_name
//  *             properties:
//  *               type_id:
//  *                 type: integer
//  *               type_name:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: The update menu
//  *         content:
//  *           application/json:
//  *             schema:
//  *              # $ref: '#/components/schemas/menuitems'
//  *       500:
//  *         description: Server error
//  */

 router.delete('/api/v1/delete_current/:current_id', delete_current)
 /**
 * @swagger
 * /api/v1/delete_current/{current_id}:
 *   delete:
 *     summary: Delete menu.
 *     tags: [องค์ประชุมชุดปัจจุบัน]
 *     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: current_id
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

router.get('/api/v1/search_current/:search', search_current)
/**
* @swagger
* /api/v1/search_current/{search}:
*   get:
*     summary: show menu.
*     tags: [องค์ประชุมชุดปัจจุบัน]
*     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
*     parameters:
*       - in: path
*         name: search
*         required: true
*         description: รหัสเมนู
*         schema:
*           type: string
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