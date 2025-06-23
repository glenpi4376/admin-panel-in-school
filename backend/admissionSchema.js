const mongoose = require("mongoose");

const tableStructure = mongoose.Schema({

    studentName: { type: String, required: true },
    dob: {type: String, required: true },
    admissionClass: { type: String, required: true },
    admissionSection: { type: String, required: true },
    admissionDate: { type: String, required: true },
    admissionSession: { type: String, required: true },
    oldschool: { type: String, required: false },
    fatherName: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    religion: { type: String, required: true },
    parentOccupation: { type: String, required: false },
    motherName: { type: String, required: false },
    adhaarNumber : { type: Number, required: false },
    caste: { type: String, required: false },
    idProof: { type: String, required: false },
    address: { type: String, required: true }

})

module.exports = mongoose.model("Admission", tableStructure);
