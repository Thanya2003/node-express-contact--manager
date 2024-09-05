const express = require("express");
const errorhandler = require("./middleware/errorhandler");
const connectdb = require("./config/dbconnection");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

connectdb();
app.use(express.json())
app.use("/api/contacts", require("./routes/contactroutes"))
app.use("/api/user", require("./routes/userRouters"))
app.use(errorhandler)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
