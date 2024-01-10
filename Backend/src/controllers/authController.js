
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const {senMailResetPass} = require('../utils/email')
function generatePass() {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz0123456789@#$';
 
    for (let i = 1; i <= 8; i++) {
        let char = Math.floor(Math.random()
            * str.length + 1);
 
        pass += str.charAt(char)
    }
 
    return pass;
}
module.exports = {
    login:async(req,res,next)=>{
        try {
        const data = req.body; 
        const user = await User.findOne({ email: data.email });

        if (user) {
          const decryptPass = CryptoJS.AES.decrypt(
            user.password,
            process.env.AES_SECRET
          );
          const originPass = decryptPass.toString(CryptoJS.enc.Utf8);

          if (originPass === data.password) {
            const token = jwt.sign(
              { userName: user.userName, isAdmin: user.isAdmin },
              process.env.JWT_TOKEN,
              {
                expiresIn: "3d",
              }
            );
            const { password, ...subInfoUser } = user._doc;
            const infoUser = { ...subInfoUser, token };
            
              res.status(200).json({
                success:true,
                data:infoUser
              })
            }else{
                res.status(400).json({
                    success:'false',
                    data:'Password incorrect!.'
                })
            }
        }else {
            res.status(404).json({
                success:'false',
                data:'Email not existed.'
            })
        }

        } catch (error) {
            res.status(500).json(error); 
        }
    }, 
    register:async(req,res,next)=>{
        const userInfo = req.body; 
        try {              
            const check = await User.findOne({ email: userInfo.email });
            if(check){
                res.status(400).json({
                    success:'false',
                    data:'Email already exists.'
                })
            }

            const hashPassword = CryptoJS.AES.encrypt(
                userInfo.password,
                process.env.AES_SECRET
            ).toString();
            userInfo.password = hashPassword;
            
            const user = new User(userInfo); 
            const data = await user.save(); 
            res.status(200).json({
                success:true,
                data:data
            })
        
        } catch (error) {
            console.log(error)
            res.status(500).json(error); 
        }
    },

    resetPassword:async(req,res,next)=>{
        try {              
            const check = await User.findOne({ email: req.body.email });
            if(!check){
                res.status(400).json({
                    success:'false',
                    data:'Email not exist.'
                })
            }

            const newPass = generatePass(); 

            const hashPassword = CryptoJS.AES.encrypt(
                newPass,
                process.env.AES_SECRET
            ).toString();
       
            
            check.password = hashPassword; 
            const data = await User.findByIdAndUpdate({_id:check._id},check,{
                new:true
            })

            senMailResetPass(req.body.email,newPass)
           
            res.status(200).json({
                success:true,
                data:data
            })
        
        } catch (error) {
            console.log(error)
            res.status(500).json(error); 
        }
    }

    
}

