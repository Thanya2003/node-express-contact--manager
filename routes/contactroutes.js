const express = require("express");
const router = express.Router();
const {GETcontact, GETcontacts, POSTcontacts, PUTcontacts, DELETEcontacts}= require("../controllers/contactctrl");
const validateToken = require("../middleware/validateTokenHnadler");
 
router.route("/").get(GETcontacts).post(POSTcontacts)

router.route("/:id").get(GETcontact).put(PUTcontacts).delete(DELETEcontacts)

router.use(validateToken)

module.exports= router;
