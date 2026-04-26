import React from 'react';
import { Suspense } from 'react';
import { ApolloProvider } from '@apollo/client/react';
import client from '@/apollo/client';
import { styled } from "@mui/material/styles";

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { theme as baseTheme } from '@/themes';
import { ThemeProvider } from '@mui/material/styles';
import ErrorBoundary from '@/components/ErrorBoundary';
import LinearProgress from '@mui/material/LinearProgress'
import CssBaseline from '@mui/material/CssBaseline';

import NotFoundPage from '@/pages/NotFoundPage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { AnimatePresence, motion } from 'framer-motion';

const Page = React.lazy(() => import('@/components/Page'));

const Layout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: 'calc(100dvh - 29.75rem)',
  backgroundColor: 'var(--mui-palette-background-default)',
  [theme.breakpoints.up('sm')]: { minHeight: 'calc(100dvh - 7.55rem)' },
}));

function AppRoutes() {
  const location = useLocation();

  return (
    <Suspense fallback={<LinearProgress />}>
      <ErrorBoundary>
        <Layout id="site-layout">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              style={{
                backgroundColor: 'var(--mui-palette-background-default)',
                width: '100%',
                flexGrow: 1,
              }}
            >
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Page />} />
                <Route path="/:slug" element={<Page />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </Layout>
      </ErrorBoundary>
    </Suspense>
  );
}

export default function App() {
  return (
    <>
      <InitColorSchemeScript defaultMode="system" />

      <ThemeProvider theme={ baseTheme } defaultMode="system" modeStorageKey="mui-color-scheme">
        <CssBaseline />
        <ApolloProvider client={ client }>
          <BrowserRouter>
            <Header />
            <AppRoutes />
            <Footer />
          </BrowserRouter>
        </ApolloProvider>
      </ThemeProvider>
    </>
  );
}
