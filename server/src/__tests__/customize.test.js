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
      name: "admin789",
      email: "admin789@gmail.com",
      password: "admin123",
    })
    .expect(201);
  await request(app)
    .post("/api/signin")
    .send({
      email: "admin789@gmail.com",
      password: "admin123",
    })
    .then((res) => {
      token = res.body.user.token; // save the token!
      done();
    });
});

/* All comments tests have a compeleted testing, if you want to test again modify destruction images in controllers from file.filename to body */

let imageId;
describe("Customize API", () => {
  // test("Should add slide image", async (done) => {
  //   await request(app)
  //     .post("/api/customize/upload-slide-image")
  //     .set("Authorization", `Bearer ${token}`)
  //     .send({
  //       image: "test add image",
  //     })
  //     .expect(201)
  //     .then((res) => {
  //       imageId = res.body.ImageUploaded._id; // save the Id!
  //       done();
  //     });
  // });

  test("Should get all images", async () => {
    await request(app)
      .get("/api/customize/get-slide-image")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  // test("Should delete slide image", async () => {
  //   await request(app)
  //     .post("/api/customize/delete-slide-image")
  //     .set("Authorization", `Bearer ${token}`)
  //     .send({
  //       id: imageId,
  //     })
  //     .expect(201);
  // });

  test("Should get dashboard", async () => {
    await request(app)
      .post("/api/customize/dashboard-data")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});

// Cleans up database after test
afterAll(async (done) => {
  await User.deleteMany();
  mongoose.connection.close();
  done();
});
