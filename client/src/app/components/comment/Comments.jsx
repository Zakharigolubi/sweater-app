import { Box, CircularProgress, Stack } from '@mui/material'
import React from 'react'
import Comment from './Comment'
import AddComment from './AddComment'
import { useGetCommentsQuery } from '../../store/comment/comment.api'
import CustomError from '../../ui/CustomError'

const Comments = ({ postId }) => {
  const { data: comments, isLoading, error } = useGetCommentsQuery(postId)

  if (isLoading)
    return (
      <Stack direction={'row'} justifyContent={'center'}>
        <CircularProgress />
      </Stack>
    )
  if (error) return <CustomError error={error} />

  return (
    <Box marginLeft={'100px'}>
      <AddComment postId={postId} />
      {comments.map((comment) => (
        <Box key={comment._id}>
          <Comment comment={comment} />
        </Box>
      ))}
    </Box>
  )
}

export default Comments
