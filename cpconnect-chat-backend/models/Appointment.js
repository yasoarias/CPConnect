const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  fullName: String,
  studentId: String,
  phoneNumber: String,
  purpose: String,
  preferredDate: Date,
  duration: String,
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
