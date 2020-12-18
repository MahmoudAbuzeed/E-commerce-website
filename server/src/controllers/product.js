const productModel = require("../models/products");

const Productservice = require("../services/product");
const productService = new Productservice();

exports.addProduct = async (req, res) => {
  let {
    pName,
    pDescription,
    pPrice,
    pQuantity,
    pCategory,
    pOffer,
    pStatus,
  } = req.body;
  let images = req.files;
  const addedProduct = await productService.addProduct(
    pName,
    pDescription,
    pPrice,
    pQuantity,
    pCategory,
    pOffer,
    pStatus,
    images
  );
  if (addedProduct) {
    return res.status(201).json({ addedProduct: addedProduct });
  } else {
    return res.status(400).json({ message: "Add product went wrong" });
  }
};

exports.getAllProduct = async (req, res) => {
  const allProducts = await productService.getAllProducts();
  return res.status(200).json({ allProducts: allProducts });
};

exports.editProduct = async (req, res) => {
  let {
    pId,
    pName,
    pDescription,
    pPrice,
    pQuantity,
    pCategory,
    pOffer,
    pStatus,
  } = req.body;
  const editedProduct = await productService.editProduct(
    pId,
    pName,
    pDescription,
    pPrice,
    pQuantity,
    pCategory,
    pOffer,
    pStatus
  );
  if (editedProduct) {
    return res.status(201).json({ editedProduct: editedProduct });
  } else {
    return res.status(400).json({ message: "Edit product went wrong" });
  }
};

exports.deleteProduct = async (req, res) => {
  let { pId } = req.body;
  await productService.deleteProduct(pId);
  return res.status(201).json({ message: "Product Deleted" });
};

exports.getSingleProduct = async (req, res) => {
  let { pId } = req.body;
  const singleProduct = await productService.getSingleProduct(pId);
  if (singleProduct) {
    return res.status(200).json({ singleProduct: singleProduct });
  } else {
    return res.status(400).json({ message: "Product Not Found" });
  }
};

exports.getProductByCategory = async (req, res) => {
  let { cId } = req.body;
  const productByCategory = await productService.getProductByCategory(cId);
  if (productByCategory) {
    return res.status(200).json({ productByCategory: productByCategory });
  } else {
    return res.status(400).json({ message: "Category Not Found" });
  }
};

exports.getProductByPrice = async (req, res) => {
  let { price } = req.body;
  const productByPrice = await productService.getProductByPrice(price);
  if (productByPrice) {
    return res.status(200).json({ productByPrice: productByPrice });
  } else {
    return res.status(400).json({ message: "Products Not Found" });
  }
};

exports.getWishProduct = async (req, res) => {
  let { productArray } = req.body;
  const wishProducts = await productService.getWishProduct(productArray);
  if (wishProducts) {
    return res.status(200).json({ wishProducts: wishProducts });
  } else {
    return res.status(400).json({ message: "Products Not Found" });
  }
};

exports.getCartProduct = async (req, res) => {
  let { productArray } = req.body;
  const cartProducts = await productService.getCartProduct(productArray);
  if (cartProducts) {
    return res.status(200).json({ cartProducts: cartProducts });
  } else {
    return res.status(400).json({ message: "Cart Not Found" });
  }
};

// exports.addReview = async (req, res) => {
//   let { pId, uId, rating, review } = req.body;
//   const Review = await addReviewController.addReview(pId, uId, rating, review);
//   if (Review) {
//     return res.status(200).json({ addedReview: Review });
//   } else {
//     return res.status(400).json({ message: "Can Not Add Review" });
//   }
// };

// exports.deleteReview = async (req, res) => {
//   let { pId, rId } = req.body;
//   const deletedReview = await deleteReviewController.deleteReview(pId, rId);
//   return res.status(201).json({ message: "Review Deleted" });
// };
