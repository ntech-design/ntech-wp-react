import { useLocation } from 'react-router-dom';
import { usePage } from '@/hooks/usePage';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { useScrollToHash } from '@/hooks/useScrollToHash';
import { resolveLayout } from '@/utils/template';
import ErrorPage from '@/pages/ErrorPage';
import NotFoundPage from '@/pages/NotFoundPage';

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