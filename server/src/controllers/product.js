const Productservice = require("../services/product");
const {
  FAILURE_CREATING_MSG,
  FAILURE_UPDATING_MSG,
  REMOVED_SUCCESS_MSG,
  NOT_FOUND_MSG,
} = require("../Shared/constants");

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
    return res.status(400).json({ message: FAILURE_CREATING_MSG });
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
    return res.status(400).json({ message: FAILURE_UPDATING_MSG });
  }
};

exports.deleteProduct = async (req, res) => {
  let { pId } = req.body;
  await productService.deleteProduct(pId);
  return res.status(201).json({ message: REMOVED_SUCCESS_MSG });
};

exports.getSingleProduct = async (req, res) => {
  let { pId } = req.body;
  const singleProduct = await productService.getSingleProduct(pId);
  if (singleProduct) {
    return res.status(200).json({ singleProduct: singleProduct });
  } else {
    return res.status(400).json({ message: NOT_FOUND_MSG });
  }
};

exports.getProductByCategory = async (req, res) => {
  let { cId } = req.body;
  const productByCategory = await productService.getProductByCategory(cId);
  if (productByCategory) {
    return res.status(200).json({ productByCategory: productByCategory });
  } else {
    return res.status(400).json({ message: NOT_FOUND_MSG });
  }
};

exports.getProductByPrice = async (req, res) => {
  let { price } = req.body;
  const productByPrice = await productService.getProductByPrice(price);
  if (productByPrice) {
    return res.status(200).json({ productByPrice: productByPrice });
  } else {
    return res.status(400).json({ message: NOT_FOUND_MSG });
  }
};

exports.getWishProduct = async (req, res) => {
  let { productArray } = req.body;
  const wishProducts = await productService.getWishProduct(productArray);
  if (wishProducts) {
    return res.status(200).json({ wishProducts: wishProducts });
  } else {
    return res.status(400).json({ message: NOT_FOUND_MSG });
  }
};

exports.getCartProduct = async (req, res) => {
  let { productArray } = req.body;
  const cartProducts = await productService.getCartProduct(productArray);
  if (cartProducts) {
    return res.status(200).json({ cartProducts: cartProducts });
  } else {
    return res.status(400).json({ message: NOT_FOUND_MSG });
  }
};
