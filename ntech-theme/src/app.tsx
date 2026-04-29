import React, { Suspense, lazy, useState, useCallback, ReactNode } from 'react';
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

const Page = lazy(() => import('@/components/Page'));

const Layout = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'var(--mui-palette-background-default)',
});

function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      style={{
        height: '100%'
      }}
    >
      {children}
    </motion.div>
  )
}

function AppRoutes() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [pendingLocation, setPendingLocation] = useState<typeof location | null>(null);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  React.useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setPendingLocation(location);
    }
  }, [location, displayLocation]);

  const handlePageReady = useCallback(() => {
    if (pendingLocation) {
      setDisplayLocation(pendingLocation);
      setPendingLocation(null);
    }
  }, [pendingLocation]);

  React.useEffect(() => {
    let delayTimer: ReturnType<typeof setTimeout>;

    setShowLoader(true);
    if (!pendingLocation) {
      delayTimer = setTimeout(() => { setShowLoader(false); }, 300);
    }

    return () => {
      clearTimeout(delayTimer);
    };
  }, [pendingLocation]);

  return (
    <ErrorBoundary>
      {/* Global Route Loader */}
      <AnimatePresence mode="wait">
        {showLoader && (
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

      <Layout style={{ width: '100%', flex: 1 }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <Suspense fallback={null}>
                <PageWrapper>
                  <Page onReady={handlePageReady} />
                </PageWrapper>
              </Suspense>
            } />
            <Route path="/:slug" element={
              <Suspense fallback={null}>
                <PageWrapper>
                  <Page onReady={handlePageReady} />
                </PageWrapper>
              </Suspense>
            } />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </Layout>
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
            <Layout id="site-layout" style={{ minHeight: '100dvh' }}>
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
