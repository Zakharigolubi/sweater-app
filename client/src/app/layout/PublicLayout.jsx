import { Box, Paper, Stack } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

const PublicLayout = () => {
  return (
    <Stack
      alignItems={'center'}
      justifyContent={'center'}
      minHeight={'100vh'}
      borderRadius={''}
      bgcolor={'#f0efeb'}
    >
      <Paper elevation={4}>
        <Box p={3} width={440} bgcolor={'#f0efeb'}>
          <Outlet />
        </Box>
      </Paper>
    </Stack>
  )
}

export default PublicLayout
