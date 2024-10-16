const express=require ('express');
const router=express.Router();
const authentication=require('../middelwares/authentication')
const { addOrder,getOrder,getAllOrder,updateStatus } = require('../controllers/order');
router.post('/:userId/:productId',authentication,addOrder);
router.get('/:userid',authentication,getOrder)
router.get('/',authentication,getAllOrder)
router.put('/:orderid',updateStatus)

module.exports= router;