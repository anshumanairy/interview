const express = require("express");
const {
  registerDoctor,
  getAppointments,
  rateDoctor,
  getAllDoctors,
  addSlots,
  getSlots,
} = require("../../services/doctorService.js");
const { validateDoctor } = require("../../utils/validators.js");

const router = express.Router();

router.post("/register", validateDoctor, registerDoctor);
router.get("/:doctorId/appointments", getAppointments);
router.post("/:doctorId/rate", rateDoctor);
router.get('/all', getAllDoctors);
router.post('/:doctorId/slots', addSlots);
router.get('/:doctorId/slots', getSlots);

module.exports = router;
