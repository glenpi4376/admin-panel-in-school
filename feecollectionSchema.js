const mongoose = require("mongoose");


const tableStructure = mongoose.Schema({

    studentName: { type: String, required: true },
    fee: { type: String, required: true },
    mode: { type: String, required: true },
    fatherName: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    purpose: { type: String, required: true},
    className: { type: String, required: true},
    session: { type: String, required: true},
    section: { type: String, required: true},
    paymentDate: Date

});

module.exports = mongoose.model("FeeCollection", tableStructure);