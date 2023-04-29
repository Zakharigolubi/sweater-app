import { createApi } from '@reduxjs/toolkit/query/react'
import { URL } from '../../constants/url'
import { baseQueryWithReauth } from '../baseQueryWithReauth'

export const likeApi = createApi({
  reducerPath: 'likeApi',
  tagTypes: ['Post'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    addLike: builder.mutation({
      query: (postId) => ({
        url: `${URL}/like/${postId}`,
        method: 'POST'
      }),
      invalidatesTags: ['Post']
    }),
    deleteLike: builder.mutation({
      query: (likeId) => ({
        url: `${URL}/like/${likeId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Post']
    })
  })
})

export const { useAddLikeMutation, useDeleteLikeMutation } = likeApi
