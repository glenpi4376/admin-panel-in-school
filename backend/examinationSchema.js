const mongoose = require("mongoose");


const tableStructure = mongoose.Schema({

    className: { type: String, required: true},
    examName: { type: String, required: true},
    startingDate: { type: String, required: true},
    examFee: { type: String, required: true }

})

module.exports = mongoose.model("Examination", tableStructure);
