const orderModel = require("../models/orders");

const {
  getOrderByUserController,
  createOrderController,
  updateOrderController,
  deleteOrderController,
} = require("../services/order");

exports.getAllOrders = async (req, res) => {
  try {
    let Orders = await orderModel
      .find({})
      .populate("allProduct.id", "pName pImages pPrice")
      .populate("user", "name email")
      .sort({ _id: -1 });
    if (Orders) {
      return res.json({ Orders });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getOrderByUser = async (req, res) => {
  let { uId } = req.body;
  const userOrders = await getOrderByUserController.getOrderByUser(uId);
  if (userOrders) {
    return res.status(201).json({ userOrders: userOrders });
  } else {
    return res.status(400).json({ message: "Can not found user orders." });
  }
};

exports.createOrder = async (req, res) => {
  let { allProduct, user, amount, transactionId, address, phone } = req.body;
  const createdOrder = await createOrderController.createOrder(
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
  const updatedOrder = await updateOrderController.updateOrder(oId, status);
  if (updatedOrder) {
    return res.status(201).json({ updatedOrder: updatedOrder });
  } else {
    return res.status(400).json({ message: "Can not update Order." });
  }
};

exports.deleteOrder = async (req, res) => {
  let { oId } = req.body;
  const deletedOrder = await deleteOrderController.deleteOrder(oId);
  return res.status(201).json({ message: "Order Deleted" });
};
