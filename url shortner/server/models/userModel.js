const mongoose =require('mongoose')

const userSchema= new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
        trim: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
})
const USER = mongoose.model('User', userSchema);

module.exports = USER;
