import React, { Fragment, useState, useEffect } from "react";
import { saveProduct, getAllProduct, deleteProduct, getAllCategory } from "../../../actions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const apiURL = process.env.REACT_APP_API_URL;

const Product = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [pName, setName] = useState("");
  const [pDescription, setDescription] = useState("");
  const [pPrice, setPrice] = useState("");
  const [pQuantity, setQuantity] = useState("");
  const [pCategory, setCategory] = useState("");
  const [pOffer, setOffer] = useState("");
  const [pStatus, setStatus] = useState("");
  const [pImages, setImages] = useState([]);

  const data = useSelector((state) => state.product);
  const { products, loading } = data;
  const categoryData = useSelector((state) => state.category);
  const { categories } = categoryData;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getAllCategory());
  }, []);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.pName);
    setDescription(product.pDescription);
    setPrice(product.pPrice);
    setQuantity(product.pQuantity);
    setCategory(product.pCategory);
    setOffer(product.pOffer);
    setStatus(product.pStatus);
    setImages(product.pImages);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        pName,
        pDescription,
        pPrice,
        pQuantity,
        pCategory,
        pOffer,
        pStatus,
        pImages,
      })
    ).then(() => dispatch(getAllProduct()));
    setModalVisible(false);
  };

  const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id));
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
      <div className="col-span-1 flex items-center">
        <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center w-full">
          {/* It's open the add product modal */}
          <span
            style={{ background: "#303031" }}
            onClick={() => openModal({})}
            className="rounded-full cursor-pointer p-2 bg-gray-800 flex items-center text-gray-100 text-sm font-semibold uppercase"
          >
            <svg
              className="w-6 h-6 text-gray-100 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
            Add Product
          </span>
        </div>
        {modalVisible && (
          <div className="relative bg-white w-12/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4  overflow-y-auto px-4 py-4 md:px-8">
            <div className="flex items-center justify-between w-full pt-4">
              {!id ? (
                <span className="text-left font-semibold text-2xl tracking-wider">Add Product</span>
              ) : (
                <span className="text-left font-semibold text-2xl tracking-wider">Update Product</span>
              )}
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
              <div className="flex flex-col space-y-1 w-full py-2">
                <label htmlFor="name">Product Name *</label>
                <input
                  value={pName}
                  onChange={(e) => setName(e.target.value)}
                  className="px-4 py-2 border focus:outline-none"
                  type="text"
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="price">Product Price *</label>
                <input
                  value={pPrice}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  className="px-4 py-2 border focus:outline-none"
                  id="price"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="description">Product Description *</label>
                <textarea
                  value={pDescription}
                  onChange={(e) => setDescription(e.target.value)}
                  className="px-4 py-2 border focus:outline-none"
                  name="description"
                  id="description"
                  cols={5}
                  rows={2}
                />
              </div>
              {!id ? (
                <div className="flex flex-col mt-4">
                  <label htmlFor="image">Product Images *</label>
                  <span className="text-gray-600 text-xs">Must need 2 images</span>
                  <input
                    onChange={(e) => setImages(e.target.files)}
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    className="px-4 py-2 border focus:outline-none"
                    id="image"
                    multiple
                  />
                </div>
              ) : (
                ""
              )}

              <div className="flex space-x-1 py-4">
                <div className="w-1/2 flex flex-col space-y-1">
                  <label htmlFor="status">Product Status *</label>
                  <select
                    value={pStatus}
                    onChange={(e) => setStatus(e.target.value)}
                    name="status"
                    className="px-4 py-2 border focus:outline-none"
                    id="status"
                  >
                    <option name="status" value="Active">
                      Active
                    </option>
                    <option name="status" value="Disabled">
                      Disabled
                    </option>
                  </select>
                </div>
                <div className="w-1/2 flex flex-col space-y-1">
                  <label htmlFor="status">Product Category *</label>
                  <select
                    value={pCategory}
                    onChange={(e) => setCategory(e.target.value)}
                    name="status"
                    className="px-4 py-2 border focus:outline-none"
                    id="status"
                  >
                    <option disabled value="">
                      Select a category
                    </option>
                    {categories.length > 0
                      ? categories.map(function (elem) {
                          return (
                            <option name="status" value={elem._id} key={elem._id}>
                              {elem.cName}
                            </option>
                          );
                        })
                      : ""}
                  </select>
                </div>
              </div>

              <div className="flex space-x-1 py-4">
                <div className="w-1/2 flex flex-col space-y-1">
                  <label htmlFor="quantity">Product in Stock *</label>
                  <input
                    value={pQuantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    type="number"
                    className="px-4 py-2 border focus:outline-none"
                    id="quantity"
                  />
                </div>
                <div className="w-1/2 flex flex-col space-y-1">
                  <label htmlFor="offer">Product Offfer (%) *</label>
                  <input
                    value={pOffer}
                    onChange={(e) => setOffer(e.target.value)}
                    type="number"
                    className="px-4 py-2 border focus:outline-none"
                    id="offer"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6 mt-4">
                <button
                  style={{ background: "#303031" }}
                  type="submit"
                  className="bg-gray-800 text-gray-100 rounded-full text-lg font-medium py-2"
                >
                  {id ? "Update" : "Create"} Product
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
      </div>

      <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
        <table className="table-auto border w-full my-2">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Product</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Stock</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Offer</th>
              <th className="px-4 py-2 border">Created at</th>
              <th className="px-4 py-2 border">Updated at</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? (
              products.map((product, key) => {
                return (
                  <tr>
                    <td className="p-2 text-left">
                      {product.pName.length > 15 ? product.pDescription.substring(1, 15) + "..." : product.pName}
                    </td>
                    <td className="p-2 text-left">{product.pDescription.slice(0, 15)}...</td>
                    <td className="p-2 text-center">
                      <img
                        className="w-12 h-12 object-cover object-center"
                        src={`${apiURL}/uploads/products/${product.pImages[0]}`}
                        alt="pic"
                      />
                    </td>
                    <td className="p-2 text-center">
                      {product.pStatus === "Active" ? (
                        <span className="bg-green-200 rounded-full text-center text-xs px-2 font-semibold">
                          {product.pStatus}
                        </span>
                      ) : (
                        <span className="bg-red-200 rounded-full text-center text-xs px-2 font-semibold">
                          {product.pStatus}
                        </span>
                      )}
                    </td>
                    <td className="p-2 text-center">{product.pQuantity}</td>
                    <td className="p-2 text-center">{product.pCategory?.cName}</td>
                    <td className="p-2 text-center">{product.pOffer}</td>
                    <td className="p-2 text-center">{moment(product.createdAt).format("lll")}</td>
                    <td className="p-2 text-center">{moment(product.updatedAt).format("lll")}</td>
                    <td className="p-2 flex items-center justify-center">
                      <span
                        onClick={() => openModal(product)}
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
                        onClick={() => deleteHandler(product)}
                        className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
                      >
                        <svg
                          className="w-6 h-6 fill-current text-red-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="10" className="text-xl text-center font-semibold py-8">
                  No product found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-sm text-gray-600 mt-2">Total {products && products.length} product found</div>
      </div>
    </Fragment>
  );
};

export default Product;
