const request = require("supertest");
const app = "http://localhost:8000";
const mongoose = require("mongoose");
const databaseName = "ecommerce";

beforeAll(async () => {
  const url = `mongodb://localhost/${databaseName}`;
  await mongoose.connect(url, { useNewUrlParser: true });
});

let imageId;
describe("Customize API", () => {
  test("Should add slide image", async (done) => {
    await request(app)
      .post("/api/customize/upload-slide-image")
      .send({
        image: "test add image",
      })
      .expect(201)
      .then((res) => {
        imageId = res.body.ImageUploaded._id; // save the Id!
        done();
      });
  });

  test("Should get all images", async () => {
    await request(app).get("/api/customize/get-slide-image").expect(200);
  });

  test("Should delete slide image", async () => {
    await request(app)
      .post("/api/customize/delete-slide-image")
      .send({
        id: imageId,
      })
      .expect(201);
  });
});

test("Should get dashboard", async () => {
  await request(app).post("/api/customize/dashboard-data").expect(200);
});

// Cleans up database after test
afterAll(async (done) => {
  // await Category.deleteMany();
  mongoose.connection.close();
  done();
});
