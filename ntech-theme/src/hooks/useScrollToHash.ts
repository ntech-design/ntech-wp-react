import { useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function getHeaderOffset(): number {
  const header = document.querySelector('#site-header');
  return header ? header.getBoundingClientRect().height : 0;
}

export function useScrollToHash(hash: string, offset = 0) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  useEffect(() => {
    if (!hash) return;

    const id = hash.replace('#', '');

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (!el) return false;

      const y =
        el.getBoundingClientRect().top +
        window.scrollY -
        (isDesktop ? getHeaderOffset() + offset : 0);

      window.scrollTo({
        top: y,
        behavior: 'smooth',
      });

      return true;
    };

    let attempts = 0;

    const interval = setInterval(() => {
      attempts++;

      if (tryScroll() || attempts > 10) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [hash, isDesktop, offset]);
}