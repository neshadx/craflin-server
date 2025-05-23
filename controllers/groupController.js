
// const Group = require("../models/Group");

// // GET all groups from MongoDB
// const getAllGroups = async (req, res) => {
//   try {
//     const groups = await Group.find();
//     res.json(groups);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch groups" });
//   }
// };

// // POST: Create new group
// const createGroup = async (req, res) => {
//   try {
//     const newGroup = req.body;
//     const savedGroup = await Group.create(newGroup);
//     res.status(201).json(savedGroup);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to create group" });
//   }
// };

// module.exports = {
//   getAllGroups,
//   createGroup,
// };





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

// POST: Create new group
const createGroup = async (req, res) => {
  try {
    const {
      name,
      hobbyCategory,
      description,
      location,
      maxMembers,
      startDate,
      imageUrl,
      creatorName,
      creatorEmail,
    } = req.body;

    const newGroup = new Group({
      name,
      hobbyCategory,
      description,
      location,
      maxMembers,
      startDate,
      imageUrl,
      creatorName,
      creatorEmail,
      members: []
    });

    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ error: "Failed to create group" });
  }
};

module.exports = {
  getAllGroups,
  createGroup,
};
