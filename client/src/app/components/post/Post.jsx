import React, { useState } from 'react'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import ShortTextIcon from '@mui/icons-material/ShortText'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import Comments from '../comment/Comments'
import { displayDate } from '../../utils/DisplayDate'
import DeleteIcon from '@mui/icons-material/Delete'
import { useGetProfileQuery } from '../../store/user/user.api'
import { useDeletePostMutation } from '../../store/post/post.api'
import { red, yellow } from '@mui/material/colors'
import {
  useAddBookmarkMutation,
  useDeleteBookmarkMutation
} from '../../store/bookmark/bookmark.api'
import { useNavigate } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite'
import {
  useAddLikeMutation,
  useDeleteLikeMutation
} from '../../store/like/like.api'

const Post = ({ type, post, refetch }) => {
  const navigate = useNavigate()
  const { data: profile } = useGetProfileQuery()
  const [deletePostQuery, { isLoading }] = useDeletePostMutation()
  const [addBookmark, { isLoading: addBookmarkLoading }] =
    useAddBookmarkMutation()
  const [deleteBookmark, { isLoading: deleteBookmarkLoading }] =
    useDeleteBookmarkMutation()
  const [addLike, { isLoading: addLikeLoading }] = useAddLikeMutation()
  const [deleteLike, { isLoading: deleteLikeLoading }] = useDeleteLikeMutation()
  const [commentsVisibility, setCommentsVisibility] = useState(false)

  const toggleComments = () => {
    setCommentsVisibility((prev) => !prev)
  }

  const handleDelete = async () => {
    try {
      await deletePostQuery(post._id)
    } catch (error) {}
  }

  const handleDeleteBookmark = async () => {
    try {
      await deleteBookmark(post.bookmark).unwrap()
      refetch()
    } catch (error) {}
  }

  const handleAddBookmark = async () => {
    try {
      await addBookmark(post._id).unwrap()
      refetch()
    } catch (error) {}
  }

  const handleAddLike = async () => {
    try {
      await addLike(post._id).unwrap()
      refetch()
    } catch (error) {}
  }

  const handleDeleteLike = async () => {
    try {
      await deleteLike(post.like).unwrap()
      refetch()
    } catch (error) {}
  }

  const navigateToUserPage = () => {
    navigate(`/profile/${post.userId._id}`)
  }

  return (
    <Box mb={2} pb={1} sx={{ borderBottom: '1px solid #c4c4be' }}>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        {post.secret ? (
          <Stack direction={'row'} alignItems={'center'}>
            <img
              src='/img/sweater.png'
              alt='default avatar'
              style={{
                width: 50,
                marginBottom: 2,
                marginRight: 2
              }}
            />
            <Typography fontSize={18} fontWeight={500}>
              секрет
            </Typography>
          </Stack>
        ) : (
          <Stack
            direction={'row'}
            alignItems={'center'}
            sx={{ cursor: 'pointer' }}
            onClick={navigateToUserPage}
          >
            <img
              alt='avatar'
              src={`/img/avatars/${post.userId.image}.png`}
              style={{
                width: 50,
                marginBottom: 2,
                marginRight: 2
              }}
            />

            <Typography fontSize={18} fontWeight={500}>
              {post.userId.nickname}
            </Typography>
          </Stack>
        )}
        <Stack direction={'row'} alignItems={'center'}>
          <Typography>{displayDate(post.createdAt)} </Typography>
          {profile?.userId === post.userId._id && (
            <IconButton onClick={handleDelete} disabled={isLoading}>
              <DeleteIcon fontSize='small' />
            </IconButton>
          )}
        </Stack>
      </Stack>

      <Typography marginRight={0}>{post.content}</Typography>

      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Stack direction={'row'}>
          {type !== 'profile' && (
            <>
              {type === 'all' && (
                <Stack direction={'row'} alignItems={'center'}>
                  <Typography>{post.likesCount}</Typography>
                  {post.like ? (
                    <IconButton
                      onClick={handleDeleteLike}
                      disabled={deleteLikeLoading}
                    >
                      <FavoriteIcon sx={{ color: red[400] }} />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={handleAddLike}
                      disabled={addLikeLoading}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  )}
                </Stack>
              )}

              <Box>
                {post.bookmark ? (
                  <IconButton
                    onClick={handleDeleteBookmark}
                    disabled={deleteBookmarkLoading}
                  >
                    <LocalFireDepartmentIcon sx={{ color: yellow[900] }} />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={handleAddBookmark}
                    disabled={addBookmarkLoading}
                  >
                    <LocalFireDepartmentIcon />
                  </IconButton>
                )}
              </Box>
            </>
          )}
          {!post.disComment && (
            <IconButton onClick={toggleComments}>
              <ShortTextIcon />
            </IconButton>
          )}
        </Stack>
      </Stack>

      {commentsVisibility && <Comments postId={post._id} />}
    </Box>
  )
}

export default Post
