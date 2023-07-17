let express = require('express');
let company = require('../controllers/companyController');
const { isUserAuthorized } = require('../middlewares/authorization')
const { userAuthentication } = require('../middlewares/authToken')
let { registerCompanyValidation } = require('../validations/company/companyDataValidation')
const { upload } = require('../middlewares/companyImageStorage')

const companyRouter = express.Router();

companyRouter.post('/create', upload.single("companyPic"),userAuthentication, registerCompanyValidation, company.createCompany);
companyRouter.get('/list', company.companyList);
companyRouter.get('/detail/:id', company.companyDetails)
companyRouter.get('/search/:letter', company.companySearch)

module.exports = companyRouter
