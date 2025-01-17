const asynchandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const validateToken = asynchandler(async(req, res, next) =>{
    let token;
    let authheader = req.headers.Authorization || req.headers.authorization;
    if(authheader && authheader.startsWith("Bearer")){
        token = authheader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SCERT, (err, decoded) =>{
            if(err){
                res.status(401)
                throw new Error("user is not authorized")
            }
            req.user= decoded.user;
            next();
        })
        if(!token){
            res.status(401)
            throw new Error("user is not authorized or token is missing")
        }
    }
})
module.exports = validateToken;