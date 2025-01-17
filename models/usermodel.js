const mongoose = require("mongoose")

const userschema= mongoose.Schema({
    username:{
        type: String,
        required: [true, "Pleasecadd the user name"]
    },
    email:{
        type: String,
        required: [true, "Please add the email"],
        unique:[true,"Email address already taken"]
    },
    password:{
        type: String,
        required: [true, "Please add the password"],
    }
},
{
    timestamps: true,
})
 module.exports = mongoose.model("user", userschema)