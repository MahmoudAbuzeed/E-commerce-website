const request = require("supertest");
const app = "http://localhost:8000";
const mongoose = require("mongoose");
const databaseName = "ecommerce";

beforeAll(async () => {
  const url = `mongodb://localhost/${databaseName}`;
  await mongoose.connect(url, { useNewUrlParser: true });
});

let userId;
describe("User API", () => {
  test("Should add user", async (done) => {
    await request(app)
      .post("/api/user/add-user")
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
    await request(app).get("/api/user/all-user").expect(200);
  });

  test("Should get single user", async () => {
    await request(app)
      .post("/api/user/single-user")
      .send({
        uId: userId,
      })
      .expect(200);
  });

  test("Should edit user", async () => {
    await request(app)
      .post("/api/user/edit-user")
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
    .send({
      uId: userId,
    })
    .expect(201);
});

// Cleans up database after test
afterAll(async (done) => {
  // await Category.deleteMany();
  mongoose.connection.close();
  done();
});
