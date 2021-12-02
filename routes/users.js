const router = require("express").Router();
const {
  getUser,
  createUser,
  getUsers,
  updateUser,
  updateUserAvatar,
} = require("../controllers/users");

router.get("/users", getUsers);
router.get("/users/:userId", getUser);
router.post("/users", createUser);
router.patch("/users/me", updateUser);
router.patch("/users/me/avatar", updateUserAvatar);

module.exports = router;
