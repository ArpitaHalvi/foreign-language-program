// const { instance } = require("../app");

const checkout = async (req, res, next) => {
  // try {
  //   const options = {
  //     amount: Number(req.body) * 100,
  //     currency: "INR",
  //   };
  //   const order = await instance.orders.create(options);
  //   console.log("Order: ", order);
  //   if (!order) {
  //     res.status(500).json({ meassage: "Could not process the payment." });
  //   }
  //   res.status(200).json({ meassage: "Checkout done!" });
  // } catch (e) {
  //   next(e);
  // }
};

module.exports = { checkout };
