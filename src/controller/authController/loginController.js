const User = require("../../model/UserSchema");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const constants = require("../../configs/constants");

const Schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = async function (req, res, next) {
  try {
    const { error, value } = Schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: { message: error.details[0].message },
      });
    }

    const user = await User.findOne({ email: value.email }).select("+password");
    // .select("+password")
    if (!user) {
      return res.status(400).json({
        error: { message: "Invalid email or password" },
      });
    }
    // console.log(user);
    const isPassword = await bcrypt.compare(value.password, user.password);
    console.log(value.password)
    console.log(user.password)
    console.log(isPassword)
    if (!isPassword) {
      return res.status(400).json({
        error: { message: "Invalid email or password" },
      });
    }
    const token = jwt.sign({ _id: user._id }, constants.AGENT_TOKEN_SECRET, {
      expiresIn: constants.TOKEN_EXPIRATION_TIME,
    });

    return res.status(200).json({message:'login successful', token, user });
  } catch (error) {
    next();
  }
};


// // const validateUserLogin = require('../utils/validateUserLogin')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const User = require('../model/UserSchema')
// const Joi = require('joi')
// const tokenSecret = process.env.TOKEN_SECRET

// const schema = new Joi.object({
//     email: Joi.string().email().required(),
//     password: Joi.string().required()
// }) 

// const loginController = async(req, res) => {
//    try {
//     const {body} = req
//     const {error, value} = schema.validate(body)
//     if(error){
//          return res.status(400).json({error:{message: error.details[0].message}})
//     }
//     const user = await User.findOne({email:body.email}).select('+password')
//     console.log(user.role)
//     const isPassword = await bcrypt.compare(user.password,body.password)
    
//     const token = jwt.sign({_id:user._id, role:user.role},tokenSecret, {expiresIn:'30d'})

//        return res.status(200).json({message:"Login Successful",id:user._id, token})
//    } catch (error) {
//     res.status(500).json({error:{message: error}})
//     console.log(error)
//    }

// }


// module.exports = loginController