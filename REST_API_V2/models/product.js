const mongoose= require('mongoose');

const employeeSchema= new mongoose.Schema({
    name: String,
    city: String,
    eid: String,
    phone: Number,
    jobTitle: String,
    departmentTitle: String,
    dob: String,
    supervisor: String
});

const employeeModel = mongoose.model('employeeInfo', employeeSchema );

module.exports = employeeModel;