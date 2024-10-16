const express = require('express');
const Order = require('../models/orders.js');

const ProductModel = require('../models/products.js');
const UserModel = require('../models/userModel.js')

exports.addOrder = async (req, res) => {
    const User = req.params.userId;
    const Productid = req.params.productId;
    const { quantity } = req.body;
    console.log(User, Productid, quantity);
    try {
        if (!User && !Productid && !quantity) {
            return res.json({ data: "invalid filed", status: false, statuscode: 404 });
        }
        else {
            let amount = 0;

            const productObj = await ProductModel.findOne({ _id: Productid });
            console.log(productObj, 'this is porduct Obj');
            if (productObj.quantity < quantity && quantity > 0) {
                res.json({ data: 'stock is  limited', status: true, statuscode: 200 })
            }
            else if (productObj.quantity == 0) {
                res.json({ data: 'stock out of products', status: true, statuscode: 200 });
                await ProductModel.deleteOne({ productObj })
            }
            else {
                amount = productObj.price * quantity;

                const productQuantity = productObj.quantity - quantity
                console.log('remining product quantity ', productQuantity)
                await ProductModel.findByIdAndUpdate({ _id: Productid }, { quantity: productQuantity }, { new: true })
                const neworder = new Order({ User, products: [{ Productid, quantity }], totalPrice: amount })
                await neworder.save();
                console.log(neworder);
                res.json({ data: neworder, status: true, statscode: 200 })
            }

        }
    }
    catch (error) {
        res.json({ data: 'something missing to save order', status: false, statuscode: 500 })
    }
}


exports.getOrder = async (req, res) => {

    const User = req.params.userid;
    console.log(User);
    try {
        const data = await Order.find({ User });
        res.json({ Data: data });
    }
    catch (error) {
        res.json({ data: 'something issue to get orders', status: true, statuscode: 500 })
    }

}

exports.getAllOrder = async (req, res) => {

    const allOrder = await Order.find();
    const { email } = req.user;
    console.log(email, 'this is email ')

    const foundUser = await UserModel.findOne({ email });
    try {

        if (foundUser === undefined || foundUser === null) {
            return res.json({ data: 'user is not valid to see order' })
        }
        else if (foundUser.role === 'admin' && allOrder) {

            res.json({ data: allOrder, status: true, statuscode: 200 })
        }
        else if (foundUser.role === 'admin' && !allOrder) {
            res.json({ data: 'Order List empty', status: true, statscode: 200 })
        }
        else {
            res.json({ data: 'this user is not authrized to see order list', status: 200 })
        }
    }
    catch (error) {
        res.json({ data: 'somthing issue to get all orders', status: false, statscode: 500 })
    }
}




exports.updateStatus = async (req, res) => {

    const { orderid } = req.params;
    const orderExist = await Order.findOne({ _id: orderid });
    const {email}  = req.user;
    console.log(email,'this is email')
    try{
    const User = await UserModel.findOne({ email });
    if (!User) {
        res.json({ data: 'user not found' });

    }
    else if (User.role != "admin") {
        res.json({ data: 'this user not be processing ' })

    }
    if (!orderExist) {
            res.json({ data: 'this order is not be decleared', status: false, statscode: 400 });
        }

        if (orderExist.status === 'panding') {

            const update = await Order.findByIdAndUpdate(orderid, { status: "shipping" }, { new: true })
            res.json({ data: 'updated successfully', update })
        }

        else if (orderExist.status === "shipping") {
            const update = await Order.findByIdAndUpdate(orderid, { status: "delivered" }, { new: true })
            res.json({ data: 'updated successfully', update })

        }
        else {
            const update = await Order.deleteOne({_id:orderid})
            res.json({ data: 'delete successfully', update })
        }
    
}
catch(error){
    res.json({data:'some thing issue to change status',error, statusCode:500})
}

}

