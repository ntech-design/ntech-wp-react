import React from 'react';
import DOMPurify from 'dompurify';
import { styled } from '@mui/material/styles';
import { PostType } from '@/types/wordpress';
import PostHeaderSocial from '@/components/PostHeaderSocial';
import { safeHtml } from '@/utils/template';

type PostHeaderProps = {
  id?: string;
  title: string;
  posts?: Array<PostType>;
  showHeader?: boolean;
}

const PostHeaderRoot = styled('header')(({ theme }) => ({
  position: 'relative',
  border: '1px solid var(--mui-palette-post_header_color_border)',
  borderRadius: theme.shape.borderRadius,
  backgroundClip: 'padding-box',
  backgroundColor: 'var(--mui-palette-post_header_bg)',
  margin: theme.spacing(3, 0),
  [theme.breakpoints.up('sm')]: { height: 'calc(12.5rem + 2px)' },

  '.post-header__content': {
    padding: theme.spacing(4),
    overflow: 'hidden',
    'figure': {
      display: 'none',
      position: 'relative',
      flex: '0 0 auto',
      right: theme.spacing(-4),
      top: 0,
      padding: 0,
      borderTopRightRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
      overflow: 'hidden',
      lineHeight: 0,
      textAlign: 'right',
      marginTop: theme.spacing(-12.5),
      marginBottom: theme.spacing(-4),
      marginLeft: 'auto',
      [theme.breakpoints.up('sm')]: { display: 'block' },

      'img': { width: '13.45rem' }
    },
  },
}));

const PostHeaderHeadline = styled('header')({});

export default function PostHeader({ id = 'content-header', title, posts, showHeader = true }: PostHeaderProps) {
  if (!showHeader) {
    return (
      <PostHeaderHeadline>
        <h1>{ DOMPurify.sanitize(title) }</h1>
      </PostHeaderHeadline>
    );
  }

  return (
    <PostHeaderRoot id={id}>
      <div className='post-header__content'>
        <h1>{ DOMPurify.sanitize(title) }</h1>

        {posts?.map((post: PostType) => (
          <div
            style={{ display: 'flex', width: '100%' }}
            key={post.id}
            dangerouslySetInnerHTML={ safeHtml(post.content) }
          />
        ))}
      </div>
      <PostHeaderSocial/>
    </PostHeaderRoot>
  );
}
