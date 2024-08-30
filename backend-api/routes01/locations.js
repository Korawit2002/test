const express = require("express");
const router = express.Router();
const {
  provinces,
  amphures,
  tombons,
  zipcode
} = require("../controllers/locations");

router.get("/api/v1/provinces", provinces);
/**
 * @swagger
 * /api/v1/provinces:
 *   get:
 *     summary: Provinces.
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

router.get("/api/v1/amphures/:province_id", amphures);
/**
 * @swagger
 * /api/v1/amphures/{province_id}:
 *   get:
 *     summary: Amphures.
 *     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: province_id
 *         required: true
 *         description: รหัสจังหวัด
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
 *                     code:
 *                       type: string
 *                       example: 1018
 *                     id:
 *                       type: string
 *                       example: 1018
 *                     name_th:
 *                       type: string
 *                       example: คลองสาน
 *                     province_id:
 *                       type: string
 *                       example: 10
 
*/

router.get("/api/v1/tombons/:amphure_id", tombons);
/**
 * @swagger
 * /api/v1/tombons/{amphure_id}:
 *   get:
 *     summary: Tombons.
 *     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: amphure_id
 *         required: true
 *         description: รหัสอำเภอ
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
 *                     amphure_id:
 *                       type: string
 *                       example: 1018
 *                     id:
 *                       type: string
 *                       example: 101804
 *                     name_th:
 *                       type: string
 *                       example: คลองต้นไทร
 *                     zip_code:
 *                       type: string
 *                       example: 10600
*/

router.get("/api/v1/zipcode/:id", zipcode);
/**
 * @swagger
 * /api/v1/zipcode/{id}:
 *   get:
 *     summary: zipcode.
 *     #description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: รหัสตำบล
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
 *                     amphure_id:
 *                       type: string
 *                       example: 1018
 *                     id:
 *                       type: string
 *                       example: 101804
 *                     name_th:
 *                       type: string
 *                       example: คลองต้นไทร
 *                     zip_code:
 *                       type: string
 *                       example: 10600
*/

module.exports = router;