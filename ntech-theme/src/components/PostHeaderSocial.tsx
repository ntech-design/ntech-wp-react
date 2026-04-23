import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

type StyledProps = {
  height?: number;
  width?: number;
  position?: 'left' | 'right';
};

const Root = styled('div')({});

export default function PostHeaderSocial({ position = 'left', height = 35, width = 240 }: StyledProps) {
  return (
    <Root
      sx={(theme) => ({
        position: 'absolute',
        bottom: '-1px',
        left: position === 'left' ? '-1px' : 'auto',
        right: position === 'right' ? '-1px' : 'auto',
        height: `${height}px`,
        width: `${width}px`,
        backgroundColor: 'var(--mui-palette-background-default)',
        borderTop: '5px solid var(--mui-palette-post_header_color_border)',
        display: 'none',
        justifyContent: position === 'right' ? 'flex-end' : 'flex-start',
        gap: theme.spacing(1),
        pt: theme.spacing(1),
        [theme.breakpoints.up('sm')]: { display: 'flex' },
        '&::before, &::after': {
          content: '""',
          position: 'absolute',
        },
        '&::before': {
          top: '1px',
          left: position === 'right' ? 'auto' : 0,
          right: position === 'right' ? 0 : 'auto',
          width: '100%',
          height: '2px',
          backgroundColor: 'var(--mui-palette-post_header_color_border)',
        },
        '&::after': {
          bottom: 0,
          backgroundColor: 'var(--mui-palette-post_header_bg)',
          width: `${height}px`,
          height: `${height}px`,

          ...(position === 'left'
            ? {
              right: `${height / 2 * -1}px`,
              transform: 'skewX(40deg)',
              borderBottom: '1px solid var(--mui-palette-post_header_color_border)',
              borderLeft: '1px solid var(--mui-palette-post_header_color_border)',
            }
            : {
              left: `${height / 2 * -1}px`,
              transform: 'skewX(-40deg)',
              borderBottom: '1px solid var(--mui-palette-post_header_color_border)',
              borderRight: '1px solid var(--mui-palette-post_header_color_border)',
            }),
        }
      })}
    >
      <Link to="#" target="_blank" title="GitHub Profile" className="social-btn social-btn--sm github"></Link>
      <Link to="#" target="_blank" title="Xing Profile" className="social-btn social-btn--sm xing"></Link>
      <Link to="#" target="_blank" title="LinkedIn Profile" className="social-btn social-btn--sm linkedin"></Link>
    </Root>
  );
}
