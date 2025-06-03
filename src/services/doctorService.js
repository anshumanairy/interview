const { doctors } = require("../models/doctorModel");
const { appointments } = require("../models/appointmentModel");
const { v4: uuid } = require("uuid");

const registerDoctor = (req, res) => {
  const doctor = { id: uuid(), ...req.body, ratings: [] };
  doctors.push(doctor);
  res.status(201).json({ message: "Doctor registered", doctor });
};

const getAppointments = (req, res) => {
  const { doctorId } = req.params;
  const result = appointments.filter((app) => app.doctorId === doctorId);
  res.json(result);
};

const rateDoctor = (req, res) => {
  const { doctorId } = req.params;
  const { rating } = req.body;

  const doctor = doctors.find((d) => d.id === doctorId);
  if (!doctor) return res.status(404).json({ error: "Doctor not found" });

  doctor.ratings.push(rating);
  const avgRating =
    doctor.ratings.reduce((a, b) => a + b, 0) / doctor.ratings.length;
  doctor.averageRating = avgRating;

  res.json({ message: "Rated successfully", averageRating: avgRating });
};

const getAllDoctors = (req, res) => {
  res.json(doctors);
};

const addSlots = (req, res) => {
  const { doctorId } = req.params;
  const { slots } = req.body; // e.g., ["2024-06-01T09:00", "2024-06-01T10:00"]

  const doctor = doctors.find((d) => d.id === doctorId);
  if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

  doctor.slots = doctor.slots || [];
  doctor.slots.push(...slots);
  res.json({ message: 'Slots added successfully', slots: doctor.slots });
};

const getSlots = (req, res) => {
  const { doctorId } = req.params;

  const doctor = doctors.find((d) => d.id === doctorId);
  if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

  // Filter out booked slots
  const bookedSlots = appointments
    .filter((a) => a.doctorId === doctorId)
    .map((a) => a.slot);

  const availableSlots = (doctor.slots || []).filter(slot => !bookedSlots.includes(slot));
  res.json({ availableSlots });
};

module.exports = {
  registerDoctor,
  getAppointments,
  rateDoctor,
  getAllDoctors,
  addSlots,
  getSlots
};