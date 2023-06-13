const mongoose = require('mongoose');

const studentSchema= new mongoose.Schema({
    name: String,
    rollNo: Number,
    address: String,
    stream: String,
    year: String,
    phone: Number,
    email: String
});

const studentModel = mongoose.model('studentInfo', studentSchema);

module.exports = studentModel;
