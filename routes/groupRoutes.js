// const express = require("express");
// const router = express.Router();

// const {
//   getAllGroups,
//   getGroupById,
//   createGroup,
//   joinGroup,
//   getMyGroups,
//   updateGroup,
//   deleteGroup
// } = require("../controllers/groupController");

// const verifyJWT = require("../middlewares/verifyJWT");

// // Public routes
// router.get("/", getAllGroups);
// router.get("/:id", verifyJWT, getGroupById);

// // Protected routes
// router.post("/", verifyJWT, createGroup);
// router.patch("/join/:id", verifyJWT, joinGroup);
// router.get("/my-groups/list", verifyJWT, getMyGroups);
// router.put("/:id", verifyJWT, updateGroup);
// router.delete("/:id", verifyJWT, deleteGroup);

// module.exports = router;


// const express = require("express");
// const router = express.Router();

// const {
//   getAllGroups,
//   getGroupById,
//   createGroup,
//   joinGroup,
//   getMyGroups,
//   updateGroup,
//   deleteGroup
// } = require("../controllers/groupController");

// const verifyJWT = require("../middlewares/verifyJWT");

// // Public routes
// router.get("/", getAllGroups);
// router.get("/:id", verifyJWT, getGroupById);

// //  TEMP: Make Create Group public for testing
// router.post("/", createGroup);

// router.patch("/join/:id", verifyJWT, joinGroup);
// router.get("/my-groups/list", verifyJWT, getMyGroups);
// router.put("/:id", verifyJWT, updateGroup);
// router.delete("/:id", verifyJWT, deleteGroup);

// module.exports = router;

const express = require('express');
const router = express.Router();
const Group = require('../models/Group');

// Create a new group
router.post('/', async (req, res) => {
  try {
    // Validate request body
    const { name, description, location, maxMembers, startDate, imageUrl } = req.body;
    
    if (!name || !description || !location || !maxMembers || !startDate || !imageUrl) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newGroup = new Group({
      ...req.body,
      createdAt: new Date()
    });

    await newGroup.save();
    
    res.status(201).json({
      success: true,
      message: 'Group created successfully',
      group: newGroup
    });
    
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to create group',
      error: error.message 
    });
  }
});

// Add other group routes as needed
module.exports = router;

