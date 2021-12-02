const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate("owner")
    .then((card) => res.status(200).send({ data: card }))
    .catch(() => res.status(500).send({ error: "internal server error" }));
};
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({
          error: err.message,
        });
      } else {
        res.status(500).send({
          error: "internal server error",
        });
      }
    });
};
module.exports.deleteCard = (req, res) => {
  Card.findOneAndRemove({ _id: req.params.cardId })
    .orFail(() => {
      const error = new Error();
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(404).send({
          error: "No card was found with the given id",
        });
      } else {
        res.status(500).send({
          error: "internal server error",
        });
      }
    });
};
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error();
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(404).send({
          error: "No card was found with the given id",
        });
      } else {
        res.status(500).send({
          error: "internal server error",
        });
      }
    });
};
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error();
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(404).send({
          error: "No card was found with the given id",
        });
      } else {
        res.status(500).send({
          error: "internal server error",
        });
      }
    });
};
