const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: v => /^[0-9]{10}$/.test(v),
      message: props => `${props.value} is not a valid 10-digit phone number!`
    }
  },
  address: { type: String, required: true }
}, { timestamps: true });


module.exports = mongoose.model('Employee', employeeSchema);
