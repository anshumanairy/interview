const express = require("express");
const {
  registerPatient,
  bookAppointment,
  getAppointments,
  cancelAppointment,
  getAllPatients,
  getOpenDoctorSlots
} = require("../../services/patientService");
const { validatePatient, validateBooking } = require("../../utils/validators");

const router = express.Router();

router.post("/register", validatePatient, registerPatient);
router.post("/book", validateBooking, bookAppointment);
router.get("/:patientId/appointments", getAppointments);
router.post("/:patientId/cancel", cancelAppointment);
router.get("/all", getAllPatients);
router.get('/open-slots', getOpenDoctorSlots);


module.exports = router;
