const asynchandler= require("express-async-handler")
const User = require("../models/usermodel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

//@desc register user
//@route post /api/user/register
//@access public
const RegisterUser =asynchandler( async(req, res) =>{
    const{ username, email, password}= req.body;
    if(!username || !email || !password ){
        res.status(400)
        throw new Error("Please fill in all fields");
    }
    const userExist = await User.findOne({email});
    if (userExist){
        res.status(400)
        throw new Error("User already registered");
    }

    // hashpassword
    const hashpassword = await bcrypt.hash(password, 10)
    console.log("Hash password", hashpassword)

    const user = await User.create({
        username,
        email,
        password: hashpassword,
    })
    console.log(`User created ${user}`)
    if(user){
        res.status(201).json({_id: user.id, email: user.email})
        } else{
                res.status(400)
                throw new Error("User data us not vaild")
            }
        

    res.json({message:"Register the user"})
})

//@desc login user
//@route post /api/user/login
//@access public
const loginUser =asynchandler( async(req, res) =>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All the feild mandatory! ")
    }

    const user = await User.findOne({email});

    //compare password with hashpassword
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign(
            {
                user:{
                    username: user.username,
                    email: user.email,
                    id: user.id
                },
            },
            process.env.ACCESS_TOKEN_SCERT,
            {expiresIn: "15m"}
        )

        res.status(200).json({ accessToken})
    }else{
        res.status(401)
        throw new Error("email or password is not valid")
    }
})

//@desc current user
//@route post /api/user/current
//@access private
const currentUser =asynchandler( async(req, res) =>{
    res.json(req.user)
})

module.exports = {RegisterUser, loginUser, currentUser}
