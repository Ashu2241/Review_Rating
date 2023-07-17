let express = require('express')

let user = require('../controllers/userController')
let { registerUserValidation, loginUserValidation, resetPasswordValidation } = require('../validations/user/userDataValidate')
const { userAuthentication } = require('../middlewares/authToken')
const { upload } = require('../middlewares/userImageStorage')

let router = express.Router()

router.post('/create', upload.single("profilePic"), registerUserValidation, user.createUser)
router.post('/login', loginUserValidation, user.userLogin)
router.get('/check', userAuthentication, user.checktoken)
router.post('/resetpasswordemail', user.sendUserResetPasswordEmail)
router.post('/resetpassword/:id/:token', resetPasswordValidation, user.userPasswordReset)

module.exports = router
