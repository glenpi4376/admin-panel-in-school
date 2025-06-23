const express = require("express");
const router = express.Router();
module.exports = router;

const Employee = require("./employeeSchema");

router.get("/", async(req,res) => {
    let employee = await Employee.find();

    res.status(200).json(employee);
})

router.post("/", async(req, res) => {

    let employee = Employee({

        empName: req.body.empname, 
        empMobile: req.body.empmob,
        empEmail: req.body.empemail,
        empSalary: req.body.empsal,
        empDept: req.body.empdept,
        empJoiningDate: req.body.empjoindate

    });

    await employee.save();

    res.status(200).json({'msg':'Employee Added Successfully'});
} )
