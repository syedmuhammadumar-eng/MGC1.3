const express = require('express')
const router = express.Router()

const userController = require('../controller/users-controller')

router.get('/', userController.authenticateAdminToken, userController.getUser)

router.get('/length', userController.authenticateAdminToken, userController.getApprovedUserLength)

router.get('/select/vendor', userController.authenticateAdminToken, userController.getVendorSelect)

router.get('/unapproved', userController.authenticateAdminToken, userController.getUnapprovedUser)
router.get('/approved', userController.authenticateAdminToken, userController.getApprovedUser)

router.get('/select/approved', userController.authenticateAdminToken, userController.getApprovedUserSelect)

router.post('/signup', userController.signup)

router.post('/signup-vendor', userController.authenticateAdminToken, userController.signupVendor)
router.get('/vendor', userController.authenticateAdminToken, userController.getVendor)

router.post('/signup-employe', userController.authenticateOnlyAdminToken, userController.signupEmploye)
router.get('/employe', userController.authenticateOnlyAdminToken, userController.getEmploye)

router.post('/login', userController.login)

router.get('/:uid', userController.authenticateAdminToken, userController.getUserById)
router.patch('/:uid', userController.authenticateAdminToken, userController.updateUserById)
router.delete('/:uid', userController.authenticateAdminToken, userController.deleteUserById)

module.exports = router;