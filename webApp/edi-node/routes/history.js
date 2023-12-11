const express = require("express");
const router = express.Router();
const { saveHistory, getHistoryforUser} = require("../controllers/history");

router.post("/savehistory", saveHistory);
// router.post("/gethistorybyid", getHistoryById);
router.post("/gethistoryforuser", getHistoryforUser);
module.exports = router;