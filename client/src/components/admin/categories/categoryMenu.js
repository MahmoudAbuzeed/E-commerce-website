import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "reactstrap";
import { saveCategory, getAllCategory, deleteCategory } from "../../../actions";
import moment from "moment";

const apiURL = process.env.REACT_APP_API_URL;

const CategoryMenu = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [cName, setName] = useState("");
  const [cDescription, setDescription] = useState("");
  const [cStatus, setStatus] = useState("");
  const [cImage, setImage] = useState("");
  const data = useSelector((state) => state.category);
  const { categories, loading } = data;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const openModal = (category) => {
    setModalVisible(true);
    setId(category._id);
    setName(category.cName);
    setDescription(category.cDescription);
    setImage(category.cImage);
    setStatus(category.cStatus);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveCategory({
        _id: id,
        cName,
        cDescription,
        cImage,
        cStatus,
      })
    ).then(() => dispatch(getAllCategory()));
    setModalVisible(false);
  };

  const deleteHandler = (category) => {
    dispatch(deleteCategory(category._id));
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
          {/* It's open the add category modal */}
          <div
            style={{ background: "#303031" }}
            className="cursor-pointer rounded-full p-2 flex items-center justify-center text-gray-100 text-sm font-semibold uppercase"
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
            <Link onClick={() => openModal({})}>Create Category</Link>
          </div>
        </div>
        {modalVisible && (
          <div className="relative bg-white w-12/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4  overflow-y-auto px-4 py-4 md:px-8">
            <div className="flex items-center justify-between w-full pt-4">
              <span className="text-left font-semibold text-2xl tracking-wider">Add Category</span>
              {/* Close Modal */}
              <span style={{ background: "#303031" }} className="cursor-pointer text-gray-100 py-2 px-2 rounded-full">
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
                <label htmlFor="name">Category Name</label>
                {id ? (
                  <input
                    className="px-4 py-2 border focus:outline-none"
                    type="text"
                    value={cName}
                    onChange={(e) => setName(e.target.value)}
                    disabled
                  />
                ) : (
                  <input
                    className="px-4 py-2 border focus:outline-none"
                    type="text"
                    value={cName}
                    onChange={(e) => setName(e.target.value)}
                  />
                )}
              </div>

              <div className="flex flex-col space-y-1 w-full  py-2">
                <label htmlFor="description">Category Description</label>
                <textarea
                  className="px-4 py-2 border focus:outline-none"
                  name="description"
                  id="description"
                  cols={5}
                  rows={5}
                  onChange={(e) => setDescription(e.target.value)}
                  value={cDescription}
                />
              </div>

              {/* Image Field & function */}
              <div className="flex flex-col space-y-1 w-full py-2">
                <label htmlFor="image">Category Image</label>
                {id ? (
                  <Input disabled onChange={(e) => setImage(e.target.files[0])} name="image" type="file" id="image" />
                ) : (
                  <Input onChange={(e) => setImage(e.target.files[0])} name="image" type="file" id="image" />
                )}
              </div>

              <div className="flex flex-col space-y-1 w-full  py-2">
                <label htmlFor="status">Category Status</label>
                <select
                  className="form-control"
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
              <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6 mt-4">
                <button
                  style={{ background: "#303031" }}
                  type="submit"
                  className="bg-gray-800 text-gray-100 rounded-full text-lg font-medium py-2"
                >
                  {id ? "Update" : "Create"} category
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
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Created at</th>
              <th className="px-4 py-2 border">Updated at</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories && categories.length > 0 ? (
              categories.map((category) => {
                return (
                  <tr key={category._id}>
                    <td className="p-2 text-left">
                      {category.cName.length > 20 ? category.cName.slice(0, 20) + "..." : category.cName}
                    </td>
                    <td className="p-2 text-left">
                      {category.cDescription.length > 30
                        ? category.cDescription.slice(0, 30) + "..."
                        : category.cDescription}
                    </td>
                    <td className="p-2 text-center">
                      <img
                        className="w-12 h-12 object-cover object-center"
                        src={`${apiURL}/uploads/categories/${category.cImage}`}
                        alt=""
                      />
                    </td>
                    <td className="p-2 text-center">
                      {category.cStatus === "Active" ? (
                        <span className="bg-green-200 rounded-full text-center text-xs px-2 font-semibold">
                          {category.cStatus}
                        </span>
                      ) : (
                        <span className="bg-red-200 rounded-full text-center text-xs px-2 font-semibold">
                          {category.cStatus}
                        </span>
                      )}
                    </td>
                    <td className="p-2 text-center">{moment(category.createdAt).format("lll")}</td>
                    <td className="p-2 text-center">{moment(category.updatedAt).format("lll")}</td>
                    <td className="p-2 flex items-center justify-center">
                      <span
                        onClick={() => openModal(category)}
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
                        onClick={() => deleteHandler(category)}
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
                <td colSpan="7" className="text-xl text-center font-semibold py-8">
                  No category found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-sm text-gray-600 mt-2">Total {categories && categories.length} category found</div>
      </div>
    </Fragment>
  );
};

export default CategoryMenu;
