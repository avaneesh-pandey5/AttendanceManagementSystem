require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

//Using Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Importing Routes
const webRoutes = require("./routes/webRoutes");
const appRoutes = require("./routes/appRoutes");

//Using Routes
app.use("/api/v1", webRoutes);
app.use("/api/v1", appRoutes);

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server listening 🎵 on port ${process.env.PORT}`);
});
