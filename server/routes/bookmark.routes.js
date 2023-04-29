const express = require('express')
const auth = require('../middleware/auth.middleware')
const Bookmark = require('../models/Bookmark')
const router = express.Router({ mergeParams: true })

router.post('/:postId', auth, async (req, res) => {
  try {
    const { postId } = req.params
    const bookmark = await Bookmark.create({
      postId,
      userId: req.user._id
    })
    res.status(200).send(bookmark)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'На сервере произошла ошибка. Попробуйте позже.' })
  }
})

router.delete('/:bookmarkId', auth, async (req, res) => {
  try {
    const { bookmarkId } = req.params

    const bookmark = await Bookmark.findById(bookmarkId)

    if (bookmark.userId.toString() === req.user._id) {
      const deletedBookmark = await Bookmark.deleteOne({ _id: bookmarkId })
      res.send(deletedBookmark)
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
