const express = require('express')
const router = express.Router()

const {login,currentUser,login_admin,currentAdmin } = require('../controllers/auth')
const {auth } = require('../middleware/auth')



//router.post('/register', register)
router.post('/api/v1/login', login)
router.post('/api/v1/current-user',auth, currentUser)


router.post('/api/v1/login_admin', login_admin)
router.post('/api/v1/current-admin',auth, currentAdmin)


module.exports = router