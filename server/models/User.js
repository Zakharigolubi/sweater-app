const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    nickname: String,
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: String,
    image: Number,
    status: String
  },

  {
    timestamps: true
  }
)

module.exports = model('User', schema)
