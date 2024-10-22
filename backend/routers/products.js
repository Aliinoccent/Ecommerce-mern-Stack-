const express=require('express');
const authentication=require ('../middelwares/authentication.js')
const router=express.Router();
require('dotenv').config();
const controller=require('../controllers/productController.js');
const upload = require('../middelwares/melter.js');
const {catgory,getallproductsByCategory,productAdd,getallproducts,getPriceOfProducts,getCategory}=controller
router.post('/',upload.single('image'),catgory);
router.get('/categorData',getCategory);
router.post('/:categoryid',upload.single('image'),productAdd)
router.get('/catgoryid=:catgoryid',getallproductsByCategory)
router.get('/', getallproducts);
router.get('/price=:price',getPriceOfProducts)

module.exports=router