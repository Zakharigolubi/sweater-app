import { Alert, Box } from '@mui/material'
import React from 'react'

const CustomError = ({ error }) => {
  return (
    <Box my={1}>
      <Alert severity='error'>
        {error?.data?.error?.message
          ? error.data.error.message
          : 'ты что-то нажал и всё сломалось'}
      </Alert>
    </Box>
  )
}

export default CustomError
