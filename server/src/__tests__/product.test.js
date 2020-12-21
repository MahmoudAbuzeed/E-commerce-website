const request = require("supertest");
const app = "http://localhost:8000";
const mongoose = require("mongoose");
const databaseName = "ecommerce";

beforeAll(async () => {
  const url = `mongodb://localhost/${databaseName}`;
  await mongoose.connect(url, { useNewUrlParser: true });
});

let productId;
let categoryId;
describe("Product API", () => {
  test("Should add product", async (done) => {
    await request(app)
      .post("/api/product/add-product")
      .send({
        pName: "test add name",
        pDescription: " test add description",
        pPrice: 500,
        pQuantity: 40,
        pCategory: "5fdcab74ed1b721d5cac8403",
        pOffer: 30,
        pStatus: "test add status",
        images: "testImage",
      })
      .expect(201)
      .then((res) => {
        productId = res.body.addedProduct._id; // save the Id!
        categoryId = res.body.addedProduct.pCategory; // save the Id!

        done();
      });
  });

  test("Should get all products", async () => {
    await request(app).get("/api/product/all-product").expect(200);
  });

  test("Should get product by price", async () => {
    await request(app)
      .post("/api/product/product-by-price")
      .send({
        price: 1001,
      })
      .expect(200);
  });

  test("Should get all wish products", async () => {
    await request(app)
      .post("/api/product/wish-product")
      .send({
        productArray: ["5fdb3c1d617da10890afde30", "5fdb3a4f609b101ce0020cc7"],
      })
      .expect(200);
  });

  test("Should get all cart products", async () => {
    await request(app)
      .post("/api/product/cart-product")
      .send({
        productArray: ["5fdb3c1d617da10890afde30", "5fdb3a4f609b101ce0020cc7"],
      })
      .expect(200);
  });

  test("Should get single product", async () => {
    await request(app)
      .post("/api/product/single-product")
      .send({
        pId: productId,
      })
      .expect(200);
  });

  test("Should edit product", async () => {
    await request(app)
      .post("/api/product/edit-product")
      .send({
        pId: productId,
        pName: "test edit name",
        pDescription: "test edit descripton",
        pPrice: 25,
        pQuantity: 25,
        pCategory: "5fda62d0e64cea2a60733500",
        pOffer: 25,
        pStatus: "test edit status",
      })
      .expect(201);
  });
});

test("Should delete order", async () => {
  await request(app)
    .post("/api/product/delete-product")
    .send({
      pId: productId,
    })
    .expect(201);
});

// Cleans up database after test
afterAll(async (done) => {
  // await Category.deleteMany();
  mongoose.connection.close();
  done();
});
