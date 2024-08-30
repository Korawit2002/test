const express = require("express");
const router = express.Router();

const {stucture,create_stucture,update_stucture,delete_stucture,list_stucture} = require("../controllers/stucture");


router.get("/api/v1/list_stucture", list_stucture);
/**
 * @swagger
 * /api/v1/list_stucture:
 *   get:
 *     summary: โครงสร้างหลัก/ฝ่าย.
 *     tags: [MainStucture]
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
 *                       main_stucture_id:
 *                         type: integer
 *                         description: The user ID.
 *                         example: 10
 *                       title:
 *                         type: string
 *                         example: 10
 *                       meta_title:
 *                         type: string
 *                         example: 
 *                       meta_description:
 *                         type: string
 *                         example: กรุงเทพมหานคร
 */


router.post("/api/v1/create_stucture",create_stucture);
/**
 * @swagger
 * /api/v1/create_stucture:
 *   post:
 *     summary: เพิ่มโครงสร้างหลัง/ข้อมูลฝ่าย
 *     tags: [MainStucture]
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

router.put("/api/v1/update_stucture",update_stucture);
/**
 * @swagger
 * /api/v1/update_stucture:
 *   put:
 *     summary: แก้ไขข้อมูล
 *     tags: [MainStucture]
 *     requestBody:
 *       required: flse
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - main_stucture_id
 *              - title
 *             properties:
 *               main_stucture_id:
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

 router.delete('/api/v1/delete_stucture/:id', delete_stucture)
 /**
 * @swagger
 * /api/v1/delete_stucture/{id}:
 *   delete:
 *     summary: Delete.
 *     tags: [MainStucture]
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


router.get('/api/v1/stucture/:id', stucture)
/**
* @swagger
* /api/v1/stucture/{id}:
*   get:
*     summary: แสดงข้อมูลจากการค้าหาตาม id.
*     tags: [MainStucture]
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