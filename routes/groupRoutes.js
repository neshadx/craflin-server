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

// Create Group
router.post('/', async (req, res) => {
  try {
    const group = new Group({
      ...req.body,
      createdAt: new Date()
    });
    
    await group.save();
    
    res.status(201).json({
      success: true,
      message: 'Group created successfully',
      group: group
    });
    
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;