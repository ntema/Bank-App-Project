const router = require('express').Router()
const registerController = require('../../controller/authController/registerController')

router.post('/register', registerController )

module.exports = router