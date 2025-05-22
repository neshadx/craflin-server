const express = require("express");
const router = express.Router();

const {
  getAllGroups,
  createGroup
} = require("../controllers/groupController");

// GET: All groups
router.get("/", getAllGroups);

// POST: Create new group
router.post("/", createGroup);

module.exports = router;
