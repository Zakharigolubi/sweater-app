const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    content: { type: String, required: true },
    secret: Boolean,
    disComment: Boolean,
    likesCount: { type: Number, default: 0 },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: true
  }
)

module.exports = model('Post', schema)
