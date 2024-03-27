const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const basicAuth = require('express-basic-auth');
const options = require("./config/swagger.config.js");
const specs = swaggerJsdoc(options);
const swaggerUiOptions = {
  explorer: true,
};

const { PORT, ORIGIN } = require("./config/env.config");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/api-docs",
  basicAuth({
    users: { admin: "1234" },
    challenge: true,
  }),
  swaggerUi.serve,
  swaggerUi.setup(specs, swaggerUiOptions)
);

var corsOptions = {
  origin: ORIGIN,
};
app.use(cors(corsOptions));

const connectDB = require("./config/db.config.js");
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

connectDB();

// set port, listen for requests
app.listen(PORT, () => {
  console.log(`🚀 API Docs: [ http://localhost:${PORT}/api-docs ]`);
});