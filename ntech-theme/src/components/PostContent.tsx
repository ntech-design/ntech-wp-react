import { PostType } from '@/types/wordpress';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import { safeHtml } from '@/utils/template';

import BlockRenderer from '@/components/BlockRenderer';

type PostContentProps = {
  content?: string;
  posts?: Array<PostType>;
}

const PostContentRoot = styled('div')({ flex: 4 });

export default function PostContent({ posts, content }: PostContentProps) {
  if (!posts && !content) {
    return (
      <PostContentRoot id="content-main">
        <Skeleton variant="text" width="95%" />
        <Skeleton variant="text" width="85%" />
        <Skeleton variant="text" width="90%" />
      </PostContentRoot>
    )
  }

  return (
    <PostContentRoot id="content-main">
      {content && (
        <div dangerouslySetInnerHTML={ safeHtml(content) } />
      )}

      {posts && posts.length > 0 && posts.map((post: PostType) => (
        <div key={ post.id } className="single-post-content" id={ post.slug }>
          {post?.editorBlocks && post.editorBlocks.length > 0 ? (
            <BlockRenderer blocks={ post.editorBlocks } />
          ) : (
            post.content && (
              <div dangerouslySetInnerHTML={ safeHtml(post.content) } />
            )
          )}
        </div>
      ))}

    </PostContentRoot>
  );
}