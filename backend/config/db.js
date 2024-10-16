const mongoose= require('mongoose');
require('dotenv').config()

const ConnectDb=async()=>{
    try{
        const connect=  await mongoose.connect(process.env.URI )
        console.log( 'this is connected ')
        connect? console.log('db connected'):console.log('db error ')
    }catch(error){
        console.log('this is error')
    }

}
module.exports={ConnectDb};