const express=require('express');
const router=express.Router();
const controller=require('../controllers/reviews.js')
const {reviewsAdd}=controller;
router.post('/userid=:userid&productid=:productid',reviewsAdd);
module.exports=router