const mongoose = require("mongoose");


const transportUserSchema = new mongoose.Schema({
  studentId: String,
  studentName: String,
  fatherName: String,
  mobileNumber: String,
  admissionClass: String,
  admissionSection: String,
  admissionSession: String,
  transportType: String,
  route: String,
  months: Number,
  totalAmount: Number,
   date: String,
  isPaid: {
    type: Boolean,
    default: false  // false = due, true = paid
  }
});

module.exports = mongoose.model("TransportUser", transportUserSchema);
