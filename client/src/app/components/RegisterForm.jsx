import React, { useState } from 'react'
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRegisterMutation } from '../store/auth/auth.api'
import CustomError from '../ui/CustomError'
import { useDispatch } from 'react-redux'
import { login } from '../store/auth/auth.slice'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const requiredMessage = 'Поле обязательно к заполнению'

export const validateSchema = yup.object().shape({
  nickname: yup
    .string()
    .required(requiredMessage)
    .min(3, 'минимальная длина - 3 символов')
    .max(15, 'максимальная длина - 15 символов')
    .matches(
      /^[а-я]{3,15}$/g,
      'никнейм введён некорректно! поле должно содержать только строчные буквы русского алфавита, без пробелов, цифр и символов'
    ),
  email: yup
    .string()
    .email('email введен некорректно')
    .required(requiredMessage),
  password: yup
    .string()
    .required(requiredMessage)
    .matches(
      /(?=.*[A-Z])/,
      'пароль должен содержать хотя бы одну заглавную букву'
    )
    .matches(/(?=.*[0-9])/, 'пароль должен содержать хотя бы одно число')
    .matches(
      /(?=.*[!@#$%^&*])/,
      'пароль должен содержать один из специальных символов !@#$%^&*'
    )
    .matches(/(?=.{8,})/, 'пароль должен состоять минимум из 8 символов'),
  confirmPassword: yup
    .string()
    .required(requiredMessage)
    .oneOf([yup.ref('password'), null], 'введенные пароли не совпадают')
})

const RegisterForm = () => {
  const [registerQuery, { isLoading, error }] = useRegisterMutation()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validateSchema)
  })

  const onSubmit = async (data) => {
    try {
      const response = await registerQuery(data).unwrap()
      localStorage.setItem('access', response.accessToken)
      localStorage.setItem('refresh', response.refreshToken)
      dispatch(login())
    } catch (error) {}
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack alignItems={'center'}>
        <Typography variant='h6' gutterBottom marginBottom={2}>
          зарегистрироваться в Свитере {'  '}
        </Typography>
        <img
          alt='logo'
          src='/img/sweater.png'
          style={{
            width: 80,
            marginBottom: 20,
            marginRight: 20
          }}
        ></img>{' '}
      </Stack>

      <Box mb={2}>
        <TextField
          {...register('nickname')}
          label='никнейм'
          variant='outlined'
          fullWidth
          size='small'
          error={!!errors.nickname}
          helperText={errors?.nickname?.message}
        />
      </Box>
      <Box mb={2}>
        <TextField
          {...register('email')}
          label='эл.почта'
          variant='outlined'
          fullWidth
          size='small'
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
      </Box>
      <Box mb={2}>
        <Box position={'relative'}>
          <TextField
            {...register('password')}
            label='пароль'
            variant='outlined'
            fullWidth
            size='small'
            error={!!errors.password}
            helperText={errors?.password?.message}
            type={showPassword ? 'text' : 'password'}
          />
          <Box position={'absolute'} right={15} top={0}>
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Box>
        </Box>

        <Box mt={2} position={'relative'}>
          <TextField
            {...register('confirmPassword')}
            label='повторить пароль'
            variant='outlined'
            fullWidth
            size='small'
            error={!!errors.confirmPassword}
            helperText={errors?.confirmPassword?.message}
            type={showConfirmPassword ? 'text' : 'password'}
          />
          <Box position={'absolute'} right={15} top={0}>
            <IconButton
              onClick={handleClickShowConfirmPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Box>
        </Box>
      </Box>

      {error && <CustomError error={error} />}
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        mt={2}
      >
        <Button
          variant='outlined'
          type='submit'
          sx={{ textTransform: 'lowercase' }}
          disabled={isLoading}
        >
          зарегистрироваться
        </Button>
        <Typography variant='subtitle2'>
          уже есть аккаунт? <NavLink to='/login'> войти</NavLink>
        </Typography>
      </Stack>
    </form>
  )
}

export default RegisterForm
