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


const express = require("express");
const router = express.Router();

const {
  getAllGroups,
  getGroupById,
  createGroup,
  joinGroup,
  getMyGroups,
  updateGroup,
  deleteGroup
} = require("../controllers/groupController");

const verifyJWT = require("../middlewares/verifyJWT");

// Public routes
router.get("/", getAllGroups);
router.get("/:id", verifyJWT, getGroupById);

//  TEMP: Make Create Group public for testing
router.post("/", createGroup);

router.patch("/join/:id", verifyJWT, joinGroup);
router.get("/my-groups/list", verifyJWT, getMyGroups);
router.put("/:id", verifyJWT, updateGroup);
router.delete("/:id", verifyJWT, deleteGroup);

module.exports = router;

