import { createApi } from '@reduxjs/toolkit/query/react'
import { URL } from '../../constants/url'
import { baseQueryWithReauth } from '../baseQueryWithReauth'

export const commentApi = createApi({
  reducerPath: 'commentApi',
  tagTypes: ['Comment'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (postId) => ({
        url: `${URL}/comment/${postId}`
      }),
      providesTags: ['Comment']
    }),

    addComment: builder.mutation({
      query: (comment) => ({
        url: `${URL}/comment/${comment.postId}`,
        method: 'POST',
        body: { content: comment.content, secret: comment.secret }
      }),
      invalidatesTags: ['Comment']
    }),

    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `${URL}/comment/${commentId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Comment']
    })
  })
})

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation
} = commentApi
