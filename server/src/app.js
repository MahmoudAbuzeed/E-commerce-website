require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { PAGE_NOT_FOUND, MONGO_CONNECTED_MSG, MONGO_DISCONNECTED_MSG, SERVER_MSG } = require("./Shared/constants");

// Import Router
const Router = require("./routes/index");
const { handleError } = require("./Shared/lib/error");
const logger = require("./Shared/lib/logger");
const expressRequestId = require("express-request-id")();
const requestLogger = require("./Shared/lib/requestLogger");

// Run Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(SERVER_MSG, PORT);
});

// Database Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log(MONGO_CONNECTED_MSG))
  .catch((err) => console.log(MONGO_DISCONNECTED_MSG));
// add .env
app.use(expressRequestId);
app.use(requestLogger);
// Middleware
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("", Router);
app.use((req, res) => {
  logger.error(req.method, req.originalUrl, PAGE_NOT_FOUND);
  return handleError({ statusCode: 404, message: PAGE_NOT_FOUND }, res);
});

app.use((err, req, res, next) => {
  logger.error(err);
  handleError(err, res);
});
