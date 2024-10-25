const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    coursename: {
        enum: []
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})


const Feedback = model("Feedback", feedbackSchema);
module.exports = Feedback;