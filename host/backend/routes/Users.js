const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

//register
router.post("/register",async (req,res)=>{
    try{
        //generate password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password,salt)

        // generate new user
         const newUser = new User({
            username: req.body.username,
            email:req.body.email,
            password:hashedPassword
        })

        const check = await User.findOne({username:req.body.username})
        const checkEmail=await User.findOne({email:req.body.email})

        if(check){
            res.status(501).send({"msg":"user already exists"})
            return 0;
        }
        else if(checkEmail){
            res.status(501).send({"msg":"Email already exists"})
            return 0;  
        }
//save user and send response
const user= await newUser.save()
res.status(200).send(user)

        

    }catch(err){
    res.status(500).send(err)

    }
})


//login


router.post ("/login",async (req,res)=>{
    try{
 
        //find user
        const user = await User.findOne({username:req.body.username})
        !user && res.status(400).json("Wrong username or password 1")
        //validate password
        const validPassword=  await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("Wrong username or password 2")

        //send res

        res.status(200).json({_id:user._id, username: user.username})
    }
    catch(err){

    }
})


module.exports= router