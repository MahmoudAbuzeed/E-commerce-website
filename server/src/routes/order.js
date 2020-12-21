const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  getOrderByUser,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");
const { loginCheck } = require("../middleware/auth");

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
  loginCheck,
  validateGetOrderByUserRequest,
  isRequestValidated,
  getOrderByUser
);

router.post(
  "/create-order",
  loginCheck,
  validateCreateOrderRequest,
  isRequestValidated,
  createOrder
);
router.post(
  "/update-order",
  loginCheck,
  validateUpdateOrderRequest,
  isRequestValidated,
  updateOrder
);
router.post(
  "/delete-order",
  loginCheck,
  validateDeleteOrderRequest,
  isRequestValidated,
  deleteOrder
);
module.exports = router;
