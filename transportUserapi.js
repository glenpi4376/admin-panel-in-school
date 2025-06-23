const express = require("express");
const router = express.Router();
const TransportUser = require("./transportUserSchema");

// POST - add transport user assignment
router.post("/", async (req, res) => {
  try {
    const newUser = new TransportUser(req.body);
    await newUser.save();
    res.status(201).json({ message: "Transport user saved" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - get all transport users
router.get("/", async (req, res) => {
  try {
    const users = await TransportUser.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/due", async (req, res) => {
  try {
    const filter = buildFilter(req.query);
    const users = await TransportUser.find({ ...filter, isPaid: false });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /settled - paid transport users
router.get("/settled", async (req, res) => {
  try {
    const { date } = req.query;

    if (date) {
      // PaymentsToday case: match the string exactly
      const settledToday = await TransportUser.find({
        isPaid: true,
        date: date   // exact string match, e.g. "2025-06-05"
      });
      return res.status(200).json(settledToday);
    }

    // FeeCollection case: filter by session/class/section
    const filter = buildFilter(req.query);
    const settledFiltered = await TransportUser.find({
      ...filter,
      isPaid: true
    });
    return res.status(200).json(settledFiltered);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// helper to build query filter from optional parameters
function buildFilter(query) {
  let filter = {};
  if (query.session) filter.admissionSession = query.session;
  if (query.className) filter.admissionClass = query.className;
  if (query.section) filter.admissionSection = query.section;
  return filter;
}

router.put("/pay/:id", async (req, res) => {
  try {
    const user = await TransportUser.findByIdAndUpdate(req.params.id, {
      isPaid: true,
      date: new Date()// update date if needed
    });
    res.status(200).json({ message: "Payment marked as settled" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;