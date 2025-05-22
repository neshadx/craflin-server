const Group = require("../models/Group");

// GET all groups from MongoDB
const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch groups" });
  }
};

module.exports = {
  getAllGroups,
};
