const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect(
    "mongodb+srv://ebru:ebru1995@cluster0.qzbfs.mongodb.net/rice?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
);
  

const JobsModel = mongoose.model("Jobs",{
    jobsName: {
        type: String,
        required: true
    },
    jobPriority: {
        type: Number,
        required: true
    }
})

app.post("/add-job",(req,res) => {
    console.log(req.body.job);
    const newJob = new JobsModel({
        jobsName: req.body.job,
        jobPriority: parseInt(req.body.priority)
    })

    newJob.save().then(response => {
        res.status(200).json({
            data: response
        })
    })
})

app.get("/get-jobs", (req,res) => {
    JobsModel.find({}, (err,docs) => {
        res.status(200).json({
            docs:docs
        })
    })
})

app.put("/put-priority" , (req,res) => {
    const id = req.body.id
    const priority = parseInt(req.body.priority)
    
    JobsModel.findOne({_id:id},(err,docs) => {
        docs.jobPriority = priority

        docs.save().then(response => {
            res.status(200).json({
                data: response
            })
        })
    })
})

app.post("/delete-job", (req,res) => {
    let id = req.body.id;
    JobsModel.findByIdAndDelete({_id: id}).then(response => {
        res.status(200).json({
            data: response
}) 
    })
})
module.exports = {
    path: "/api",
    handler: app,
  };
  