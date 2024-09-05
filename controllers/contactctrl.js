const Contact = require("../models/contactmodels")
const asynchandler= require("express-async-handler")
//@desc GET all contact
//@route GET /api/contacts
//@access private
const GETcontacts =asynchandler( async(req, res) => {
    const contacts = await Contact.find({user_id: req.user.id})
    res.status(200).json({contacts})
})

//@desc pOST contact
//@route POST /api/contacts
//@access private
const POSTcontacts = asynchandler(async(req, res) => {
    console.log("The request body is", req.body)
    const {name, email, phone}= req.body
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All field are mandatory!")
    }
    const contact= await Contact.create({
        name,
        email, 
        phone, 
        user_id: req.user.id,
    })
    res.status(201).json(contact)
})

//@desc GET contact
//@route GET /api/contacts/:id
//@access private
const GETcontact = asynchandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact Not found")
    }
    res.status(200).json(contact)
})

//@desc PUT contact
//@route PUT /api/contacts/:id
//@access private
const PUTcontacts =asynchandler ( async(req, res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact Not found")
    }
    const updated_contact= await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updated_contact)
})

//@desc DELETE contact
//@route DELETE /api/contacts/:id
//@access private
const DELETEcontacts = asynchandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact Not found")
    }
    await Contact.remove();
    res.status(200).json(contact)
})

module.exports= {GETcontact, GETcontacts, POSTcontacts, PUTcontacts, DELETEcontacts};