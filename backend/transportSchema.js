const mongoose = require("mongoose");

const tableStructure = mongoose.Schema({

    TNumber: {type: String, required: true},
    TRoute: { type: String, required: true},
    Ttype: {type: String, required: true},
    DName: { type: String, required: true},
    DMobile: { type: Number, required: true}


})

module.exports = mongoose.model("Transport", tableStructure);
