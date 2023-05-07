import React from 'react'
import { Box, Button, FormControlLabel, Stack, TextField } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import CustomCheckbox from '../../ui/CustomCheckbox'
import { useAddCommentMutation } from '../../store/comment/comment.api'
import CustomError from '../../ui/CustomError'

const validateSchema = yup.object().shape({
  content: yup
    .string()
    .min(2, 'минимальная длина комментария - 2 символа')
    .max(166, 'максимальная длина комментария - 166 символов')
    .matches(
      /^[\d!@№#$%^&*(),.?":;{}|<>_+=\\/\-[\]\sёа-я]{2,166}$/u,
      'поле должно содержать только строчные буквы русского алфавита'
    )
})

const AddComment = ({ postId }) => {
  const [addCommentQuery, { isLoading, error }] = useAddCommentMutation()

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

  const onSubmit = async (comment) => {
    comment.postId = postId
    try {
      await addCommentQuery(comment).unwrap()
      reset()
    } catch (error) {}
  }
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('content')}
          fullWidth
          multiline
          rows={2}
          size='small'
          placeholder='введите комментарий...'
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
          </Stack>

          <Button
            sx={{
              textTransform: 'lowercase',
              borderRadius: '20px',
              padding: '5px 16px',
              fontSize: '13px'
            }}
            type='submit'
            disabled={isLoading}
          >
            отправить
          </Button>
        </Stack>
      </form>
    </Box>
  )
}

export default AddComment
