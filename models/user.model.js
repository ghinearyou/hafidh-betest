const mongoose = require('mongoose')
const schema = new mongoose.Schema({ 
  emailAddress: {
    type: String,
    required: true,
    unique: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  accountNumber: {
    type: Number,
    required: true,
    unique: true,
    index: true
  },
  identityNumber: {
    type: Number,
    required: true,
    unique: true,
    index: true
  }
});

module.exports = {
  User: mongoose.model('Users', schema)
}
