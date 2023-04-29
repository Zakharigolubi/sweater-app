import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './app/pages/LoginPage'
import RegisterPage from './app/pages/RegisterPage'
import PublicLayout from './app/layout/PublicLayout'
import PrivateLayout from './app/layout/PrivateLayout'
import MainPage from './app/pages/MainPage'
import ProfilePage from './app/pages/ProfilePage'
import BookmarkPage from './app/pages/BookmarkPage'
import { useSelector } from 'react-redux'

function App() {
  const auth = useSelector((state) => state.auth.auth)

  return (
    <BrowserRouter>
      {!auth ? (
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path='login' element={<LoginPage />} />
            <Route path='register' element={<RegisterPage />} />
            <Route path='*' element={<Navigate to='/login' />} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route element={<PrivateLayout />}>
            <Route path='main' element={<MainPage />} />
            <Route path='profile/:id' element={<ProfilePage />} />
            <Route path='bookmark' element={<BookmarkPage />} />
            <Route path='*' element={<Navigate to='/main' />} />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  )
}

export default App
