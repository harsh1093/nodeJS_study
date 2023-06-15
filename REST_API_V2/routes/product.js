const express = require('express');
const router = express.Router();
const employeeModel = require('../models/product');

//Landing Page
router.get('/', function (req, res) {
    res.render('landing')
});

// Display Index Page

router.get('/employees', async function (req, res) {
    try {
        const employees = await employeeModel.find();
        res.render('index', { employees });
    } catch (error) {
        res.send(error);
    }
});

// Redirect employee

router.get('/employees/new', function (req, res) {
    res.render('new');
});

// Add new employee

router.post('/employees', async function (req, res) {
    try {
        const newEmployee = new employeeModel({
            name: req.body.name,
            city: req.body.city,
            eid: req.body.eid,
            phone: req.body.phone,
            jobTitle: req.body.jobTitle,
            departmentTitle: req.body.departmentTitle,
            dob: req.body.dob,
            supervisor: req.body.supervisor
        })
        await newEmployee.save();
        res.redirect('/employees');
    } catch (error) {
        res.send(error);
    }
});

//Show employee page

router.get('/employees/:id', async (req, res) => {
    try {
        const employee= await employeeModel.findById(req.params.id);
        res.render('show', {employee});
    } catch (error) {
        res.send(error);
    }
});

//Edit employee page

router.get('/employees/:id/edit', async (req, res) => {
    try {
        const employee= await employeeModel.findById(req.params.id);
        res.render('edit', {employee});
    } catch (error) {
        res.send(error);
    }
});

//Update Employee Page

router.patch('/employees/:id', async (req, res) => {
    try {
        const employeeToUpdate={
            name: req.body.name,
            city: req.body.city,
            eid: req.body.eid,
            phone: req.body.phone,
            jobTitle: req.body.jobTitle,
            departmentTitle: req.body.departmentTitle,
            dob: req.body.dob,
            supervisor: req.body.supervisor
        }
        await  employeeModel.findByIdAndUpdate(req.body.id, employeeToUpdate);
        res.redirect('/employees');
    } catch (error) {
        res.send(error);
    }
});

//Destroy the employee information

router.delete('/employees/:id', async (req, res) => {
    try {
        await employeeModel.findByIdAndDelete(req.body.id);
        res.redirect('/employees');
        console.log("Data deleted");
    } catch (error) {
        res.send(error);
    }
});

router.get('*', async (req, res) => {
    res.render('errorpage');
});

module.exports = router;