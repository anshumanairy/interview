const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  speciality: { type: String, required: true },
  slots: [String],
  ratings: [Number],
  averageRating: { type: Number, default: 0 }
});

module.exports = mongoose.model('Doctor', doctorSchema);
