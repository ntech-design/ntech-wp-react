import { styled } from '@mui/material/styles';
import { LayoutType } from '@/types/wordpress';
import { wpText } from '@/utils/template';

import Container from '@mui/material/Container';
import ScrollTop from '@/components/ScrollTop';
import PostSidebar from '@/components/PostSidebar';
import PostContent from '@/components/PostContent';
import PostHeader from '@/components/PostHeader';
import ContentStyles from '@/components/ContentStyles';

const MainContent = styled('main')(({ theme }) => ({
  display: 'block',
  gap: theme.spacing(4),
  width: '100%',
  [theme.breakpoints.up('md')]: { display: 'flex' }
}));

function LayoutStatic({ page, headerPosts, contentPosts, sidebarPosts, loading = false }: LayoutType) {
  if (loading) return null;

  return (
    <>
      <Container id="site-content" sx={{ flexGrow: 1 }}>
        <ContentStyles id="content-wrapper">
          <PostHeader title={ wpText(page.title) } posts={ headerPosts } showHeader={ false } />
          <MainContent role='main'>
            <PostContent posts={ contentPosts } content={ wpText(page.content) } />
            <PostSidebar posts={ sidebarPosts } />
          </MainContent>
        </ContentStyles>
      </Container>

      <ScrollTop />
    </>
  );
}

export default LayoutStatic;
