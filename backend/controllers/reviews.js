const review=require('../models/review.js')
exports.reviewsAdd=async(req,res)=>{
const User= req.params.userid
const Product=req.params.productid
const Review=req.body;
console.log(`user ${User} product ${Product} Review ${Review}`)
try{
    if(!Review||!User||!Product){
        console.log('this is if')
return res.json({data:'missing in review or user id or product id',status:false,statusCode:404});
    }
    else{
        console.log('this is else')
        const newreview=new review({...Review,User, Product})
        await newreview.save()
       return  res.json({data:newreview,status:true,statuscode:200})
    }
}
catch(error){
    console.log('this is error')
 return   res.json({data:'some thing missing to save data in backend',statucode:500})
}

}