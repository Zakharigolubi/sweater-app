import { createApi } from '@reduxjs/toolkit/query/react'
import { URL } from '../../constants/url'
import { baseQueryWithReauth } from '../baseQueryWithReauth'

export const postApi = createApi({
  reducerPath: 'postApi',
  tagTypes: ['Post'],
  keepUnusedDataFor: 0,
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: (params) => ({
        url: params.id
          ? `${URL}/post?type=${params.type}&userId=${params.id}`
          : `${URL}/post?type=${params.type}`
      }),
      providesTags: ['Post']
    }),
    addPost: builder.mutation({
      query: (post) => ({
        url: `${URL}/post`,
        method: 'POST',
        body: post
      }),
      invalidatesTags: ['Post']
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `${URL}/post/${postId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Post']
    })
  })
})

export const {
  useGetAllPostsQuery,
  useAddPostMutation,
  useDeletePostMutation
} = postApi
