const express = require("express");
const router = express.Router();
module.exports = router;

const Admission = require("./admissionSchema");

router.get("/", async(req, res) => {

    const { session, class: admissionClass, section } = req.query;
    let filter = {};

    if (session) filter.admissionSession = session;
    if (admissionClass) filter.admissionClass = admissionClass;
    if (section) filter.admissionSection = section;

    const studentList = await Admission.find(filter);
    res.status(200).json(studentList);
})

router.post("/", async(req, res) => {

    let details = Admission({
        studentName: req.body.sName,
        dob: req.body.dob,
        admissionClass: req.body.class,
        admissionSection: req.body.section,
        admissionDate: req.body.date,
        admissionSession: req.body.session,
        oldschool: req.body.oldschool,
        fatherName: req.body.fname,
        mobileNumber: req.body.mobile,
        religion: req.body.religion,
        parentOccupation: req.body.poccupation,
        motherName: req.body.mname,
        adhaarNumber : req.body.adhaar,
        caste: req.body.caste,
        idProof: req.body.id,
        address: req.body.address

    });

    await details.save();

    res.status(200).json({'msg':'Details of New Student Added Successfully'});


} )
