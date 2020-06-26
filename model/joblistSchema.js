const mongoose = require('mongoose');
const joblistSchema = new mongoose.Schema(
    {
        jobname: String,
        jobdescription: String
    }
)


module.exports = mongoose.model("joblist", joblistSchema);