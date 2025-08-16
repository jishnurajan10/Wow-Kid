// models/SubOrder.js
const mongoose = require("mongoose");

const SubOrderSchema = new mongoose.Schema(
  {
    orderid: { type: String, unique: true },
    ordermetaddetails: {
      name: String,
      contact_no: String,
      email: String,
      address: {
        line1: String,
        line2: String,
        city: String,
        state: String,
        pincode: String,
        country: String,
      },
    },
    status: { type: String, default: "CREATED" },
    total_amount: { type: Number, default: 0 },
    currency: { type: String, default: "INR" },
    payment_method: { type: String, default: "UPI" },
    items: [
      {
        sku: String,
        name: String,
        qty: Number,
        price: Number,
      },
    ],
    customer_id: String,
    shipping_address: Object,
    billing_address: Object,
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubOrder", SubOrderSchema);
