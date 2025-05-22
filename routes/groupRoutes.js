const express = require("express");
const router = express.Router();

const { getAllGroups } = require("../controllers/groupController");

// Route: GET /api/groups
router.get("/", getAllGroups);

module.exports = router;
