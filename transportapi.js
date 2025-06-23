const express = require("express");
const router = express.Router();
module.exports = router;

const Transport = require("./transportSchema");

router.get("/", async(req, res) => {

    let details = await Transport.find();


    res.status(200).json(details);

});

router.delete("/:id", async(req, res) => {

    let detail = await Transport.findById(req.params.id);

    await detail.deleteOne();

    res.status(200).json({'msg':'Detail Deleted Successfully!'});
})

router.put("/:id", async(req, res) => {
    let detail = await Transport.findById(req.params.id);

    detail.TNumber = req.body.transportno;
    detail.TRoute = req.body.transportroute;
    detail.Ttype = req.body.transporttype;
    detail.DName = req.body.drivername;
    detail.DMobile = req.body.drivermobile;

    await detail.save();

    res.status(200).json({ msg: "Details updated successfully!" });
})
router.post("/", async(req,res) => {

    let details = Transport({
        
        TNumber: req.body.transportno,
        TRoute: req.body.transportroute,
        Ttype: req.body.transporttype,
        DName: req.body.drivername,
        DMobile: req.body.drivermobile 

    })

    await details.save();

    res.status(200).json({'msg':'Details saved successfully!'});

})