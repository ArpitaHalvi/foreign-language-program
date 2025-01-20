const { Schema, model } = require("mongoose");

const syllabusSchema = new Schema({
  pdfLink: { type: String, required: true },
  publicId: { type: String, required: true },
});

const Syllabus = model("Syllabus", syllabusSchema);

module.exports = Syllabus;
