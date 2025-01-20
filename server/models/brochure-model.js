const { Schema, model } = require("mongoose");

const brochureSchema = new Schema({
  imageUrl: { type: String, required: true },
  publicId: { type: String, required: true },
});

const Brochure = model("Brochure", brochureSchema);

module.exports = Brochure;
