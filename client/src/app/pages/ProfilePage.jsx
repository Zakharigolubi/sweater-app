import React from 'react'
import ProfileInfo from '../components/profile/ProfileInfo'
import { Box, CircularProgress, Stack } from '@mui/material'
import ProfileEdit from '../components/profile/ProfileEdit'
import Posts from '../components/post/Posts'
import { useParams } from 'react-router-dom'
import { useGetProfileQuery } from '../store/user/user.api'
import CustomError from '../ui/CustomError'
import AnotherProfileInfo from '../components/profile/AnotherProfileInfo'

const ProfilePage = () => {
  const { id } = useParams()
  const { data: profile, isLoading, error } = useGetProfileQuery()

  if (isLoading)
    return (
      <Stack direction={'row'} justifyContent={'center'}>
        <CircularProgress />
      </Stack>
    )
  if (error) return <CustomError error={error} />
  return (
    <Box>
      {id === profile.userId ? (
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Stack>
            <ProfileInfo moreInfo={true} />
          </Stack>
          <Stack>
            <ProfileEdit />
          </Stack>
        </Stack>
      ) : (
        <Stack direction={'row'} justifyContent={'space-between'}>
          <AnotherProfileInfo />
        </Stack>
      )}

      <Stack mt={5}>
        <Posts type='profile' />
      </Stack>
    </Box>
  )
}

export default ProfilePage
