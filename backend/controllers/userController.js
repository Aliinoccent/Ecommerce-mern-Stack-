const User = require('../models/userModel.js')
const token = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel.js');
require('dotenv').config();
const mongoose = require('mongoose')

exports.logIn = async (req, res) => {
    const { email, password } = req.body;
    const tokens = token.sign({ email }, process.env.Secratkey);
    try {
        const exist = await User.findOne({ email });
        if (!exist) {

            res.json({ data: 'email is invalid', status: true, succssCode: 200 })
        }
        else {
            const match = await bcrypt.compare(password, exist.hashPassword)// comapre return bool value
            if (match) {
                res.json({ data: exist, tokens,status:true,statusCode:200})
            }
            else {
                res.json({ data: 'password invalid' })
            }

        }

    }
    catch (error) {
        res.json({ data: 'somthing issue to found data', error })
    }

}

exports.signUp = async (req, res) => {
    const { email, password, username, phone } = req.body;
    const exist = await User.findOne({ email });

    console.log(exist);
    try {
        if (exist == null) {
            console.log(exist);
            const hashPassword = await bcrypt.hash(password, 5);//plain text , salt value , that attchecd with plain text before hash
            console.log(hashPassword);
            const data = new User({ email, hashPassword, username, phone })
            await data.save();
           return res.json({ data: 'user succss full singup', data, status: true, succssCode: 200 })
        }
        else {
            res.json({ data: 'already exist' })
        }
    }
    catch (error) {
      return  res.json({ data: 'something issue to signup user', status: false, statusCode: 500 })
    }

}

exports.adminSignup = async (req, res) => {
    const { username, email, password, adminkey,phone } = req.body;
    try {
        const envAdmin = process.env.adminSecratKey

        if (adminkey === envAdmin) {
            const exist = await User.findOne({ email });
            console.log(exist);
            if (exist === null) {
                console.log(envAdmin, adminkey);
                const hashPassword = await bcrypt.hash(password, 10);
                console.log(hashPassword);
                const newuser = new User({ username, email, hashPassword,phone, role: 'admin' })
                await newuser.save();
                
               return res.json({ data: newuser, role: 'admin', success: 200, status: true, mes: 'signup admin succssfully' })
            }
            else {
              return  res.json({ data: 'user already exist ' })
            }

        }
        else {
         return   res.json({ data: 'admin key is invalid' })
        }
    }
    catch (error) {
      return  res.json({ data: 'something issue with secratkey ',error })
    }
}

exports.getusers = async (req, res) => {
    try {
        const data = await User.find();
        if (!data) {
            res.json({ data: 'this is unexpected', });
        }
        else {
            res.json({ data, status: true, statusCode: 200 })
        }
    }
    catch (error) {
        res.json({ data: 'somethis issue in backend', error, status: false, statusCode: 500 })
    }
}
exports.deleteUser = async (req, res) => {
    const userid = req.params.userId;//this userId is from router's defined
    if (!userid) {
        res.json({ data: 'user id is not find from fronrtend', status: false, statusCode: 404 })
    }
    console.log(mongoose.Types.ObjectId.isValid(userid));//it return boolean value that show the pattrens
    if (!mongoose.Types.ObjectId.isValid(userid)) {
        return res.status(400).json({ data: 'Invalid user ID', status: false, statusCode: 400 });
    }



    try {
        const userFound = await userModel.findOne({ _id: userid })
        if (!userFound) {
            res.json({ data: 'user id not found ', status: false, statuscode: 400 })
        }
        else {
            await userModel.deleteOne({ _id: userid })
            res.json({ data: 'delete successfully', status: true, statusCode: 200 })
        }
    }
    catch (error) {
        res.json({ data: 'something issue to delete data ', status: false, statusCode: 500 })
    }
}

exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.json({ data: 'user id format is invalid', status: false, statusCode: 400 })
    }
    try {
        const userfound = await userModel.findOne({ _id: userId });
        if (!userfound) {
            return res.json({ data: 'user not found' })
        }
        else {
            const { email, password, username } = req.body;
            const Object = {};
            if (email) Object.email = email;
            if (username) Object.username = username;
            if (password) {
                console.log('inside password block')
                Object.hashPassword = await bcrypt.hash(password, 10)

            }
            const updated = await userModel.findByIdAndUpdate({ _id: userId }, Object, { new: true })
            console.log(updated, 'this is update')
            return res.json({ data: updated, stataus: 'update', status: true, statusCode: 200 })

        }
    }
    catch (error) {
        return res.json({ data: "something issue to update data", status: false, statusCode: 500 })
    }
}