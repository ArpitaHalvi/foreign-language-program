const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {
        type: String,
        enum: ["Olympiads", "A1-A2 Level", "B1-B2 Level", "Professional Course", "Delf Preparation", "TCF & TEF Preparation"],

    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Feedback'
        }
    ],
})


const Course = model("Course", courseSchema);
module.exports = Course;