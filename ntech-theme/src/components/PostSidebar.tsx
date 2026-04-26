import React from 'react';
import { PostType } from '@/types/wordpress';
import { styled } from '@mui/material/styles';
import { safeHtml } from '@/utils/template';
import BlockRenderer from '@/components/BlockRenderer';

type PostSidebarProps = {
  posts: Array<PostType>;
}

const PostSidebarRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(4),
  flexWrap: 'wrap',
  flex: 1,
  minWidth: '13.438rem',
  [theme.breakpoints.up('md')]: { display: 'block', maxWidth: '13.438rem' },
  '> div': { flex: 'auto' }
}));

export default function PostSidebar({ posts }: PostSidebarProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <PostSidebarRoot id="content-sidebar">
      {posts.map((post: PostType) => (
        <div key={post.id} id={post.slug}>
          { post?.editorBlocks && post.editorBlocks.length > 0 ? (
            <BlockRenderer blocks={post.editorBlocks} />
          ) : (
            post.content && (
              <div dangerouslySetInnerHTML={ safeHtml(post.content) } />
            )
          )}
        </div>
      ))}
    </PostSidebarRoot>
  );
}
