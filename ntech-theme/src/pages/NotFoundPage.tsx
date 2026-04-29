import React, { Suspense, lazy } from 'react';
import { usePage } from '@/hooks/usePage';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import ContentStyles from '@/components/ContentStyles';
import { safeHtml } from '@/utils/template';

const Search = lazy(() => import('@/components/Search'));
const MainContent = styled('main')({
  display: 'block',
  width: '100%',
});

function NotFoundPage() {
  const { page, loading } = usePage('notfound');

  if (loading) return null;

  return (
    <Container sx={{ flexGrow: 1 }}>
      <ContentStyles>
        <MainContent role="main">
          {page ? (
            <div dangerouslySetInnerHTML={ safeHtml(page.content) ?? '' } />
          ) : (
            <>
              <h1>404</h1>
              <p>Page not found.</p>
            </>
          )}

          <Suspense fallback={null}>
            <Search />
          </Suspense>
        </MainContent>
      </ContentStyles>
    </Container>
  );
}

export default NotFoundPage;
