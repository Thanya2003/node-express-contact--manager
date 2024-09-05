const mongoose = require("mongoose")

const connectdb = async () =>{
    try {
        const conn = await mongoose.connect(process.env.connection_string)
        console.log("Database is connected", conn.connection.host, conn.connection.name)
    }
    catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectdb;