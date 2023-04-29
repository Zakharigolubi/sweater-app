import { Box, Button, FormControlLabel, Stack, TextField } from '@mui/material'
import React from 'react'
import CustomCheckbox from '../../ui/CustomCheckbox'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { useAddPostMutation } from '../../store/post/post.api'
import CustomError from '../../ui/CustomError'

const validateSchema = yup.object().shape({
  content: yup
    .string()
    .min(2, 'минимальная длина поста- 2 символов')
    .max(222, 'максимальная длина поста - 222 символов')
    .matches(
      /^[а-яё\d \n.,!?:;()\-–—«»"']{2,222}$/i,
      'поле должно содержать только строчные буквы русского алфавита'
    )
})

const AddPost = () => {
  const [addPostQuery, { isLoading, error }] = useAddPostMutation()

  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validateSchema),
    defaultValues: { secret: false }
  })

  const onSubmit = async (post) => {
    try {
      await addPostQuery(post).unwrap()
      reset()
    } catch (error) {}
  }

  return (
    <Box marginBottom={8}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('content')}
          fullWidth
          multiline
          rows={4}
          placeholder='что происходит?'
          helperText={errors?.content?.message}
          sx={{
            bgcolor: '#F0F0F0'
          }}
        />
        {error && <CustomError error={error} />}

        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Stack direction={'row'}>
            <FormControlLabel
              label='секрет'
              control={
                <Controller
                  name='secret'
                  control={control}
                  render={({ field: { value, ...field } }) => (
                    <CustomCheckbox
                      color='default'
                      {...field}
                      checked={!!value}
                    />
                  )}
                />
              }
            />
            <FormControlLabel
              label='отключить комментарии'
              control={
                <Controller
                  name='disComment'
                  control={control}
                  render={({ field: { value, ...field } }) => (
                    <CustomCheckbox
                      color='default'
                      {...field}
                      checked={!!value}
                    />
                  )}
                />
              }
            />
          </Stack>

          <Button
            sx={{
              textTransform: 'lowercase',
              borderRadius: '20px',
              padding: '5px 16px',
              fontSize: '16px'
            }}
            type='submit'
            disabled={isLoading}
          >
            опубликовать
          </Button>
        </Stack>
      </form>
    </Box>
  )
}

export default AddPost
