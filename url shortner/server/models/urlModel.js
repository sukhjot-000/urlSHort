const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
    trim: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  createdby:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    default: null, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const URL = mongoose.model('Url', urlSchema);

module.exports = URL;
