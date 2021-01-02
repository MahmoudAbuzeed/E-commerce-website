import React, { Fragment, useState, useEffect } from "react";
import { editOrder, deleteOrder, getAllOrder } from "../../../actions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const apiURL = process.env.REACT_APP_API_URL;

const Order = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [status, setStatus] = useState("");
  const orderData = useSelector((state) => state.order);
  const { orders, loading } = orderData;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrder());
  }, []);

  const openModal = (order) => {
    setModalVisible(true);
    setId(order._id);
    setStatus(order.status);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      editOrder({
        _id: id,
        status,
      })
    ).then(() => dispatch(getAllOrder()));
    setModalVisible(false);
  };

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <svg
          class="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
      </div>
    );
  }
  return (
    <Fragment>
      {modalVisible && (
        <div className="relative bg-white w-12/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4  overflow-y-auto px-4 py-4 md:px-8">
          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">Update Order</span>

            {/* Close Modal */}
            <span
              onClick={() => setModalVisible(false)}
              style={{ background: "#303031" }}
              className="cursor-pointer text-gray-100 py-2 px-2 rounded-full"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
          </div>
          <form className="w-full" onSubmit={submitHandler}>
            <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6 mt-4">
              <div className="flex flex-col space-y-1 w-full">
                <label htmlFor="status">Order Status</label>
                <select
                  value={status}
                  name="status"
                  onChange={(e) => setStatus(e.target.value)}
                  className="px-4 py-2 border focus:outline-none"
                  id="status"
                >
                  <option name="status" value="Not processed">
                    Not processed
                  </option>
                  <option name="status" value="Processing">
                    Processing
                  </option>
                  <option name="status" value="Shipped">
                    Shipped
                  </option>
                  <option name="status" value="Delivered">
                    Delivered
                  </option>
                  <option name="status" value="Cancelled">
                    Cancelled
                  </option>
                </select>
              </div>
              <button
                style={{ background: "#303031" }}
                type="submit"
                className="bg-gray-800 text-gray-100 rounded-full text-lg font-medium py-2"
              >
                Update Order
              </button>
            </div>

            <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6 ">
              <button
                style={{ background: "#303031" }}
                type="submit"
                onClick={() => setModalVisible(false)}
                className="bg-gray-800 text-gray-100 rounded-full text-lg font-medium py-2"
              >
                Back
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
        <table className="table-auto border w-full my-2">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Products</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Total</th>
              <th className="px-4 py-2 border">Transaction Id</th>
              <th className="px-4 py-2 border">Customer</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">Created at</th>
              <th className="px-4 py-2 border">Updated at</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 ? (
              orders.map((order, i) => {
                return (
                  <tr className="border-b">
                    <td className="w-48 hover:bg-gray-200 p-2 flex flex-col space-y-1">
                      {order.allProduct.map((product, i) => {
                        return (
                          <span className="block flex items-center space-x-2" key={i}>
                            <img
                              className="w-8 h-8 object-cover object-center"
                              src={`${apiURL}/uploads/products/${product.id?.pImages[0]}`}
                              alt="productImage"
                            />
                            <span>{product.id?.pName}</span>
                            <span>{product?.quantitiy}x</span>
                          </span>
                        );
                      })}
                    </td>
                    <td className="hover:bg-gray-200 p-2 text-center cursor-default">
                      {order.status === "Not processed" && (
                        <span className="block text-red-600 rounded-full text-center text-xs px-2 font-semibold">
                          {order.status}
                        </span>
                      )}
                      {order.status === "Processing" && (
                        <span className="block text-yellow-600 rounded-full text-center text-xs px-2 font-semibold">
                          {order.status}
                        </span>
                      )}
                      {order.status === "Shipped" && (
                        <span className="block text-blue-600 rounded-full text-center text-xs px-2 font-semibold">
                          {order.status}
                        </span>
                      )}
                      {order.status === "Delivered" && (
                        <span className="block text-green-600 rounded-full text-center text-xs px-2 font-semibold">
                          {order.status}
                        </span>
                      )}
                      {order.status === "Cancelled" && (
                        <span className="block text-red-600 rounded-full text-center text-xs px-2 font-semibold">
                          {order.status}
                        </span>
                      )}
                    </td>
                    <td className="hover:bg-gray-200 p-2 text-center">${order.amount}.00</td>
                    <td className="hover:bg-gray-200 p-2 text-center">{order.transactionId}</td>
                    <td className="hover:bg-gray-200 p-2 text-center">{order.user?.name}</td>
                    <td className="hover:bg-gray-200 p-2 text-center">{order.user?.email}</td>
                    <td className="hover:bg-gray-200 p-2 text-center">{order.phone}</td>
                    <td className="hover:bg-gray-200 p-2 text-center">{order.address}</td>
                    <td className="hover:bg-gray-200 p-2 text-center">{moment(order.createdAt).format("lll")}</td>
                    <td className="hover:bg-gray-200 p-2 text-center">{moment(order.updatedAt).format("lll")}</td>
                    <td className="p-2 flex items-center justify-center">
                      <span
                        onClick={() => openModal(order)}
                        className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
                      >
                        <svg
                          className="w-6 h-6 fill-current text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                          <path
                            fillRule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span
                        onClick={() => deleteHandler(order)}
                        className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
                      >
                        <svg
                          className="w-6 h-6 text-red-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="12" className="text-xl text-center font-semibold py-8">
                  No order found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-sm text-gray-600 mt-2">Total {orders && orders.length} order found</div>
      </div>
    </Fragment>
  );
};

export default Order;
