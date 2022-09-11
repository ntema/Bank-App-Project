const User = require("../../model/UserSchema");
const Wallet = require('../../model/WalletSchema')
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const constants = require("../../configs/constants");

const Schema = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string().required(),
  password: Joi.string().required(),
  gender: Joi.string().required(),
  dateOfBirth: Joi.string().required(),
});

module.exports = async function (req, res, next) {
  try {
    const { error, value } = Schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: { message: error.details[0].message },
      });
    }

    const isUser = await User.findOne({ email: value.email });
    if (isUser) {
      return res.status(400).json({
        error: { message: "Email Already Exists" },
      });
    }
    value.password = await bcrypt.hash(value.password, 12);
    
    // const user = await User.create({ ...value, role: "user"});
    //create wallet
    const createWallet = async function (next){
      let amount = 0
      const wallet = await Wallet.create({
      amount,
      owned_by:user._id
    })
    next()
   }
   const preUser = User.pre('save', createWallet)

    const user = await User.save({ ...value, role: "user", preUser});

    return res.status(200).json({ status: "success", user });
  } catch (error) {
    next(error);
  }
};


// // const validateUserSchema = require('../utils/validateUserSchema')
// const User = require('../models/userSchema')
// const Joi = require('joi')
// const bcrypt = require('bcryptjs')


//     const schema = new Joi.object({
//         firstname: Joi.string().required(),
//         lastname: Joi.string().required(),
//         email: Joi.string().required(),
//         password: Joi.string().required(),
//         confirmPassword: Joi.string().required()
//     })

// const userController = async(req, res) => {
// try {
//     let {body} = req
//     console.log(body)
//     const {error, value} = schema.validate(body)
//     if(error){
//          return res.status(400).json({error:{message: error.details[0].message}})
//     }
//     const userExist = await User.findOne({email:body.email})
//     if(userExist){
//         return res.status(400).json({error:{message:'Hey!! we already have you on board. Simply just login'}})
//     }
//     if(body.password !== body.confirmPassword){
//         return res.status(400).json({error:{message:'password and comfirm password must match'}})
//     }
//     const salt =await bcrypt.genSalt(10)
//     body.password = await bcrypt.hash(body.password,salt)

//     const newUser =await User.create(body)
//         return  res.status(200).json(newUser)
    
// } catch (error) {
//      res.status(500).json(error)
// }
// }
// module.exports = userController