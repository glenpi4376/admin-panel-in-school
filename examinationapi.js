const express = require("express");
const router = express.Router();
module.exports = router;

const Examination = require("./examinationSchema");

router.get("/", async(req, res) => {

    let examdetails = await Examination.find();

    res.status(200).json(examdetails);
})

router.post("/", async(req, res) => {

    let examdetail = Examination({

        className: req.body.cname,
        examName: req.body.ename,
        startingDate: req.body.sdate,
        examFee: req.body.efee

    });

    await examdetail.save();

    res.status(200).json({'msg':'Examination Details Saved Successfully!'});

})