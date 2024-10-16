const ConnectDb=require('./config/db');
const express=require('express');
const router = require('./routers/userRouter.js')
const products=require('./routers/products.js')
const reviews=require('./routers/review.js')
const order=require('./routers/orders.js')
const cors = require('cors');
const app=express();
ConnectDb.ConnectDb();
app.use(cors())
app.use(express.json());
app.use('/users',router)
app.use('/products',products)
app.use('/reviews',reviews)
app.use('/orders',order);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{console.log('server is running on port ',PORT)})
