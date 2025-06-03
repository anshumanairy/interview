const { body, validationResult } = require('express-validator');

const validateDoctor = [
  body('name').notEmpty(),
  body('speciality').notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

const validatePatient = [
  body('name').notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

const validateBooking = [
  body('patientId').notEmpty(),
  body('doctorId').notEmpty(),
  body('slot').notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

module.exports = {
  validateDoctor,
  validatePatient,
  validateBooking,
};
