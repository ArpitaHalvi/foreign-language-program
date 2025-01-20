const { Schema, model } = require("mongoose");

const reportSchema = new Schema({
  title: { type: String, required: true },
  pdfLink: { type: String, required: true },
  publicId: { type: String, required: true },
});

const Report = model("Report", reportSchema);

module.exports = Report;
