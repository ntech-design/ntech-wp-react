import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePage } from '@/hooks/usePage';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { useScrollToHash } from '@/hooks/useScrollToHash';
import { resolveLayout, wpText } from '@/utils/template';
import ErrorPage from '@/pages/ErrorPage';
import NotFoundPage from '@/pages/NotFoundPage';
import DOMPurify from 'dompurify';

const Page = () => {
  const location = useLocation();
  useScrollToTop();
  useScrollToHash(location.hash);

  const {
    page,
    headerPosts,
    contentPosts,
    sidebarPosts,
    loading,
    error,
  } = usePage();

  /**
   * Document Title
   */
  useEffect(() => {
    if (loading) {
      document.title = 'Loading...';
    } else if (page?.title) {
      document.title = DOMPurify.sanitize(wpText(page.title));
    }
  }, [loading, page]);

  /**
   * Guards
   */
  if (loading) return null;
  if (error) return <ErrorPage error={error} />;
  if (!page) return <NotFoundPage />;

  const LayoutComponent = resolveLayout(page.wpTemplate);

  return (
    <LayoutComponent
      page={page}
      headerPosts={headerPosts}
      contentPosts={contentPosts}
      sidebarPosts={sidebarPosts}
      loading={loading}
    />
  );
};

export default Page;