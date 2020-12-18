const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  getOrderByUser,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");

const {
  validateCreateOrderRequest,
  validateDeleteOrderRequest,
  validateGetOrderByUserRequest,
  validateUpdateOrderRequest,
  isRequestValidated,
} = require("../validators/order");

router.get("/all-orders", getAllOrders);
router.post(
  "/order-by-user",
  validateGetOrderByUserRequest,
  isRequestValidated,
  getOrderByUser
);

router.post(
  "/create-order",
  validateCreateOrderRequest,
  isRequestValidated,
  createOrder
);
router.post(
  "/update-order",
  validateUpdateOrderRequest,
  isRequestValidated,
  updateOrder
);
router.post(
  "/delete-order",
  validateDeleteOrderRequest,
  isRequestValidated,
  deleteOrder
);
module.exports = router;
