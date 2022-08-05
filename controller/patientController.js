const patientModel = require('../model/patientModel')
const mongoose = require('mongoose')


const isValid = function (value) {
    if (typeof value == undefined || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}


const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}


const isValidobjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId.trim())
}

const isValidGender = function (Gender) {
    return ["Male", "Female", "Other"].indexOf(Gender) !== -1
}

//................................c...........................................

const createPatientData = async function (req, res) {
    try {
        const data = req.body
        const query = req.query

        const { doctorId, patientName, Email, Age, Gender } = data


        if (isValidRequestBody(query)) {
            return res.status(400).send({ status: false, message: 'This operation is not allowed..!!' })
        }

        if (!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: 'Please insert valid data..!!' })
        }

        if (!isValid(doctorId)) {
            return res.status(400).send({ status: false, message: 'Doctor Id is required' })
        }

        if (!isValidobjectId(doctorId)) {
            return res.status(400).send({ status: false, message: 'Please insert valid doctor Id..!!' })
        }

        if (!isValid(patientName)) {
            return res.status(400).send({ status: false, message: 'Patient name is required..!!' })
        }

        if (!isValid(Email)) {
            return res.status(400).send({ status: false, message: 'Email is required..!!' })
        }

        if (!isValid(Age)) {
            return res.status(400).send({ status: false, error: 'Age is required..!!' })
        }

        if (!isValid(Gender)) {
            return res.status(400).send({ status: false, message: 'Gender is required..!!' })
        }

        if (!isValidGender(Gender)) {
            return res.status(400).send({ status: false, message: 'Valid gender name is required..!!' })
        }

        // const duplicateTitle = await patientModel.findOne({ title })

        // if (duplicateTitle) {

        //    return res.status(400).send({status:false, message: 'This title already exist' })

        // }

        let patient = await patientModel.create(data)
        return res.status(201).send({ status: true, message: "Successfull", patientData: patient })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}



const patientList = async function (req, res) {
    try {
        let { page, limit } = req.query;
        if (!page) page = 1;
        if (!limit) limit = 10;
        const skip = (page - 1) * 10;
        const patients = await patientModel.find().skip(skip).limit(limit);

        return res.send({ page: page, limit: limit, patientDetails: patients })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}


const getPatientByName = async function (req, res) {
    try {
        const patientName = req.params.patientName;

        const patient = await patientModel.findOne({ name: patientName });
        if (!patient) return res.status(400).send({ status: false, message: "Patient is deleted..!!" })

        return res.status(200).send({ status: true, message: "Successfull", patientData: patient })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const deletePatientById = async function (req, res) {
    try {
        const patientId = req.params.patientId;

        const patient = await patientModel.findByIdAndRemove({ _id: patientId });
        if (!patient) return res.status(400).send({ status: false, message: "Patient is already deleted..!!" })

        return res.status(200).send({ status: true, message: "Patient data deleted successfully..!!" })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const filteredPatient =async function(req,res){

    let data = req.query
    let {name,age,email,gender} = data


    let filter ={
        name:name,
        age:age,
        email:email,
        gender:gender
    }


    let filteredData = await patientModel.find(filter)


    if(!filteredData){
        res.status(404).send({status:false,msg:"no such patienf found"})
    }

    res.send(filteredData)
}




module.exports = { createPatientData, patientList, getPatientByName, deletePatientById, filteredPatient}