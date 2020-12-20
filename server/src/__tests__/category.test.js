const request = require("supertest");
const app = "http://localhost:8000";
const mongoose = require("mongoose");
const databaseName = "ecommerce";

beforeAll(async () => {
  const url = `mongodb://localhost/${databaseName}`;
  await mongoose.connect(url, { useNewUrlParser: true });
});

let categoryId;
describe("Category API", () => {
  test("Should add category", async (done) => {
    await request(app)
      .post("/api/category/add-category")
      .send({
        cName: "test add category3",
        cDescription: "test add desc",
        cStatus: "test add status",
        cImage: "test add image",
      })
      .expect(201)
      .then((res) => {
        categoryId = res.body.addedCategory._id; // save the Id!
        done();
      });
  });

  test("Should get all categories", async () => {
    await request(app).get("/api/category/all-category").expect(200);
  });

  test("Should edit category", async () => {
    await request(app)
      .post("/api/category/edit-category")
      .send({
        cId: categoryId,
        cName: "test edit category",
        cDescription: "test edit desc",
        cStatus: "test edit status",
      })
      .expect(201);
  });
});

test("Should delete category", async () => {
  await request(app)
    .post("/api/category/delete-category")
    .send({
      cId: categoryId,
    })
    .expect(201);
});

// Cleans up database after test
afterAll(async (done) => {
  // await Category.deleteMany();
  mongoose.connection.close();
  done();
});
