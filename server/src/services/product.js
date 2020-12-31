const productModel = require("../models/products");
const fs = require("fs");

class ProductService {
  async getAllProducts() {
    let Products = await productModel.find({}).populate("pCategory", "_id cName").sort({ _id: -1 });
    return Products;
  }
  async addProduct(pName, pDescription, pPrice, pQuantity, pCategory, pOffer, pStatus, images) {
    let allImages = [];
    for (const img of images) {
      allImages.push(img);
    }
    let newProduct = new productModel({
      pImages: allImages,
      pName,
      pDescription,
      pPrice,
      pQuantity,
      pCategory,
      pOffer,
      pStatus,
    });
    let save = await newProduct.save();
    return save;
  }

  async editProduct(pId, pName, pDescription, pPrice, pQuantity, pCategory, pOffer, pStatus) {
    const product = await productModel.findById(pId);
    if (product) {
      product.pName = pName;
      product.pDescription = pDescription;
      product.pPrice = pPrice;
      product.pQuantity = pQuantity;
      product.pCategory = pCategory;
      product.pOffer = pOffer;
      product.pStatus = pStatus;
      let editedProduct = await product.save();
      return editedProduct;
    }
  }

  async deleteProduct(pId) {
    let deleteProductObj = await productModel.findById(pId);
    let deleteProduct = await productModel.findByIdAndDelete(pId);
    if (deleteProduct) {
      // Deleting from static file
      for (const img of deleteProductObj.pImages) {
        let filePath = `../server/public/uploads/products/${img}`;
        fs.unlink(filePath, (err) => {
          if (err) {
            return err;
          }
        });
      }
    }
  }

  async getSingleProduct(pId) {
    let singleProduct = await productModel
      .findById(pId)
      .populate("pCategory", "cName")
      .populate("pRatingsReviews.user", "name email userImage");
    if (singleProduct) {
      return singleProduct;
    }
  }

  async getProductByCategory(cId) {
    let products = await productModel.find({ pCategory: cId }).populate("pCategory", "cName");
    return products;
  }

  async getProductByPrice(price) {
    let products = await productModel
      .find({ pPrice: { $lt: price } })
      .populate("pCategory", "cName")
      .sort({ pPrice: -1 });
    return products;
  }

  async getWishProduct(productArray) {
    let wishProducts = await productModel.find({
      _id: { $in: productArray },
    });
    return wishProducts;
  }

  async getCartProduct(productArray) {
    let cartProducts = await productModel.find({
      _id: { $in: productArray },
    });
    return cartProducts;
  }
}

module.exports = ProductService;
