const { Schema, model } = require("mongoose");

const paymentScreenshotSchema = new Schema(
  {
    registeredUser: { type: Schema.Types.ObjectId, ref: "Registration" },
    imageUrl: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { timestamps: true }
);

const PaymentScreenshot = model("PaymentScreenshot", paymentScreenshotSchema);

module.exports = PaymentScreenshot;
