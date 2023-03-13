const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/users");
const ensureLoggedIn = require("../../config/ensureLoggedIn");
const authMiddleware = require("../../middleware/authMiddleware");

// All paths start with '/api/users'

// POST /api/users
router.post("/", usersCtrl.create);
router.post("/login", usersCtrl.login);
router.get("/check-token", ensureLoggedIn, usersCtrl.checkToken);
router.get("/get-current-user", authMiddleware, usersCtrl.getCurrentUser);
router.get("/get-all-users", authMiddleware, usersCtrl.getAllUsers);

module.exports = router;
