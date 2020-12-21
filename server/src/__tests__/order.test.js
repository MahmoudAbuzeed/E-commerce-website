const request = require("supertest");
const app = "http://localhost:8000";
const mongoose = require("mongoose");
const databaseName = "ecommerce";

beforeAll(async () => {
  const url = `mongodb://localhost/${databaseName}`;
  await mongoose.connect(url, { useNewUrlParser: true });
});

let orderId;
describe("Order API", () => {
  test("Should add order", async (done) => {
    await request(app)
      .post("/api/order/create-order")
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
    await request(app).get("/api/order/all-orders").expect(200);
  });

  test("Should update order", async () => {
    await request(app)
      .post("/api/order/update-order")
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
    .send({
      oId: orderId,
    })
    .expect(201);
});

// Cleans up database after test
afterAll(async (done) => {
  // await Category.deleteMany();
  mongoose.connection.close();
  done();
});
