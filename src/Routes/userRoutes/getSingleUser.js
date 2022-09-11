const router = require('express').Router()
const getSingleUserController = require('../../controller/userController/getSingleUserController')
const verifyToken = require('../../middlewares/authMiddleware/verifyToken')
const verifyAdminAndUserToken = require('../../middlewares/authMiddleware/verifyUserAndAdmin')

router.get('/:id',verifyToken, verifyAdminAndUserToken, getSingleUserController )

module.exports = router