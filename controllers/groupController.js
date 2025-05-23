const Group = require("../models/Group");

// GET all groups
const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch groups" });
  }
};

// GET single group by ID
const getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ error: "Group not found" });
    res.json(group);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch group" });
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

// PATCH: Join group
const joinGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const userEmail = req.user.email;

    const group = await Group.findById(id);
    if (!group) return res.status(404).json({ error: "Group not found" });

    // Check if already joined
    if (group.members.includes(userEmail)) {
      return res.status(400).json({ error: "You have already joined this group" });
    }

    // Check start date
    const now = new Date();
    if (new Date(group.startDate) < now) {
      return res.status(400).json({ error: "Cannot join. Group already started." });
    }

    // Check max members
    if (group.members.length >= group.maxMembers) {
      return res.status(400).json({ error: "Group is full" });
    }

    group.members.push(userEmail);
    await group.save();

    res.json({ message: "Joined group successfully", group });
  } catch (error) {
    res.status(500).json({ error: "Failed to join group" });
  }
};

// GET: Groups created by logged-in user
const getMyGroups = async (req, res) => {
  try {
    const myGroups = await Group.find({ creatorEmail: req.user.email });
    res.json(myGroups);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch your groups" });
  }
};

// PUT: Update a group
const updateGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const userEmail = req.user.email;

    const group = await Group.findById(id);
    if (!group) return res.status(404).json({ error: "Group not found" });

    if (group.creatorEmail !== userEmail) {
      return res.status(403).json({ error: "You are not authorized to update this group" });
    }

    const updated = await Group.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: "Group updated", group: updated });
  } catch (error) {
    res.status(500).json({ error: "Failed to update group" });
  }
};

// DELETE: Delete a group
const deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const userEmail = req.user.email;

    const group = await Group.findById(id);
    if (!group) return res.status(404).json({ error: "Group not found" });

    if (group.creatorEmail !== userEmail) {
      return res.status(403).json({ error: "You are not authorized to delete this group" });
    }

    await Group.findByIdAndDelete(id);
    res.json({ message: "Group deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete group" });
  }
};

module.exports = {
  getAllGroups,
  getGroupById,
  createGroup,
  joinGroup,
  getMyGroups,
  updateGroup,
  deleteGroup,
};
