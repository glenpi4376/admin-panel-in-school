const express = require("express");
const router = express.Router();
module.exports = router;

const FeeCollection = require("./feecollectionSchema");
const Examination = require("./examinationSchema");
const Admission = require("./admissionSchema");

router.post("/", async(req,res) => {
    
    let payment = FeeCollection({
  studentName: req.body.sName,
  fee: req.body.fee,
  mode: req.body.mode,
  fatherName: req.body.fname,
  mobileNumber: req.body.mobile,
  purpose: req.body.purpose,
  className: req.body.cname,
  session: req.body.session,     // ADD THIS
  section: req.body.section,     // ADD THIS
  paymentDate: new Date()
});

    await payment.save();
    res.status(200).json({ msg: "Payment saved" });
    
})

router.get("/due", async (req, res) => {
    const { session, className, section } = req.query;

    let query = {};
    if (session) query.admissionSession = session;
    if (className) query.admissionClass = className;
    if (section) query.admissionSection = section;

    const students = await Admission.find(query);

    // Handle empty className: fetch all exams or skip class filter
    let exams = [];
    if (className) {
        const exam = await Examination.findOne({ className });
        if (!exam) return res.status(404).json({ msg: "No exam found for this class" });
        exams = [exam];
    } else {
        exams = await Examination.find(); // All exams
    }

    const result = [];

    for (let student of students) {
        // Find the exam matching this student's class
        const exam = exams.find(e => e.className === student.admissionClass);
        if (!exam) continue;

        const paid = await FeeCollection.findOne({
            studentName: student.studentName,
            purpose: exam.examName,
            className: student.admissionClass,
        });

        if (!paid) {
            result.push({
                studentName: student.studentName,
                fatherName: student.fatherName,
                mobileNumber: student.mobileNumber,
                className: student.admissionClass,
                section: student.admissionSection,
                session:student.admissionSession,
                purpose: exam.examName,
                fee: exam.examFee
            });
        }
    }

    res.status(200).json(result);
});

router.get("/today", async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const payments = await FeeCollection.find({
    paymentDate: { $gte: today, $lt: tomorrow }
  });

  res.status(200).json(payments);
});

router.get("/report", async(req, res) => {
  const { session, className, section } = req.query;

  let filter = {};
  if (session) filter.session = session;
  if (className) filter.className = className;
  if (section) filter.section = section;

  const result = await FeeCollection.find(filter).sort({ paymentDate: -1 });
  res.json(result);
});

router.get("/settled", async (req, res) => {
  const { session, className, section } = req.query;

  let query = {};
  if (session) query.session = session;
  if (className) query.className = className;
  if (section) query.section = section;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  // query.paymentDate = { $gte: today, $lt: tomorrow };

  const settledPayments = await FeeCollection.find(query);
  res.json(settledPayments);
});
