require("dotenv").config();
const express = require("express");
const routes = require("./routes/tasks");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const app = express();

// middlleware
app.use(express.static("./public"));
app.use(express.json());

// routes
app.use("/api/v1/tasks", routes);

app.use(notFound);
app.use(errorHandlerMiddleware);
// port
const port = 3000 || process.env.port;

const Start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

Start();
