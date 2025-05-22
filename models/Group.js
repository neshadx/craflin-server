const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  description: String,
  location: String,
  date: String,
  time: String,
  image: String,
  status: { type: String, default: "active" },
  creatorEmail: String,
}, {
  timestamps: true
});

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
