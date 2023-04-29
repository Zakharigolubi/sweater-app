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
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../store/auth/auth.api'
import { login } from '../store/auth/auth.slice'
import CustomError from '../ui/CustomError'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const requiredMessage = 'поле обязательно к заполнению'

const validateSchema = yup.object().shape({
  password: yup.string().required(requiredMessage),
  email: yup
    .string()
    .required(requiredMessage)
    .matches(/^\S+@\S+\.\S+$/g, 'email введен некорректно')
})

const LoginForm = () => {
  const [loginQuery, { isLoading, error }] = useLoginMutation()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validateSchema)
  })

  const onSubmit = async (data) => {
    try {
      const response = await loginQuery(data).unwrap()
      localStorage.setItem('access', response.accessToken)
      localStorage.setItem('refresh', response.refreshToken)
      dispatch(login())
    } catch (error) {}
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack alignItems={'center'}>
        <Typography variant='h6' gutterBottom marginBottom={2}>
          Добро пожаловать в Свитер! {'  '}
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
          {...register('email')}
          label='эл.почта'
          variant='outlined'
          fullWidth
          size='small'
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
      </Box>
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
          Войти
        </Button>
        <Typography variant='subtitle2'>
          нет аккаунта? <NavLink to='/register'> зарегистрироваться</NavLink>
        </Typography>
      </Stack>
    </form>
  )
}

export default LoginForm
