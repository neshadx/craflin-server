// models/Group.js
const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hobbyCategory: { type: String, required: true }, // dropdown value
  description: { type: String, required: true },
  location: { type: String, required: true },
  maxMembers: { type: Number, required: true },
  startDate: { type: Date, required: true }, // important for deadline
  imageUrl: { type: String, required: true },
  creatorName: { type: String, required: true },
  creatorEmail: { type: String, required: true },
  members: { type: [String], default: [] } // user emails
}, {
  timestamps: true
});

module.exports = mongoose.model("Group", groupSchema);


