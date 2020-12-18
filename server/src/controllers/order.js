const orderModel = require("../models/orders");

const OrderService = require("../services/order");
const orderService = new OrderService();

exports.getAllOrders = async (req, res) => {
  const AllOrders = await orderService.getAllOrders();
  return res.status(200).json({ AllOrders: AllOrders });
};

exports.getOrderByUser = async (req, res) => {
  let { uId } = req.body;
  const userOrders = await orderService.getOrderByUser(uId);
  if (userOrders) {
    return res.status(201).json({ userOrders: userOrders });
  } else {
    return res.status(400).json({ message: "Can not found user orders." });
  }
};

exports.createOrder = async (req, res) => {
  let { allProduct, user, amount, transactionId, address, phone } = req.body;
  const createdOrder = await orderService.createOrder(
    allProduct,
    user,
    amount,
    transactionId,
    address,
    phone
  );
  if (createdOrder) {
    return res.status(201).json({ createdOrder: createdOrder });
  } else {
    return res.status(400).json({ message: "Can not create order." });
  }
};

exports.updateOrder = async (req, res) => {
  const { oId, status } = req.body;
  const updatedOrder = await orderService.updateOrder(oId, status);
  if (updatedOrder) {
    return res.status(201).json({ updatedOrder: updatedOrder });
  } else {
    return res.status(400).json({ message: "Can not update Order." });
  }
};

exports.deleteOrder = async (req, res) => {
  let { oId } = req.body;
  await orderService.deleteOrder(oId);
  return res.status(201).json({ message: "Order Deleted" });
};
