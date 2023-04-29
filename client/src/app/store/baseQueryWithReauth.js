import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { login, logout } from './auth/auth.slice'
import { URL } from '../constants/url'

const prepareHeaders = (headers) => {
  const accessToken = localStorage.getItem('access')
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`)
  }
  return headers
}

const baseQuery = fetchBaseQuery({
  prepareHeaders: prepareHeaders
})

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: `${URL}/auth/token`,
        method: 'POST',
        body: { refreshToken: localStorage.getItem('refresh') }
      },
      api,
      extraOptions
    )
    if (refreshResult.data) {
      localStorage.setItem('access', refreshResult.data.accessToken)
      localStorage.setItem('refresh', refreshResult.data.refreshToken)
      api.dispatch(login())
      result = await baseQuery(args, api, extraOptions)
    } else {
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      api.dispatch(logout())
    }
  }
  return result
}
