const  express = require('express');
const router = express.Router();
const userContoller = require('../controllers/user');


 router.post('/user', userContoller.signup);
 router.post('/login', userContoller.login);





  module.exports = router;