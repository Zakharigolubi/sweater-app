const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = express.Router({ mergeParams: true })

router.patch('/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params
    const { image, status } = req.body

    if (userId === req.user._id) {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { image, status },
        {
          new: true
        }
      )
      res.send(updatedUser)
    } else {
      return res.status(401).json({ message: 'Unauthorized' })
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'На сервере произошла ошибка. Попробуйте позже.' })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const list = await User.find()
    res.send(
      list.map((user) => {
        return {
          userId: user._id,
          nickname: user.nickname,
          image: user.image,
          status: user.status,
          createdAt: user.createdAt
        }
      })
    )
  } catch (error) {
    res
      .status(500)
      .json({ message: 'На сервере произошла ошибка. Попробуйте позже.' })
  }
})

router.get('/profile/:userId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    res.send({
      userId: user._id,
      nickname: user.nickname,
      image: user.image,
      status: user.status,
      createdAt: user.createdAt
    })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'На сервере произошла ошибка. Попробуйте позже.' })
  }
})

router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    res.send({
      userId: user._id,
      nickname: user.nickname,
      image: user.image,
      status: user.status,
      createdAt: user.createdAt
    })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'На сервере произошла ошибка. Попробуйте позже.' })
  }
})
module.exports = router
