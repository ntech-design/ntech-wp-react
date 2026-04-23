import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

type ScrollTopProps = {
  visible: boolean;
}

const IconWrapper = styled('i')(({ theme }) => ({
  position: 'absolute',
  display: 'flex',
  right: '.65rem',
  top: '0.35rem',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(to bottom, ${theme.palette.grey[900]} 10%, ${theme.palette.grey[500]} 90%)`,
  borderRadius: '50%',
  'svg': {
    position: 'relative',
    backgroundColor: theme.palette.grey[900],
    borderRadius: '50%',
    margin: '1px',
    width: '1rem',
    height: '1rem'
  }
}));

const ButtonTop = styled('button', {
  shouldForwardProp: (prop) => prop !== 'visible'
})<ScrollTopProps>(({ theme, visible }) => ({
  position: 'fixed',
  display: 'block',
  left: '50%',
  fontSize: '0.75rem',
  lineHeight: '1.3rem',
  whiteSpace: 'nowrap',
  background: `linear-gradient(to bottom, ${theme.palette.scroll_top_bg} 0%, ${theme.palette.scroll_top_gradient} 100%)`,
  backdropFilter: 'blur(5px) saturate(200%)',
  borderStyle: 'solid',
  borderWidth: '1px',
  borderTopColor: theme.palette.grey[500],
  borderBottomColor: theme.palette.grey[900],
  borderLeftColor: theme.palette.grey[700],
  borderRightColor: theme.palette.grey[700],
  borderRadius: theme.shape.borderRadius,
  backgroundClip: 'padding-box',
  boxShadow: theme.shadows[5],
  transition: 'opacity 0.4s ease 0s, transform 0.4s ease',
  textShadow: '-1px -1px 1px rgba(0, 0, 0, 0.8)',
  opacity: visible ? 0.5 : 0,
  textTransform: 'uppercase',
  bottom: theme.spacing(3),
  transform: visible ? 'translate(-50%, 0)' : `translate(-50%, ${theme.spacing(0.5)})`,
  color: theme.palette.primary.contrastText,
  cursor: 'pointer',
  outline: '0 none',
  padding: theme.spacing(0.5, 5, 0.5, 1.5),
  zIndex: 1000,
  overflow: 'hidden',
  pointerEvents: visible ? 'auto' : 'none',
  '&:hover, &:active': { opacity: visible ? 1 : 0 }
}));

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const SHOW_THRESHOLD = 500;
    let lastY = window.scrollY;
    let startY = 0;
    const UP_DELTA = 20;

    const handleScroll = () => {
      const y = window.scrollY;

      if (y < lastY && y > SHOW_THRESHOLD) {
        if (startY === 0) startY = lastY;

        if (startY - y >= UP_DELTA) {
          setVisible(true);
        }
      } else {
        startY = 0;

        if (y < SHOW_THRESHOLD || y >= lastY) {
          setVisible(false);
        }
      }

      lastY = y;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ButtonTop id="site-scroll-up" visible={visible} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} tabIndex={-1}>
      To top
      <IconWrapper>
        <ArrowDropUpIcon fontSize="small" />
      </IconWrapper>
    </ButtonTop>
  );
}
