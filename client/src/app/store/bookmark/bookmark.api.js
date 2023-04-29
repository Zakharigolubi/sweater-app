import { createApi } from '@reduxjs/toolkit/query/react'
import { URL } from '../../constants/url'
import { baseQueryWithReauth } from '../baseQueryWithReauth'

export const bookmarkApi = createApi({
  reducerPath: 'bookmarkApi',
  tagTypes: ['Post'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    addBookmark: builder.mutation({
      query: (postId) => ({
        url: `${URL}/bookmark/${postId}`,
        method: 'POST'
      }),
      invalidatesTags: ['Post']
    }),
    deleteBookmark: builder.mutation({
      query: (bookmarkId) => ({
        url: `${URL}/bookmark/${bookmarkId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Post']
    })
  })
})

export const { useAddBookmarkMutation, useDeleteBookmarkMutation } = bookmarkApi
