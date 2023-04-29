const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    content: { type: String, required: true },
    secret: { type: Boolean, required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: true
  }
)

module.exports = model('Comment', schema)
