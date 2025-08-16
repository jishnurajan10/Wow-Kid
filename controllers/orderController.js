// controllers/orderController.js
const SubOrder = require("../models/SubOrder");

// Create Order
exports.createOrder = async (req, res) => {
  try {
    const {
      ordermetaddetails = {
        name: "John Doe",
        contact_no: "+91-9000000000",
        email: "john@example.com",
        address: {
          line1: "123 MG Road",
          city: "Bengaluru",
          state: "KA",
          pincode: "560001",
          country: "IN",
        },
      },
      total_amount = 1499,
      currency = "INR",
      payment_method = "UPI",
      items = [
        { sku: "WOW-TSHIRT-001", name: "WowKid T-Shirt", qty: 1, price: 1499 },
      ],
      customer_id = "CUST10001",
      shipping_address = {
        line1: "123 MG Road",
        city: "Bengaluru",
        state: "KA",
        pincode: "560001",
        country: "IN",
      },
      billing_address = null,
      notes = "Leave at reception if not available",
      status = "CREATED",
    } = req.body;

    // Generate orderid (unique)
    const orderid = `WOWKID${Date.now()}`;

    const order = new SubOrder({
      orderid,
      ordermetaddetails,
      total_amount,
      currency,
      payment_method,
      items,
      customer_id,
      shipping_address,
      billing_address,
      notes,
      status,
    });

    const saved = await order.save();
    res.status(201).json({ message: "Order created", data: saved });
  } catch (err) {
    res.status(500).json({ error: "Failed to create order", details: err.message });
  }
};

// Get Order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await SubOrder.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Error fetching order" });
  }
};

// Get All Orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await SubOrder.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Error fetching orders" });
  }
};

// Update Order
exports.updateOrder = async (req, res) => {
  try {
    const order = await SubOrder.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order updated", data: order });
  } catch (err) {
    res.status(500).json({ error: "Error updating order" });
  }
};

// Delete Order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await SubOrder.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "🗑️ Order deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting order" });
  }
};
