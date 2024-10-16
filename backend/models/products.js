const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    product:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    quantity:{
        type:Number,
        require:true,
        default:0
    },
    discription:{
        type:String
    },
    image:{
            type:String,
            required:false
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Category" 
    }
})
module.exports=mongoose.model('Porduct',productSchema)