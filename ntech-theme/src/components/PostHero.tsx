import React from 'react';
import { styled } from '@mui/material/styles';
import { PostType } from '@/types/wordpress';
import PostHeaderSocial from '@/components/PostHeaderSocial';
import { safeHtml } from '@/utils/template';

type PostHeroProps = {
  id?: string;
  title: string;
  posts?: Array<PostType>;
}

const PostHeroRoot = styled('header')(({ theme }) => ({
  position: 'relative',
  border: '1px solid var(--mui-palette-post_header_color_border)',
  borderRadius: theme.shape.borderRadius,
  backgroundClip: 'padding-box',
  backgroundColor: 'var(--mui-palette-post_header_bg)',
  margin: theme.spacing(3, 0),
  padding: theme.spacing(4,5),

  h1: {
    ...theme.typography.overline,
    fontWeight: 700,
    lineHeight: 1,
  },

  '.wp-block-columns': {
    display: 'flex',
    alignItems: 'flex-start',
    [theme.breakpoints.up('sm')]: { gap: theme.spacing(4) },
    [theme.breakpoints.up('md')]: { justifyContent: 'flex-start' },

    '.wp-block-column': {
      textAlign: 'center',
      flex: 1,
      width: '100%',
      [theme.breakpoints.up('sm')]: { textAlign: 'left' },

      '&.post-hero__image': {
        minWidth: '11.25rem',
        [theme.breakpoints.up('sm')]: { width: 'auto' },
        'img': { width: '100%', maxWidth: '150%' },
      },
      '&.post-hero__aside': {
        flex: '0 1 auto',
        order: 2,
        [theme.breakpoints.between('sm', 'md')]: { order: 1 },
        [theme.breakpoints.up('sm')]: { width: 'auto', textAlign: 'left' },
        '> p': { marginTop: 0 }
      },
      '&.post-hero__content': {
        flex: '1 1 100%',
        order: 1,
        [theme.breakpoints.between('sm', 'md')]: { order: 2 },
        [theme.breakpoints.up('md')]: { flex: 1, textAlign: 'left' },
      },
    }
  },
}));

export default function PostHero({ id = 'content-header', posts }: PostHeroProps) {
  return (
    <PostHeroRoot id={id}>
      <div className='post-hero'>
        {posts?.map((post: PostType) => (
          <div
            key={post.id}
            dangerouslySetInnerHTML={ safeHtml(post.content) }
          />
        ))}
      </div>
      <PostHeaderSocial position="right" width={250} />
    </PostHeroRoot>
  );
}
