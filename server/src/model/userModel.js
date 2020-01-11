const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String,
    set(val) {
      return bcrypt.hashSync(val, 8)
    }
  },
})
let userModel = mongoose.model('User', userSchema)

module.exports = userModel