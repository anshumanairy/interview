const Patient = require("../models/patientModel");
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");

const registerPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json({ message: "Patient registered", patient });
  } catch (err) {
    res.status(500).json({ error: "Failed to register patient" });
  }
};

const bookAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, slot } = req.body;

    const conflict = await Appointment.findOne({ patientId, slot });
    if (conflict)
      return res
        .status(400)
        .json({ error: "Slot already booked by this patient" });

    const appointment = new Appointment({ patientId, doctorId, slot });
    await appointment.save();
    res.status(201).json({ message: "Appointment booked", appointment });
  } catch (err) {
    res.status(500).json({ error: "Failed to book appointment" });
  }
};

const getAppointments = async (req, res) => {
  try {
    const { patientId } = req.params;
    const appointments = await Appointment.find({ patientId });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Failed to get appointments" });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { appointmentId } = req.body;

    const deleted = await Appointment.findOneAndDelete({
      _id: appointmentId,
      patientId,
    });
    if (!deleted)
      return res.status(404).json({ error: "Appointment not found" });

    res.json({ message: "Appointment cancelled" });
  } catch (err) {
    res.status(500).json({ error: "Failed to cancel appointment" });
  }
};

const getAllPatients = async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
};

const getOpenDoctorSlots = async (req, res) => {
  try {
    const { speciality, slot } = req.query;

    const doctorFilter = speciality
      ? { speciality: { $regex: new RegExp(speciality, "i") } }
      : {};
    const doctors = await Doctor.find(doctorFilter);

    const appointments = await Appointment.find();
    const doctorAppointments = appointments.reduce((acc, app) => {
      if (!acc[app.doctorId]) acc[app.doctorId] = new Set();
      acc[app.doctorId].add(app.slot);
      return acc;
    }, {});

    const results = doctors
      .map((doc) => {
        const booked = doctorAppointments[doc._id] || new Set();
        const availableSlots = (doc.slots || []).filter((s) => !booked.has(s));

        return {
          doctorId: doc._id,
          doctorName: doc.name,
          speciality: doc.speciality,
          averageRating: doc.averageRating || 0,
          availableSlots: slot
            ? availableSlots.filter((s) => s === slot)
            : availableSlots,
        };
      })
      .filter((doc) => doc.availableSlots.length > 0);

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch open slots" });
  }
};

module.exports = {
  registerPatient,
  bookAppointment,
  getAppointments,
  cancelAppointment,
  getAllPatients,
  getOpenDoctorSlots,
};
