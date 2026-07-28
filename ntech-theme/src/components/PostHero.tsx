import { Suspense, lazy } from 'preact/compat';
import { styled } from '@mui/material/styles';
import { PostType } from '@/types/wordpress';
import Skeleton from '@mui/material/Skeleton';
import HtmlContent from "@/components/HtmlContent";

type PostHeroProps = {
  id?: string;
  title: string;
  posts?: Array<PostType>;
}

const PostHeaderSocial = lazy(() => import('@/components/PostHeaderSocial'));
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
  if (!posts) return (
    <PostHeroRoot id={ id }>
      <div className='post-hero'>
        <div class="wp-block-columns is-layout-flex wp-block-columns-is-layout-flex" style={{ flexWrap: 'wrap' }}>
          <div class="wp-block-column post-hero__image is-layout-flow wp-block-column-is-layout-flow">
            <div class="wp-block-image size-full"  style={{ width: '100%', flexGrow: 0 }}>
              <Skeleton variant="rectangular" height={ 333 } sx={{ mb: 2 }} />
            </div>
          </div>

          <div class="wp-block-column post-hero__aside is-layout-flow wp-block-column-is-layout-flow" style={{ flexGrow: 1 }}>
            <Skeleton variant="text" width="50%" />
            <Skeleton variant="text" width="100%" sx={{ mb: 2 }} />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="30%" sx={{ mb: 2 }} />
            <Skeleton variant="text" width="75%" />
            <Skeleton variant="text" width="85%" />
          </div>

          <div class="wp-block-column post-hero__content is-layout-flow wp-block-column-is-layout-flow" style={{ flexGrow: 1 }}>
            <Skeleton variant="text" height={ 60 } width="60%" sx={{ mb: 1 }} />
            <Skeleton variant="text" height={ 30 } width="80%"/>
            <Skeleton variant="text" height={ 30 } width="70%" sx={{ mb: 2 }} />
            <Skeleton variant="text" width="95%" />
            <Skeleton variant="text" width="85%" />
            <Skeleton variant="text" width="90%" />
            <Skeleton variant="text" width="75%" sx={{ mb: 2 }} />
            <Skeleton variant="text" width="65%" sx={{ mb: 2 }} />
          </div>
        </div>
      </div>
      <Suspense fallback={ null }>
        <PostHeaderSocial position="right" width={ 250 } />
      </Suspense>
    </PostHeroRoot>
  );

  return (
    <PostHeroRoot id={ id }>
      <div className='post-hero'>
        {posts?.map((post: PostType) => (
          <div key={ post.id }>
            <HtmlContent html={ post.content } />
          </div>
        ))}
      </div>
      <Suspense fallback={ null }>
        <PostHeaderSocial position="right" width={ 250 } />
      </Suspense>
    </PostHeroRoot>
  );
}
