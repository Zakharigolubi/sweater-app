const express = require('express')
const auth = require('../middleware/auth.middleware')
const Like = require('../models/Like')
const Post = require('../models/Post')
const router = express.Router({ mergeParams: true })

// router.post('/:postId', auth, async (req, res) => {
//   try {
//     const { postId } = req.params
//     const like = await Like.findOneAndUpdate(
//       { postId },
//       { $inc: { count: 1 }, $push: { users: req.user._id } },
//       { upsert: true, new: true }
//     )
//     res.status(200).send(like)
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: 'На сервере произошла ошибка. Попробуйте позже.' })
//   }
// })

router.post('/:postId', auth, async (req, res) => {
  try {
    const { postId } = req.params
    const like = await Like.create({
      postId,
      userId: req.user._id
    })

    await Post.findOneAndUpdate({ _id: postId }, { $inc: { likesCount: 1 } })
    // { _id: postId },
    // { $inc: { likesCount: 1 }, $push: { users: req.user._id } },
    // { upsert: true, new: true }

    res.status(200).send(like)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'На сервере произошла ошибка. Попробуйте позже.' })
  }
})

router.delete('/:likeId', auth, async (req, res) => {
  try {
    const { likeId } = req.params

    const like = await Like.findById(likeId)

    if (like.userId.toString() === req.user._id) {
      const deletedLike = await Like.deleteOne({ _id: likeId })

      await Post.findOneAndUpdate(
        { _id: like.postId.toString() },
        { $inc: { likesCount: -1 } }
      )

      res.status(200).send(deletedLike)
    } else {
      return res.status(401).json({ message: 'Unauthorized' })
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'На сервере произошла ошибка. Попробуйте позже.' })
  }
})

// router.delete('/:likeId', auth, async (req, res) => {
//   try {
//     const { likeId } = req.params
//     const like = await Like.findOneAndUpdate(
//       { _id: likeId },
//       { $inc: { count: -1 }, $pull: { users: req.user._id } },
//       { new: true }
//     )
//     res.status(200).send(like)
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: 'На сервере произошла ошибка. Попробуйте позже.' })
//   }
// })

module.exports = router
