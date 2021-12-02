const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cards = require("./routes/cards");
const users = require("./routes/users");

mongoose.connect("mongodb://localhost:27017/aroundb");
const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(helmet());
app.use((req, res, next) => {
  req.user = {
    _id: "61a797770163889f1d02d550",
  };

  next();
});
app.use("/", cards);
app.use("/", users);
app.get("*", (req, res) => {
  res.status(404);
  res.send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
