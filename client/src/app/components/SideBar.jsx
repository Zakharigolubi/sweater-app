import React from 'react'
import { Box, Button, IconButton, Stack } from '@mui/material'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import SettingsIcon from '@mui/icons-material/Settings'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../store/auth/auth.slice'
import ProfileInfo from './profile/ProfileInfo'
import { authApi } from '../store/auth/auth.api'
import { useGetProfileQuery, userApi } from '../store/user/user.api'

const menuButtons = [
  {
    variant: 'text',
    startIcon: <AutoAwesomeIcon />,
    title: 'главная',
    path: '/main'
  },
  {
    variant: 'text',
    startIcon: <LocalFireDepartmentIcon />,
    title: 'избранное',
    path: '/bookmark'
  },
  {
    variant: 'text',
    startIcon: <SettingsIcon />,
    title: 'профиль',
    path: '/profile'
  }
]

const SideBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data: user } = useGetProfileQuery()

  const handleLogout = () => {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    dispatch(authApi.util.resetApiState())
    dispatch(userApi.util.resetApiState())
    dispatch(logout())
  }

  const handleNavigate = (path) => {
    if (path === '/profile') {
      navigate(`/profile/${user.userId}`)
    } else {
      navigate(path)
    }
  }

  return (
    <Box
      sx={{ width: '23%', position: 'sticky', top: 40 }}
      borderRight={'1px solid #c4c4be'}
    >
      <Box height={'calc(100vh - 120px)'} padding={'20px'}>
        <Stack justifyContent={'space-between'} height={'100%'}>
          <ProfileInfo moreInfo={false} />

          <Box>
            <Box mb={'80px'}>
              {menuButtons.map((btn) => (
                <Box key={btn.title}>
                  <Button
                    onClick={() => handleNavigate(btn.path)}
                    variant={btn.variant}
                    startIcon={btn.startIcon}
                    sx={{
                      textTransform: 'lowercase',
                      borderRadius: '20px',
                      padding: '5px 16px',
                      fontSize: '16px'
                    }}
                  >
                    {btn.title}
                  </Button>
                </Box>
              ))}
            </Box>

            <Stack direction={'row'} mt={'10px'}>
              <IconButton onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}

export default SideBar
