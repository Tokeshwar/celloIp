const doctorModel = require("../model/doctorModel")
const jwt = require("jsonwebtoken")

const isValid = function (value) {
    if (typeof value == undefined || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const createDoctorData = async function (req, res) {

    try {

        const data = req.body
        const query = req.query
        if (isValidRequestBody(query)) {
            return res.status(400).send({ status: false, message: 'This operation is not allowed..!!' })
        }


        if (!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "Please provide Data..!!" })
        }

        if (!isValid(data.doctorName)) {
            return res.status(400).send({ status: false, message: "Doctor name is required..!!" })
        }
        if (!isValid(data.Type)) {
            return res.status(400).send({ status: false, message: "Type is required..!!" })
        }


        if (!isValid(data.Mobile)) {
            return res.status(400).send({ status: false, message: "Mobile number is required..!!" })
        }

        if (!(/^([+]\d{2})?\d{10}$/.test(data.Mobile))) {
            return res.status(400).send({ status: false, message: "Please provide a valid moblie Number..!!" })
        }

        // let duplicateMobile = await doctorModel.findOne({ mobile: data.Mobile })
        // if (duplicateMobile) {
        //     return res.status(400).send({ status: false, message: "Mobile number already exists" })
        // }


        if (!isValid(data.Email)) {
            return res.status(400).send({ status: false, message: "Email required..!!" })
        }
        if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(data.Email))) {
            return res.status(400).send({ status: false, message: "Please provide a valid email..!!" });
        }

        // let duplicateEmail = await doctorModel.findOne({ email: data.Email })
        // if (duplicateEmail) {
        //     return res.status(400).send({ status: false, message: "Email already exists" })
        // }


        if (!isValid(data.Password)) {
            return res.status(400).send({ status: false, message: "Password required..!!" })
        }
        if (!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(data.Password))) {

            return res.status(400).send({ status: false, message: "please provide a valid password with one uppercase letter ,one lowercase, one character and one number..!!" })
        }


        const savedData = await doctorModel.create(data)

        return res.status(201).send({ status: true, userData: savedData })

    } catch (error) {

        return res.status(500).send({ Status: false, message: error.message })
    }
}

// user login..............................................................................

const doctorLogin = async function (req, res) {

    try {
        let data = req.body
        let query = req.query
        if (isValidRequestBody(query)) {
            return res.status(400).send({ status: false, message: 'This operation is not allowed..!!' })
        }

        if (!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "Please input Some Data..!!" })
        }

        if (!isValid(data.Email)) {
            return res.status(401).send({ status: false, message: "Email is required..!!" })
        }

        if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(data.Email))) {
            return res.status(400).send({ status: false, message: "Please provide a valid email" });
        }

        if (!isValid(data.Password)) {
            return res.status(401).send({ status: false, message: "Password is required..!!" })
        }

        if (!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(data.Password))) {

            return res.status(400).send({ status: false, message: "please provide a valid password with one uppercase letter ,one lowercase, one character and one number..!!" })
        }

        const doctor = await doctorModel.findOne({ email: data.Email, password: data.Password })
        if (!doctor) {
            return res.status(404).send({ status: false, message: "User not  found" })
        }

       
        const doctorID = doctor._id        
        const payLoad = {doctorId : doctorID }
        const secretKey = "celloip"

       // creating JWT
        const token = jwt.sign(payLoad, secretKey)
        

        res.status(200).send({status: true, message: "Login successful" , data: token})

    } catch (err) {
       return res.status(500).send({ status: false, message: err.message })
    }
}





module.exports = { createDoctorData, doctorLogin }