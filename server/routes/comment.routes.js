const express = require('express')
const auth = require('../middleware/auth.middleware')
const Comment = require('../models/Comment')
const router = express.Router({ mergeParams: true })

router.get('/:postId', auth, async (req, res) => {
  try {
    const { postId } = req.params
    const comments = await Comment.find({ postId })
      .populate('userId')
      .sort({ createdAt: 'desc' })
    res.status(200).send(comments)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'На сервере произошла ошибка. Попробуйте позже.' })
  }
})

router.post('/:postId', auth, async (req, res) => {
  try {
    const { postId } = req.params
    const comment = await Comment.create({
      postId,
      userId: req.user._id,
      ...req.body
    })

    res.status(200).send(comment)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'На сервере произошла ошибка. Попробуйте позже.' })
  }
})

router.delete('/:commentId', auth, async (req, res) => {
  try {
    const { commentId } = req.params

    const comment = await Comment.findById(commentId)

    if (comment.userId.toString() === req.user._id) {
      const deletedComment = await Comment.deleteOne({ _id: commentId })
      res.send(deletedComment)
    } else {
      return res.status(401).json({ message: 'Unauthorized' })
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'На сервере произошла ошибка. Попробуйте позже.' })
  }
})

module.exports = router
