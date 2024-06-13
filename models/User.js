const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobileNo: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  discussions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Discussion',
  }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
