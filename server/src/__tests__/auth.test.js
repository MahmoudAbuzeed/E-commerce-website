const request = require("supertest");
const app = "http://localhost:8000";
const mongoose = require("mongoose");
const databaseName = "ecommerce";
const User = require("../models/users"); // Link to your user model

beforeAll(async () => {
  const url = `mongodb://localhost/${databaseName}`;
  await mongoose.connect(url, { useNewUrlParser: true });
});

// Cleans up database between each test
afterAll(async () => {
  await User.deleteMany();
});

describe("Auth API", () => {
  test("Should signup for a user", async () => {
    await request(app)
      .post("/api/signup")
      .send({
        name: "test",
        email: "testasa@gmail.com",
        password: "test123aaa",
      })
      .expect(201);
  });

  test("Should signup for an admin", async () => {
    await request(app)
      .post("/api/admin/signup")
      .send({
        name: "admin",
        email: "admin@gmail.com",
        password: "admin123",
      })
      .expect(201);
  });

  test("Should signin ", async () => {
    await request(app)
      .post("/api/signin")
      .send({
        email: "testasa@gmail.com",
        password: "test123aaa",
      })
      .expect(201);
  });
});
