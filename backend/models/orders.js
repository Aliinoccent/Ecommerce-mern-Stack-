const mongoose=require('mongoose');
const OrderSchema=mongoose.Schema({
    User:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
products:[
    {
    Productsid:{type:mongoose.Schema.ObjectId,ref:'Porduct'},
    quantity:{type:Number ,require:true},
    status:{type:String , enum:['pending','shipping','delivered'],default:'pending'}
    } 
    ],
    totalPrice:{
        type:Number
    },
    createAt:{
        type:Date,
        default:new Date
    }

})
module.exports=mongoose.model('Order',OrderSchema)