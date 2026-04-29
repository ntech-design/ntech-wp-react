import React, { Suspense, lazy } from 'react';
import DOMPurify from 'dompurify';
import { styled } from '@mui/material/styles';
import { PostType } from '@/types/wordpress';
import HtmlContent from '@/components/HtmlContent';

type PostHeaderProps = {
  id?: string;
  title: string;
  posts?: Array<PostType>;
  showHeader?: boolean;
}

const PostHeaderSocial = lazy(() => import('@/components/PostHeaderSocial'));
const PostHeaderRoot = styled('header')(({ theme }) => ({
  position: 'relative',
  border: '1px solid var(--mui-palette-post_header_color_border)',
  borderRadius: theme.shape.borderRadius,
  backgroundClip: 'padding-box',
  backgroundColor: 'var(--mui-palette-post_header_bg)',
  margin: theme.spacing(3, 0),
  [theme.breakpoints.up('sm')]: { height: 'calc(12.5rem + 2px)' },

  '.post-header__content': {
    padding: theme.spacing(4, 0, 4, 4),
    overflow: 'hidden',
    height: '100%',
    borderTopRightRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,

    'figure': {
      display: 'none',
      lineHeight: 0,
      margin: '-6.3em 0 0 auto',
      [theme.breakpoints.up('sm')]: { display: 'inline-block' },

      'img': { width: '13.75rem' }
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
          <div key={post.id} style={{ display: 'flex', width: '100%' }}>
            <HtmlContent html={ post.content } />
          </div>
        ))}
      </div>
      <Suspense fallback={null}>
        <PostHeaderSocial/>
      </Suspense>
    </PostHeaderRoot>
  );
}
