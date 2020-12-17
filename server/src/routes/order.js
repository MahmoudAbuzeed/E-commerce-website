const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  getOrderByUser,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");

router.get("/all-orders", getAllOrders);
router.post("/order-by-user", getOrderByUser);

router.post("/create-order", createOrder);
router.post("/update-order", updateOrder);
router.post("/delete-order", deleteOrder);
module.exports = router;
