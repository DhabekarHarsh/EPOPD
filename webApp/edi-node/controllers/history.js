const history = require("../models/history");

exports.saveHistory = async (req, res) => {
    try {
      const { userId, objType, filename, parkinsonProb, healthProb} = req.body;
      res.json(await new history({ userId, objType, filename, parkinsonProb, healthProb }).save());
    } catch (err) {
      console.log(err);
      res.status(400).send("Saving history failed");
    }
};

exports.getHistoryforUser = async (req, res) => {
  const { uId }=req.body;
  const hist= await history.find({userId:uId}).exec();
  res.json(hist);
};