const orderModel = require("../models/orders");

class GetOrderByUser {
  async getOrderByUser(uId) {
    try {
      let Order = await orderModel
        .find({ user: uId })
        .populate("allProduct.id", "pName pImages pPrice")
        .populate("user", "name email")
        .sort({ _id: -1 });
      if (Order) {
        return Order;
      }
    } catch (err) {
      console.log(err);
    }
  }
}

class CreateOrder {
  async createOrder(allProduct, user, amount, transactionId, address, phone) {
    try {
      let newOrder = new orderModel({
        allProduct,
        user,
        amount,
        transactionId,
        address,
        phone,
      });
      let save = await newOrder.save();
      if (save) {
        return save;
      }
    } catch (err) {
      console.log(err);
    }
  }
}

class UpdateOrder {
  async updateOrder(oId, status) {
    const order = await orderModel.findById(oId);
    if (order) {
      order.status = status;
      updatedAt: Date.now();
      let editedOrder = await order.save();
      return editedOrder;
    }
  }
}
class DeleteOrder {
  async deleteOrder(oId) {
    try {
      let deleteOrder = await orderModel.findByIdAndDelete(oId);
      if (deleteOrder) {
        return deleteOrder;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const getOrderByUserController = new GetOrderByUser();
const createOrderController = new CreateOrder();
const updateOrderController = new UpdateOrder();
const deleteOrderController = new DeleteOrder();

module.exports = {
  getOrderByUserController,
  createOrderController,
  updateOrderController,
  deleteOrderController,
};