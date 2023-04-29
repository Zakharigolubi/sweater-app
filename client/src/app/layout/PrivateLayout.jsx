import React from 'react'
import { Box, Container, Stack } from '@mui/material'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'

const PrivateLayout = () => {
  return (
    <Container>
      <Stack
        direction={'row'}
        my={4}
        width={'100%'}
        justifyContent={'space-between'}
        alignItems={'flex-start'}
      >
        <SideBar />

        <Box sx={{ width: '70%' }} padding={'20px'}>
          <Outlet />
        </Box>
      </Stack>
    </Container>
  )
}

export default PrivateLayout
