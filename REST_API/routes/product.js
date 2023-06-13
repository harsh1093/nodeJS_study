const express = require('express');
const router = express.Router();
const studentModel = require('../models/product');

//REST API

//Step 1: Display the product

router.get('/students', async function (req, res) {
    try {
        const students = await studentModel.find();
        res.render('index', { students });
    } catch (error) {
        res.send(error);
    }
});

//Step 2 New->  Show a Form

router.get('/students/new', function (req, res) {
    res.render('new');
});

//Step 3 Create -> Add Data to Database 
router.post('/students', async function (req, res) {
    try {
        const newStudent = new studentModel({
            name: req.body.name,
            rollNo: req.body.rollNo,
            address: req.body.address,
            stream: req.body.stream,
            year: req.body.year,
            phone: req.body.phone,
            email: req.body.email
        })
        await newStudent.save();
        console.log('Added to database');
        res.redirect('/students');
    } catch (error) {
        res.send(error);
    }
});

//Step 4 Display Student Information

router.get('/students/:id', async function(req, res) {
    try {
        const student = await studentModel.findById(req.params.id);
		res.render('show', { student });
    } catch (error) {
        res.send(error);
    }
});

//Step 5 Edit Student Information
router.get('/students/:id/edit', async (req, res)=>{
    res.render('edit', { id: req.params.id});
});

//Step 6 Update Student Information
router.patch('/students/:id', async function(req, res){
    try {
        const dataToUdapte= {
            name: req.body.name,
            rollNo: req.body.rollNo,
            address: req.body.address,
            stream: req.body.stream,
            year: req.body.year,
            phone: req.body.phone,
            email: req.body.email
        }
        await studentModel.findByIdAndUpdate(req.params.id, dataToUdapte);
        res.redirect('/students');
    } catch (error) {
        res.send(error);
    }
});

//Step 7 Destory
router.delete('/students/:id', async function(req, res){
    try {
        await studentModel.findByIdAndDelete(req.params.id);
        res.redirect('/students');
    } catch (error) {
        res.send(error);
    }
});


module.exports = router;