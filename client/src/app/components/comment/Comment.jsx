import React from 'react'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { displayDate } from '../../utils/DisplayDate'
import { useGetProfileQuery } from '../../store/user/user.api'
import { useDeleteCommentMutation } from '../../store/comment/comment.api'
import DeleteIcon from '@mui/icons-material/Delete'

const Comment = ({ comment }) => {
  const { data: profile } = useGetProfileQuery()
  const [deleteCommentQuery, { isLoading }] = useDeleteCommentMutation()

  const handleDelete = async () => {
    try {
      await deleteCommentQuery(comment._id).unwrap()
    } catch (error) {}
  }

  return (
    <Box mb={5} pb={1} borderBottom={'1px solid #c4c4be'}>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        {comment.secret ? (
          <Stack direction={'row'} alignItems={'center'}>
            <img
              src='/img/sweater.png'
              alt='default avatar'
              style={{
                width: 35,
                marginBottom: 2,
                marginRight: 2
              }}
            />
            <Typography fontSize={16} fontWeight={500}>
              секрет
            </Typography>
          </Stack>
        ) : (
          <Stack direction={'row'} alignItems={'center'}>
            <img
              src={`/img/avatars/${comment.userId.image}.png`}
              alt='avatar'
              style={{
                width: 35,
                marginBottom: 2,
                marginRight: 2
              }}
            />
            <Typography fontSize={16} fontWeight={500}>
              {comment.userId.nickname}
            </Typography>
          </Stack>
        )}

        <Stack direction={'row'} alignItems={'center'}>
          <Typography fontSize={14}>
            {displayDate(comment.createdAt)}
          </Typography>
          {profile?.userId === comment.userId._id && (
            <IconButton onClick={handleDelete} disabled={isLoading}>
              <DeleteIcon fontSize='small' />
            </IconButton>
          )}
        </Stack>
      </Stack>

      <Typography fontSize={14} fontWeight={400}>
        {comment.content}
      </Typography>
    </Box>
  )
}

export default Comment
