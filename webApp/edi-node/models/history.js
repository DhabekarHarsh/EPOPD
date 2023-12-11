const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const historySchema = new mongoose.Schema({
    userId:{
        type:ObjectId, ref: "User"
    }, 
    objType:{
        type:String, required:true
    },
    filename:{
        type:String, required:true
    },
    parkinsonProb:{
        type:String, required:true
    },
    healthProb:{
        type:String, required:true
    }
}, { timestamps: true })

module.exports = mongoose.model("History", historySchema);