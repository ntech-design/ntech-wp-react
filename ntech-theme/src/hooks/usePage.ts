import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client/react';
import { useMemo } from 'preact/compat';
import { GET_PAGE_WITH_POSTS } from '@/apollo/queries/content';
import { PageWithPostsDataType, PostType } from '@/types/wordpress';

export const usePage = (slug?: string) => {
  const { slug: routeSlug } = useParams();
  const slugParam = slug ?? routeSlug ?? 'home';
  const routeKey = location.pathname;
  const queryVariables = useMemo(() => ({
    pageId: slugParam,
    category: slugParam
  }), [slugParam]);

  const { data, loading, error } = useQuery<PageWithPostsDataType>(
    GET_PAGE_WITH_POSTS,
    {
      variables: queryVariables,
      context: { routeKey, slug },
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true
    }
  );

  const page = data?.page;
  const posts = data?.posts?.nodes || [];
  const getPostsByPlacement = (posts: PostType[], placement: string) =>
    posts.filter(post =>
      post.postLayout?.placement?.includes(placement)
    );

  const headerPosts = getPostsByPlacement(posts, 'header');
  const contentPosts = getPostsByPlacement(posts, 'content');
  const sidebarPosts = getPostsByPlacement(posts, 'sidebar');

  return {
    page,
    posts,
    headerPosts,
    contentPosts,
    sidebarPosts,
    loading,
    error,
    slug: slugParam,
  };
};
