const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const path = require("path");

// Config
dotenv.config({ path: "backend/config/config.env" });

// Increase request size limits
app.use(express.json({ limit: "100mb" })); 
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" })); 
app.use(fileUpload({ limits: { fileSize: 100 * 1024 * 1024 } })); // 100MB file upload limit

app.use(cookieParser());

// Route import
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);


// Fix the path (go up one level from backend to reach frontend)
const distPath = path.join(__dirname, "..", "frontend", "react-app", "dist");

// Disable caching
app.use(express.static(distPath, { cacheControl: false, etag: false }));

app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"), { cacheControl: false });
});

  

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
