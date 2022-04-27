const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use("/api/users", require("./routes/userRoutes"));

app.use(
  `/api/users`,
  createProxyMiddleware({ target: "http://localhost:5000", changeOrigin: true })
);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
