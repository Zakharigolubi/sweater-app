import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL } from '../../constants/url'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: `${URL}/auth/register`,
        method: 'POST',
        body: user
      })
    }),
    login: builder.mutation({
      query: (user) => ({
        url: `${URL}/auth/login`,
        method: 'POST',
        body: user
      })
    })
  })
})

export const { useRegisterMutation, useLoginMutation } = authApi
