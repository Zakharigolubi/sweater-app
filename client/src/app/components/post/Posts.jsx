import React from 'react'
import Post from './Post'
import { useGetAllPostsQuery } from '../../store/post/post.api'
import CustomError from '../../ui/CustomError'
import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

const Posts = ({ type }) => {
  const { id } = useParams()
  const { data, isLoading, error, refetch } = useGetAllPostsQuery({ type, id })

  if (isLoading)
    return (
      <Stack direction={'row'} justifyContent={'center'}>
        <CircularProgress />
      </Stack>
    )
  if (error) return <CustomError error={error} />
  if (!data.length)
    return (
      <Typography
        textAlign={'center'}
        fontSize={16}
        fontWeight={400}
        color={'grey'}
      >
        постов пока нет...
      </Typography>
    )

  return (
    <>
      {data?.map((post) => (
        <Box key={post._id}>
          <Post post={post} refetch={refetch} type={type} />
        </Box>
      ))}
    </>
  )
}

export default Posts
