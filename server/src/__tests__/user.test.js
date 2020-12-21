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

let userId;
describe("User API", () => {
  test("Should add user", async (done) => {
    await request(app)
      .post("/api/user/add-user")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "mahmoud12",
        email: "mahmoud12@gmail.com",
        password: "07775000",
      })
      .expect(201)
      .then((res) => {
        userId = res.body.user._id; // save the Id!
        done();
      });
  });

  test("Should get all users", async () => {
    await request(app)
      .get("/api/user/all-user")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  test("Should get single user", async () => {
    await request(app)
      .post("/api/user/single-user")
      .set("Authorization", `Bearer ${token}`)
      .send({
        uId: userId,
      })
      .expect(200);
  });

  test("Should edit user", async () => {
    await request(app)
      .post("/api/user/edit-user")
      .set("Authorization", `Bearer ${token}`)
      .send({
        uId: userId,
        name: "Khaled",
        phoneNumber: "015123456",
      })
      .expect(201);
  });
});

test("Should delete order", async () => {
  await request(app)
    .post("/api/user/delete-user")
    .set("Authorization", `Bearer ${token}`)
    .send({
      uId: userId,
    })
    .expect(201);
});

// Cleans up database after test
afterAll(async (done) => {
  await User.deleteMany();
  mongoose.connection.close();
  done();
});
