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



// const mongoose = require('mongoose');

// const groupSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//     maxlength: 100
//   },
//   hobbyCategory: {
//     type: String,
//     required: true,
//     enum: ['Drawing & Painting', 'Photography', 'Video Gaming', 'Fishing', 'Running', 'Cooking', 'Reading', 'Writing']
//   },
//   description: {
//     type: String,
//     required: true,
//     maxlength: 1000
//   },
//   location: {
//     type: String,
//     required: true
//   },
//   maxMembers: {
//     type: Number,
//     required: true,
//     min: 2,
//     max: 100
//   },
//   startDate: {
//     type: Date,
//     required: true
//   },
//   imageUrl: {
//     type: String,
//     required: true,
//     match: /^(http|https):\/\/[^ "]+$/
//   },
//   creatorName: {
//     type: String,
//     required: true
//   },
//   creatorEmail: {
//     type: String,
//     required: true,
//     match: /^\S+@\S+\.\S+$/
//   },
//   members: {
//     type: [String], // Array of user emails
//     default: []
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('Group', groupSchema);



const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Group name is required'],
    trim: true,
    maxlength: [100, 'Group name cannot exceed 100 characters']
  },
  hobbyCategory: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: [
        'Drawing & Painting',
        'Photography',
        'Video Gaming',
        'Fishing',
        'Running',
        'Cooking',
        'Reading',
        'Writing'
      ],
      message: 'Please select a valid category'
    }
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  maxMembers: {
    type: Number,
    required: [true, 'Max members is required'],
    min: [2, 'Minimum 2 members required'],
    max: [100, 'Maximum 100 members allowed']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
    validate: {
      validator: function(v) {
        return /^(http|https):\/\/[^ "]+$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  creatorName: {
    type: String,
    required: true
  },
  creatorEmail: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\S+@\S+\.\S+$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  creatorPhoto: String,
  members: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Group', groupSchema);
