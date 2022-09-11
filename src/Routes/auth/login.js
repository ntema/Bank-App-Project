const router = require('express').Router()
const loginController = require('../../controller/authController/loginController')

router.post('/login', loginController )

module.exports = router