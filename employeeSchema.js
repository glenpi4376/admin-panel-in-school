const mongoose = require("mongoose");

const tableStructure = mongoose.Schema({

    empName: { type: String, required: true},
    empMobile: { type: Number, required: true},
    empEmail: { type: String, required: true},
    empSalary: { type: Number, required: true},
    empDept: { type: String, required: true},
    empJoiningDate: { type: String, required: true}
});

module.exports = mongoose.model("Employee", tableStructure);