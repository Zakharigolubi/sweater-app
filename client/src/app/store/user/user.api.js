import { createApi } from '@reduxjs/toolkit/query/react'
import { URL } from '../../constants/url'
import { baseQueryWithReauth } from '../baseQueryWithReauth'

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['Profile'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: `${URL}/user/profile`
      }),
      providesTags: ['Profile']
    }),
    getAnotherProfile: builder.query({
      query: (userId) => ({
        url: `${URL}/user/profile/${userId}`
      })
    }),
    editProfile: builder.mutation({
      query: (user) => ({
        url: `${URL}/user/${user?.id}`,
        method: 'PATCH',
        body: { status: user.status, image: user.image }
      }),
      invalidatesTags: ['Profile']
    })
  })
})

export const {
  useGetProfileQuery,
  useGetAnotherProfileQuery,
  useEditProfileMutation
} = userApi
