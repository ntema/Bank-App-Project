const User = require('../../model/UserSchema')
const tokenSecret = process.env.TOKEN_SECRET
const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    let token 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]
            jwt.verify(token, tokenSecret,async(err,user)=>{
                if(err){
                    res.status(401).json({error:{message:'Access denied, Invalid token'}})
                }else{
                    req.user = await User.findOne({_id: user._id})
                    next()
                }
            })
        }catch(err){
            res.status(400).json(err)
        }
    }
    if(!token){
        res.status(400).json({error:{message:'Access denied, No token for authorization'}})
    }
}


module.exports = verifyToken