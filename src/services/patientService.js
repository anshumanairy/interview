const { patients } = require("../models/patientModel");
const { doctors } = require("../models/doctorModel");
const { appointments } = require("../models/appointmentModel");
const { v4: uuid } = require("uuid");

const registerPatient = (req, res) => {
  const patient = { id: uuid(), ...req.body };
  patients.push(patient);
  res.status(201).json({ message: "Patient registered", patient });
};

const bookAppointment = (req, res) => {
  const { patientId, doctorId, slot } = req.body;

  const existing = appointments.find(
    (app) => app.patientId === patientId && app.slot === slot
  );
  if (existing)
    return res
      .status(400)
      .json({ error: "Slot already booked by this patient" });

  const appointment = { id: uuid(), patientId, doctorId, slot };
  appointments.push(appointment);
  res.status(201).json({ message: "Appointment booked", appointment });
};

const getAppointments = (req, res) => {
  const { patientId } = req.params;
  const result = appointments.filter((app) => app.patientId === patientId);
  res.json(result);
};

const cancelAppointment = (req, res) => {
  const { patientId } = req.params;
  const { appointmentId } = req.body;

  const index = appointments.findIndex(
    (app) => app.id === appointmentId && app.patientId === patientId
  );
  if (index === -1)
    return res.status(404).json({ error: "Appointment not found" });

  appointments.splice(index, 1);
  res.json({ message: "Appointment cancelled" });
};

const getAllPatients = (req, res) => {
  res.json(patients);
};

const getOpenDoctorSlots = (req, res) => {
  const { speciality, slot } = req.query;

  // Filter doctors by speciality if provided
  let filteredDoctors = speciality
    ? doctors.filter(d => d.speciality.toLowerCase() === speciality.toLowerCase())
    : doctors;

  // Collect all open slots per doctor
  const results = filteredDoctors.map(doctor => {
    const bookedSlots = appointments
      .filter(a => a.doctorId === doctor.id)
      .map(a => a.slot);

    const availableSlots = (doctor.slots || []).filter(s => !bookedSlots.includes(s));

    return {
      doctorId: doctor.id,
      doctorName: doctor.name,
      speciality: doctor.speciality,
      availableSlots: slot
        ? availableSlots.filter(s => s === slot)
        : availableSlots
    };
  }).filter(d => d.availableSlots.length > 0); // Only keep doctors with open slots

  res.json(results);
};


module.exports = {
  registerPatient,
  bookAppointment,
  getAppointments,
  cancelAppointment,
  getAllPatients,
  getOpenDoctorSlots,
};
