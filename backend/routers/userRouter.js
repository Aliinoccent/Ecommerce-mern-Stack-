const express=require('express');
const router=express.Router();
const userValidation=require('../middelwares/UserValidation')
const controller=require('../controllers/userController')
const {logIn ,signUp,adminSignup,getusers,deleteUser,updateUser}=(controller)
router.post('/login',logIn)
router.post('/signup',userValidation,signUp)
router.post('/admin/signup',adminSignup)
router.get('/',getusers)
router.delete('/:userId',deleteUser)
router.put('/:id',updateUser)

module.exports=router;