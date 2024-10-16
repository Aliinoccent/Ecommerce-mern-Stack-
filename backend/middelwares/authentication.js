const jwt=require('jsonwebtoken')
require('dotenv').config();

const authentication=(req,res,next)=>{
const headers=req.headers['authorization']
const token=headers&& headers.split(' ')[1]
try{

    jwt.verify(token,process.env.Secratkey,(error,decoded)=>{
        if(error){
            res.json({error,status:false,code:493})
        }
        else
        {
            req.user=decoded;
            next();
        }
    })
}
catch(error){
    res.json({token:'something missing in token',error})
}}
module.exports=authentication;