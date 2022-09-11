const router = require('express').Router()
const getAllUserController = require('../../controller/userController/getAllUserController')
const verifyToken = require('../../middlewares/authMiddleware/verifyToken')
const verifyAdminToken = require('../../middlewares/authMiddleware/verifyAdmin')

router.get('/all',verifyToken,verifyAdminToken, getAllUserController )

module.exports = router