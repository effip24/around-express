const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const filepath = path.join(__dirname, "../data/cards.json");

router.get("/", (req, res) => {
  fs.readFile(filepath, { encoding: "utf8" }, (err, data) => {
    err
      ? res.status(500) &&
        res.send({ message: "An error has occurred on the server" })
      : res.send(JSON.parse(data));
  });
});

module.exports = router;
