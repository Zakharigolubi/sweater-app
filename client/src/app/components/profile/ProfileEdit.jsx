import React, { useState } from 'react'
import Button from '@mui/material/Button'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import SettingsIcon from '@mui/icons-material/Settings'
import { Box, Stack, TextField } from '@mui/material'
import BootstrapDialogTitle, { BootstrapDialog } from './DialogTitle'
import Typography from '@mui/material/Typography'
import {
  useEditProfileMutation,
  useGetProfileQuery
} from '../../store/user/user.api'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useGetAllPostsQuery } from '../../store/post/post.api'
import { useParams } from 'react-router-dom'
import CustomError from '../../ui/CustomError'

const avatars = []
for (let i = 1; i <= 17; i++) {
  avatars.push(i)
}

const validateSchema = yup.object().shape({
  status: yup
    .string()
    .min(1, 'введите статус или нажмите пробел')
    .max(99, 'максимальная длина поста - 99 символов')
    .matches(
      /^[\p{Ll}\d!@№#$%^&*(),.?":;{}|<>_+=\\/\-[\]\sёа-я]{1,99}$/i,
      'поле должно содержать только строчные буквы русского алфавита'
    )
})

export default function ProfileEdit() {
  const [editProfile, { isLoading, error }] = useEditProfileMutation()
  const { data: profile } = useGetProfileQuery()
  const { id } = useParams()
  const { refetch } = useGetAllPostsQuery({ type: 'profile', id: id })
  const [activeAvatar, setActiveAvatar] = useState(profile.image)
  const [open, setOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validateSchema),
    defaultValues: { status: profile.status }
  })

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleAvatarClick = (id) => {
    setActiveAvatar(id)
  }
  const onSubmit = async (data) => {
    try {
      data.image = activeAvatar
      data.id = profile.userId
      await editProfile(data).unwrap()
      refetch()
      handleClose()
      setActiveAvatar(data.image)
    } catch (error) {}
  }

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant='text'
        startIcon={<SettingsIcon />}
        sx={{
          textTransform: 'lowercase',
          borderRadius: '20px',
          padding: '5px 16px',
          fontSize: '16px'
        }}
        disabled={isLoading}
      >
        редактировать
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <BootstrapDialogTitle
          id='customized-dialog-title'
          onClose={handleClose}
          sx={{
            backgroundColor: '#f0efeb'
          }}
        >
          редактирование профиля
        </BootstrapDialogTitle>

        <div style={{ backgroundColor: '#f0efeb' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent dividers>
              <Box mb={2}>
                <Typography mb={2} sx={{ fontWeight: 'bold' }}>
                  изменить статус:
                </Typography>
                <TextField
                  {...register('status')}
                  label='новый статус...'
                  variant='filled'
                  size='small'
                  fullWidth
                  helperText={errors?.status?.message}
                  error={!!errors.status}
                />
              </Box>
              {error && <CustomError error={error} />}

              <Typography mb={2} sx={{ fontWeight: 'bold' }}>
                выбрать свитер:
              </Typography>
              <Stack direction={'row'} alignItems={'center'} flexWrap={'wrap'}>
                {avatars.map((item) => (
                  <Box
                    p={2}
                    key={item}
                    sx={{
                      cursor: 'pointer'
                    }}
                    onClick={() => handleAvatarClick(item)}
                  >
                    <img
                      alt='avatar'
                      src={`/img/avatars/${item}.png`}
                      style={{
                        width: '68px',
                        transition: '0.3s',
                        transform: activeAvatar === item ? 'scale(1.5)' : 'none'
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                type='submit'
                sx={{
                  textTransform: 'lowercase',
                  borderRadius: '20px',
                  padding: '5px 16px',
                  fontSize: '16px'
                }}
              >
                изменить
              </Button>
            </DialogActions>
          </form>
        </div>
      </BootstrapDialog>
    </div>
  )
}
