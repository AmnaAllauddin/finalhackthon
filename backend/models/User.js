const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 
  displayName: { type: String, required: true },
  email: { type: String, required: true },
  password:{type:Number,required:true},
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
