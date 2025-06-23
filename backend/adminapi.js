const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
module.exports = router;

const Admin = require("./adminSchema");

// router.get("/", async(req, res) => {
//     let pwd = await Admin.find();

//     res.status(200).json(pwd);
// })

// router.post("/", async(req, res) => {

//     let input = {
//         email: req.body.emailid,
//         pass: req.body.password
//     };

//     let admin = await Admin.findOne(input);
//     console.log(admin);

//     if(admin != null) {

//         let token = Date.now();
//         admin.token = token;
//         await admin.save();
//         res.status(200).json(admin);

//     } else {
//         res.status(200).json(admin);
//     }
// })

router.post("/verify-password", async (req, res) => {
  const { emailid, password } = req.body;

  const admin = await Admin.findOne({ email: emailid });

  if (!admin) return res.status(404).json({ msg: "Admin not found" });

  const isMatch = await bcrypt.compare(password, admin.pass);
  if (!isMatch) return res.status(401).json({ msg: "Incorrect password" });

  res.status(200).json({ success: true, adminId: admin._id });
});

router.post("/", async (req, res) => {
  const { emailid, password } = req.body;

  try {
    // 1. Find the admin by email
    const admin = await Admin.findOne({ email: emailid });

    if (!admin) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // 2. Compare plain password with hashed password
    const isMatch = await bcrypt.compare(password, admin.pass);

    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // 3. Generate token or any session logic
    admin.token = Date.now();
    await admin.save();

    res.status(200).json(admin);

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  let id = req.params.id;
  let updatedData = req.body;

  const hashedpassword = await bcrypt.hash(updatedData.pass,10);

  await Admin.findByIdAndUpdate(id, {pass:hashedpassword});
  res.status(200).json({ msg: "Password updated" });
});