import React, { Suspense, lazy } from 'react';
import { styled } from '@mui/material/styles';
import { LayoutType } from '@/types/wordpress';
import { wpText } from '@/utils/template';

import Container from '@mui/material/Container';
import ContentStyles from '@/components/ContentStyles';

const PostHero = lazy(() => import('@/components/PostHero'));
const PostContent = lazy(() => import('@/components/PostContent'));
const ScrollTop = lazy(() => import('@/components/ScrollTop'));

const MainContent = styled('main')(({ theme }) => ({
  display: 'block',
  gap: theme.spacing(4),
  width: '100%',
  [theme.breakpoints.up('md')]: { display: 'flex' }
}));

function LayoutHome({ page, headerPosts, contentPosts, loading = false }: LayoutType) {
  if (loading) return null;

  return (
    <>
      <Container id="site-content" sx={{ flexGrow: 1 }}>
        <ContentStyles id="content-wrapper">
          <Suspense fallback={null}>
            <PostHero title={ wpText(page.title) } posts={ headerPosts } />
          </Suspense>
          <MainContent role='main'>
            <Suspense fallback={null}>
              <PostContent posts={ contentPosts } content={ wpText(page.content) } />
            </Suspense>
          </MainContent>
        </ContentStyles>
      </Container>

      <Suspense fallback={null}>
        <ScrollTop />
      </Suspense>
    </>
  );
}

export default LayoutHome;
