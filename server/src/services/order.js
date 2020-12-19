const orderModel = require("../models/orders");

class OrderService {
  async getAllOrders() {
    let Orders = await orderModel
      .find({})
      .populate("allProduct.id", "pName pImages pPrice")
      .populate("user", "name email")
      .sort({ _id: -1 });
    return Orders;
  }

  async getOrderByUser(uId) {
    let Order = await orderModel
      .find({ user: uId })
      .populate("allProduct.id", "pName pImages pPrice")
      .populate("user", "name email")
      .sort({ _id: -1 });
    return Order;
  }

  async createOrder(allProduct, user, amount, transactionId, address, phone) {
    let newOrder = new orderModel({
      allProduct,
      user,
      amount,
      transactionId,
      address,
      phone,
    });
    let save = await newOrder.save();
    return save;
  }

  async updateOrder(oId, status) {
    const order = await orderModel.findById(oId);
    if (order) {
      order.status = status;
      updatedAt: Date.now();
      let editedOrder = await order.save();
      return editedOrder;
    }
  }

  async deleteOrder(oId) {
    let deleteOrder = await orderModel.findByIdAndDelete(oId);
    return deleteOrder;
  }
}

module.exports = OrderService;
