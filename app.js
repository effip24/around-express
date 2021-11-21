const express = require("express");
const helmet = require("helmet");
const cards = require("./routes/cards");
const users = require("./routes/users");

const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet());
app.use("/cards", cards);
app.use("/users", users);
app.get("*", (req, res) => {
  res.status(500);
  res.send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
