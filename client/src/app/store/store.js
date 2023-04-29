import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/auth.slice'
import { authApi } from './auth/auth.api'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { userApi } from './user/user.api'
import { postApi } from './post/post.api'
import { commentApi } from './comment/comment.api'
import { bookmarkApi } from './bookmark/bookmark.api'
import { likeApi } from './like/like.api'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [bookmarkApi.reducerPath]: bookmarkApi.reducer,
    [likeApi.reducerPath]: likeApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(
      authApi.middleware,
      userApi.middleware,
      postApi.middleware,
      commentApi.middleware,
      bookmarkApi.middleware,
      likeApi.middleware
    )
})

setupListeners(store.dispatch)
