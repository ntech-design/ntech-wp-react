import React from 'react';
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

const Layout = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100dvh',
  backgroundColor: 'var(--mui-palette-background-default)',
});

function AppRoutes() {
  const location = useLocation();
  const [isRouteChanging, setIsRouteChanging] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsRouteChanging(true);

    const timer = setTimeout(() => {
      setIsRouteChanging(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <ErrorBoundary>
      {/* Global Route Loader */}
      <AnimatePresence>
        {isRouteChanging && (
          <motion.div
            key="route-loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 9999,
            }}
          >
            <LinearProgress color="primary" sx={{ height: '3px', backgroundColor: 'transparent' }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Transition mit AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'var(--mui-palette-background-default)',
            width: '100%',
            flex: 1,
          }}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Page />} />
            <Route path="/:slug" element={<Page />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </ErrorBoundary>
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
            <Layout id="site-layout">
              <Header />
              <AppRoutes />
              <Footer />
            </Layout>
          </BrowserRouter>
        </ApolloProvider>
      </ThemeProvider>
    </>
  );
}
