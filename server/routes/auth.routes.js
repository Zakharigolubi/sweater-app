const express = require('express')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const randomAvatar = require('../helpers/random.avatar')
const tokenService = require('../services/token.service')
const router = express.Router({ mergeParams: true })

const registerValidations = [
  check(
    'nickname',
    'Никнейм введён некорректно! Поле должно содержать только строчные буквы русского алфавита. Количество символов 3-15.'
  ).matches(/^[а-я]{3,15}$/g),
  check('email', 'некорректный email').isEmail(),
  check('password', 'некорректный пароль')
    .matches(/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .isLength({ min: 8 })
]

router.post('/register', [
  ...registerValidations,
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: 'данные введены некорректно',
            code: 400,
            errors: errors.array()
          }
        })
      }

      const { nickname, email, password } = req.body

      const existingEmail = await User.findOne({ email })
      if (existingEmail) {
        return res.status(400).json({
          error: {
            message: 'пользователь с таким email уже зарегистрирован',
            code: 400
          }
        })
      }
      const existingNickname = await User.findOne({ nickname })
      if (existingNickname) {
        return res.status(400).json({
          error: {
            message: 'пользователь с таким ником уже зарегистрирован',
            code: 400
          }
        })
      }

      const hashedPassword = await bcrypt.hash(password, 12)

      const newUser = await User.create({
        password: hashedPassword,
        nickname,
        email,
        image: randomAvatar(1, 17),
        status: ''
      })

      const tokens = tokenService.generate({ _id: newUser._id })
      await tokenService.save(newUser._id, tokens.refreshToken)

      res.status(200).send({
        ...tokens,
        userId: newUser._id
      })
    } catch (error) {
      res
        .status(500)
        .json({ message: 'На сервере произошла ошибка. Попробуйте позже.' })
    }
  }
])

router.post('/login', [
  check('email', 'Email введен некорректно').normalizeEmail().isEmail(),
  check('password', 'Пароль не может быть пустым').exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: 'данные введены некорректно',
            code: 400
          }
        })
      }
      const { email, password } = req.body

      const existingUser = await User.findOne({ email })

      if (!existingUser) {
        return res.status(400).send({
          error: {
            message: 'пользователь с таким email не зарегистрирован',
            code: 400
          }
        })
      }

      const isPasswordEqual = await bcrypt.compare(
        password,
        existingUser.password
      )

      if (!isPasswordEqual) {
        return res.status(400).send({
          error: {
            message: 'неверный пароль',
            code: 400
          }
        })
      }

      const tokens = tokenService.generate({ _id: existingUser._id })
      await tokenService.save(existingUser._id, tokens.refreshToken)

      res.status(200).send({ ...tokens, userId: existingUser._id })
    } catch (error) {
      res
        .status(500)
        .json({ message: 'На сервере произошла ошибка. Попробуйте позже.' })
    }
  }
])
function isTokenInvalid(data, dbToken) {
  return !data || !dbToken || data._id !== dbToken?.userId?.toString()
}

router.post('/token', async (req, res) => {
  try {
    const { refreshToken } = req.body
    const data = tokenService.validateRefresh(refreshToken)

    const dbToken = await tokenService.findToken(refreshToken)

    if (isTokenInvalid(data, dbToken)) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const tokens = tokenService.generate({
      _id: dbToken.userId
    })

    await tokenService.save(data._id, tokens.refreshToken)

    res.status(200).send({ ...tokens, userId: data._id })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'На сервере произошла ошибка. Попробуйте позже.' })
  }
})

module.exports = router
