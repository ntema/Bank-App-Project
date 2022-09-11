const router = require('express').Router()
const updateUserController = require('../../controller/userController/updateUserController')
const verifyToken = require('../../middlewares/authMiddleware/verifyToken')
const verifyAdminAndUserToken = require('../../middlewares/authMiddleware/verifyUserAndAdmin')

router.put('/:id',verifyToken,verifyAdminAndUserToken, updateUserController )

module.exports = router