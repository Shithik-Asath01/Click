const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

// Create new order
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      cartId,
      paymentId,
      payerId,
    } = req.body;

    console.log("Creating order with data:", req.body);

    // Validate required fields
    if (!userId || !cartItems || !addressInfo || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: userId, cartItems, addressInfo, or totalAmount",
      });
    }

    // Validate cartItems array
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart items must be a non-empty array",
      });
    }

    const newOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus: orderStatus || "pending",
      paymentMethod: paymentMethod || "COD",
      paymentStatus: paymentStatus || "pending",
      totalAmount,
      orderDate: orderDate || new Date(),
      orderUpdateDate: orderUpdateDate || new Date(),
      paymentId,
      payerId,
    });

    await newOrder.save();
    console.log("Order saved successfully:", newOrder._id);

    // Deduct stock for each item
    try {
      for (let item of cartItems) {
        if (item.productId) {
          const product = await Product.findById(item.productId);
          if (product) {
            const newStock = Math.max(0, product.totalStock - item.quantity);
            product.totalStock = newStock;
            await product.save();
            console.log(`Updated stock for product ${item.productId}: ${newStock}`);
          }
        }
      }
    } catch (stockError) {
      console.error("Error updating stock:", stockError);
      // Continue with order creation even if stock update fails
    }

    // Delete cart after placing order
    if (cartId) {
      try {
        await Cart.findByIdAndDelete(cartId);
        console.log("Cart deleted successfully");
      } catch (cartError) {
        console.error("Error deleting cart:", cartError);
        // Continue even if cart deletion fails
      }
    }

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      orderId: newOrder._id,
      data: newOrder,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while placing the order",
      error: error.message,
    });
  }
};

// Get all orders by user
const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const orders = await Order.find({ userId }).sort({ orderDate: -1 });

    if (!orders.length) {
      return res.status(200).json({
        success: true,
        message: "No orders found for this user",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("Fetch Orders Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching orders",
      error: error.message,
    });
  }
};

// Get specific order details by ID
const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Order Detail Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while retrieving order details",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
};