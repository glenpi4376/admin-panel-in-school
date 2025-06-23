const mongoose = require('mongoose');

const tableStrucutre = mongoose.Schema({
    fullName: { type: String, required: false},
    email: { type: String, required: true},
    pass: { type: String, required: true}
})

module.exports = mongoose.model("Admin",tableStrucutre);
