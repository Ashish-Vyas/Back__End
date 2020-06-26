const mongoose = require('mongoose');
const detailSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        city: String,
        phone: String,
        website: String,
        resume: String,
        cover: String
    }
)


module.exports = mongoose.model("details", detailSchema);