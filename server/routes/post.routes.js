const express = require('express')
const auth = require('../middleware/auth.middleware')
const Post = require('../models/Post')
const Bookmark = require('../models/Bookmark')
const Like = require('../models/Like')
const router = express.Router({ mergeParams: true })

router.post('/', auth, async (req, res) => {
  try {
    const post = await Post.create({
      userId: req.user._id,
      ...req.body
    })
    res.status(200).send(post)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'На сервере произошла ошибка. Попробуйте позже.' })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const { type } = req.query
    switch (type) {
      case 'all': {
        const posts = await Post.find()
          .populate('userId')
          .sort({ createdAt: 'desc' })

        const bookmarks = await Bookmark.find({ userId: req.user._id })
        const likes = await Like.find({
          userId: req.user._id
        })
        const postsWithBookmarksAndLikes = posts.map((post) => {
          const bookmark = bookmarks.find(
            (b) => b.postId.toString() === post._id.toString()
          )
          const like = likes.find(
            (l) => l.postId.toString() === post._id.toString()
          )
          return {
            ...post.toObject(),
            bookmark: bookmark ? bookmark._id : false,
            like: like ? like._id : false
          }
        })

        res.status(200).send(postsWithBookmarksAndLikes)
        break
      }
      case 'favourites': {
        const posts = await Post.find()
          .populate('userId')
          .sort({ createdAt: 'desc' })

        const bookmarks = await Bookmark.find({ userId: req.user._id })

        const postsWithBookmarks = posts
          .map((post) => {
            const bookmark = bookmarks.find(
              (b) => b.postId.toString() === post._id.toString()
            )
            return {
              ...post.toObject(),
              bookmark: bookmark ? bookmark._id : false
            }
          })
          .filter((post) => post.bookmark)

        res.status(200).send(postsWithBookmarks)
        break
      }

      case 'profile': {
        const { userId } = req.query
        let posts
        if (userId === req.user._id) {
          posts = await Post.find({ userId })
            .populate('userId')
            .sort({ createdAt: 'desc' })
        } else {
          posts = await Post.find({ userId, secret: false })
            .populate('userId')
            .sort({ createdAt: 'desc' })
        }

        res.status(200).send(posts)
        break
      }

      default:
        break
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'На сервере произошла ошибка. Попробуйте позже.' })
  }
})

router.delete('/:postId', auth, async (req, res) => {
  try {
    const { postId } = req.params

    const post = await Post.findById(postId)

    if (post.userId.toString() === req.user._id) {
      const deletedPost = await Post.deleteOne({ _id: postId })
      res.send(deletedPost)
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
