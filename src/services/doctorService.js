const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");

const registerDoctor = async (req, res) => {
  try {
    const doctor = new Doctor({ ...req.body, slots: [], ratings: [] });
    await doctor.save();
    res.status(201).json({ message: "Doctor registered", doctor });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Registration failed", details: err.message });
  }
};

const getAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointments = await Appointment.find({ doctorId });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Failed to get appointments" });
  }
};

const rateDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { rating } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    doctor.ratings.push(rating);
    doctor.averageRating =
      doctor.ratings.reduce((a, b) => a + b, 0) / doctor.ratings.length;
    await doctor.save();

    res.json({
      message: "Rated successfully",
      averageRating: doctor.averageRating,
    });
  } catch (err) {
    res.status(500).json({ error: "Rating failed" });
  }
};

const getAllDoctors = async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
};

const addSlots = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { slots } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    doctor.slots.push(...slots);
    await doctor.save();
    res.json({ message: "Slots added", slots: doctor.slots });
  } catch (err) {
    res.status(500).json({ error: "Failed to add slots" });
  }
};

const getSlots = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    const booked = await Appointment.find({ doctorId });
    const bookedSlots = booked.map((b) => b.slot);

    const availableSlots = (doctor.slots || []).filter(
      (s) => !bookedSlots.includes(s)
    );
    res.json({ availableSlots });
  } catch (err) {
    res.status(500).json({ error: "Failed to get slots" });
  }
};

module.exports = {
  registerDoctor,
  getAppointments,
  rateDoctor,
  getAllDoctors,
  addSlots,
  getSlots,
};
