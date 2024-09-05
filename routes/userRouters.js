const express = require("express");
const { RegisterUser, loginUser, currentUser } = require("../controllers/userctrl");
const validateToken = require("../middleware/validateTokenHnadler");
const router = express.Router();

router.post("/register", RegisterUser)

router.post("/Login", loginUser)

router.get("/Current", validateToken, currentUser)

module.exports =  router;