import { Box } from '@mui/material'
import React from 'react'
import AddPost from '../components/post/AddPost'
import Posts from '../components/post/Posts'

const MainPage = () => {
  return (
    <Box>
      <AddPost />
      <Posts type='all' />
    </Box>
  )
}

export default MainPage
