const request = require("supertest");
const app = "http://localhost:8000";
const mongoose = require("mongoose");
const databaseName = "ecommerce";
const User = require("../models/users"); // Link to your user model

beforeAll(async () => {
  const url = `mongodb://localhost/${databaseName}`;
  await mongoose.connect(url, { useNewUrlParser: true });
});

let token;

describe("Auth API", () => {
  test("Should signup for a user", async () => {
    await request(app)
      .post("/api/signup")
      .send({
        name: "test",
        email: "test123@gmail.com",
        password: "test123456",
      })
      .expect(201);
  });

  test("Should signup for an admin", async () => {
    await request(app)
      .post("/api/admin/signup")
      .send({
        name: "admin",
        email: "admin123@gmail.com",
        password: "admin123",
      })
      .expect(201);
  });

  test("Should signin ", async (done) => {
    await request(app)
      .post("/api/signin")
      .send({
        email: "admin123@gmail.com",
        password: "admin123",
      })
      .expect(201)
      .then((res) => {
        token = res.body.user.token; // save the token!
        done();
      });
  });

  test("Should get all users", async () => {
    await request(app)
      .post("/api/all-users")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});

// Cleans up database between each test
afterAll(async (done) => {
  await User.deleteMany();
  mongoose.connection.close();
  done();
});
