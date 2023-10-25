const express= require('express')
const router = express.Router()
const {verifyToken} = require('../middleware/verify')
let auth_controllers = require('../controllers/auth_controllers')

router.post('/signup', auth_controllers.signup);
  
  // Signin
  router.post('/signin', auth_controllers.signin);
    
  //   create item 
  
  router.post('/items',verifyToken,auth_controllers.createItem);
  
  //   Get Item 
  
  router.get('/items',verifyToken,auth_controllers.getItems);
  
  //   Get item by single id 
  
  router.get('/items/:id',verifyToken,auth_controllers.getItemById);
  
    
  //   Update item by id 
  
  router.put('/items/:id',verifyToken,auth_controllers.updateItem);
  
  //   Delete item by id 
  
  router.delete('/items/:id',verifyToken,auth_controllers.deleteItem);

  router.post('/sendmail',auth_controllers.sendMail)

  router.post('/upload',auth_controllers.uploadFile)

  

module.exports=router
    