const express = require('express');
const router = express.Router();

const doctorController = require("../controller/doctorController")
const patientController = require("../controller/patientController")
const authController = require("../middleware/auth.js")

// ...................Doctor Api..................

router.post("/register", doctorController.createDoctorData)
router.post("/login", doctorController.doctorLogin)

// ...................Patient Api..............................

router.post("/patient", authController.authenticate, patientController.createPatientData)
router.get("/patient/:patientName", authController.authenticate, patientController.getPatientByName)
router.delete("/patient/:patientId", authController.authenticate, patientController.deletePatientById)
router.get("/filteredPatient", patientController.filteredPatient)
router.get("/patients", authController.authenticate, patientController.patientList);


module.exports = router;