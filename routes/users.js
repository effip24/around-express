const router = require("express").Router();
const fs = require("fs");
const path = require("path");

const filepath = path.join(__dirname, "../data/users.json");

router.get("/", (req, res) => {
  fs.readFile(filepath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      res.status(500);
      res.send({ message: "An error has occurred on the server" });
      return;
    }

    res.send(JSON.parse(data));
  });
});

router.get("/:id", (req, res) => {
  fs.readFile(filepath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      res.status(500);
      res.send({ message: "An error has occurred on the server" });
      return;
    }

    const userData = JSON.parse(data).filter(
      (user) => user._id === req.params.id
    )[0];
    if (!userData) {
      res.status(400);
      res.send({ message: "User ID not found" });
      return;
    }

    res.send(userData);
  });
});

module.exports = router;
