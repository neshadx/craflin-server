// // models/Group.js
// const mongoose = require("mongoose");

// const groupSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   hobbyCategory: { type: String, required: true }, // dropdown value
//   description: { type: String, required: true },
//   location: { type: String, required: true },
//   maxMembers: { type: Number, required: true },
//   startDate: { type: Date, required: true }, // important for deadline
//   imageUrl: { type: String, required: true },
//   creatorName: { type: String, required: true },
//   creatorEmail: { type: String, required: true },
//   members: { type: [String], default: [] } // user emails
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model("Group", groupSchema);



const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  hobbyCategory: {
    type: String,
    required: true,
    enum: ['Drawing & Painting', 'Photography', 'Video Gaming', 'Fishing', 'Running', 'Cooking', 'Reading', 'Writing']
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  location: {
    type: String,
    required: true
  },
  maxMembers: {
    type: Number,
    required: true,
    min: 2,
    max: 100
  },
  startDate: {
    type: Date,
    required: true
  },
  imageUrl: {
    type: String,
    required: true,
    match: /^(http|https):\/\/[^ "]+$/
  },
  creatorName: {
    type: String,
    required: true
  },
  creatorEmail: {
    type: String,
    required: true,
    match: /^\S+@\S+\.\S+$/
  },
  members: {
    type: [String], // Array of user emails
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Group', groupSchema);
