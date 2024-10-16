const joi=require('joi');
const userValidation=(req,res,next)=>{
    const schema=joi.object({
        username:joi.string().min(3).max(30).alphanum().required(),
        password:joi.string().required(),
        email:joi.string().email().required(),
        phone:joi.number().min(8).required()
    })
    const {error}=schema.validate(req.body);
    if(error){
        res.json({error,statusCode:400})
    }
    else{
        next();
    }
}
module.exports=userValidation
