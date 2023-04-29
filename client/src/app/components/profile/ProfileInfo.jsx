import React from 'react'
import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { useGetProfileQuery } from '../../store/user/user.api'
import { displayDateProfile } from '../../utils/DisplayDate'
import CustomError from '../../ui/CustomError'

const ProfileInfo = ({ moreInfo }) => {
  const { data: profile, isLoading, error } = useGetProfileQuery()

  if (isLoading)
    return (
      <Box>
        <CircularProgress />
      </Box>
    )
  if (error) return <CustomError error={error} />

  return (
    <Box>
      {moreInfo ? (
        <>
          <img
            alt='avatar'
            src={`/img/avatars/${profile.image}.png`}
            style={{ width: 130 }}
          />
          <Typography fontSize={22} fontWeight={500}>
            {profile.nickname}
          </Typography>
          <Typography
            fontSize={16}
            fontWeight={500}
            color={'grey'}
            marginBottom={2}
          >
            {profile.status === '' ? 'статус не установлен' : profile.status}
          </Typography>

          <Stack direction={'row'} alignItems={'center'}>
            <CalendarMonthIcon color='primary' />
            {displayDateProfile(profile?.createdAt)}
          </Stack>
          <Typography fontSize={13} fontWeight={400} color={'grey'}>
            дата регистрации
          </Typography>
        </>
      ) : (
        <>
          <img
            alt='avatar'
            src={`/img/avatars/${profile.image}.png`}
            style={{ width: 80 }}
          />
          <Typography fontSize={16} fontWeight={500}>
            {profile?.nickname}
          </Typography>
        </>
      )}
    </Box>
  )
}

export default ProfileInfo
