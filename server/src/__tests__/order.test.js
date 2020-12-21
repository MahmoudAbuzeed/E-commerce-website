const request = require("supertest");
const app = "http://localhost:8000";
const mongoose = require("mongoose");
const User = require("../models/users"); // Link to your user model

const databaseName = "ecommerce";

let token;

beforeAll(async (done) => {
  const url = `mongodb://localhost/${databaseName}`;
  await mongoose.connect(url, { useNewUrlParser: true });

  await request(app)
    .post("/api/admin/signup")
    .send({
      name: "admin456",
      email: "admin456@gmail.com",
      password: "admin123",
    })
    .expect(201);
  await request(app)
    .post("/api/signin")
    .send({
      email: "admin456@gmail.com",
      password: "admin123",
    })
    .then((res) => {
      token = res.body.user.token; // save the token!
      done();
    });
});

let orderId;
describe("Order API", () => {
  test("Should add order", async (done) => {
    await request(app)
      .post("/api/order/create-order")
      .set("Authorization", `Bearer ${token}`)
      .send({
        allProduct: [
          {
            id: "5fdb3954cbdc7e08e4fbfbd9",
            quantitiy: 5,
          },
        ],
        user: "5fe0bba0781a5a03900a0922",
        amount: 15,
        transactionId: "5fe0bba0781a5a03900a0923",
        address: "test add address",
        phone: "010302536",
      })
      .expect(201)
      .then((res) => {
        orderId = res.body.createdOrder._id; // save the Id!
        done();
      });
  });

  test("Should get all orders", async () => {
    await request(app)
      .get("/api/order/all-orders")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  test("Should update order", async () => {
    await request(app)
      .post("/api/order/update-order")
      .set("Authorization", `Bearer ${token}`)
      .send({
        oId: orderId,
        status: "Shipped",
      })
      .expect(201);
  });
});

test("Should delete order", async () => {
  await request(app)
    .post("/api/order/delete-order")
    .set("Authorization", `Bearer ${token}`)
    .send({
      oId: orderId,
    })
    .expect(201);
});

// Cleans up database after test
afterAll(async (done) => {
  await User.deleteMany();
  mongoose.connection.close();
  done();
});
