const  express = require('express');
const router = express.Router();
const userContoller = require('../controllers/User');


 router.post('/user', userContoller.signup);
 router.post('/login', userContoller.login);
 router.post('/logout',userContoller.logout);


  module.exports = router;