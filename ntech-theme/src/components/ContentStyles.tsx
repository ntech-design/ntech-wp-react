import { styled } from '@mui/material/styles';
import shadow from '@/assets/images/shadow_button.png'
import icon_xing from '@/assets/icons/xing.svg?url';
import icon_linkedin from '@/assets/icons/linkedin.svg?url';
import icon_github from '@/assets/icons/github.svg?url';

const ContentWrapper = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { margin: theme.spacing(0, 3) },

  // Typography
  h1: {
    ...theme.typography.h1,
    fontWeight: theme.typography.fontWeightBold,
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: theme.spacing(3, 0, 3, 0)
  },
  h2: theme.typography.h2,
  h3: {
    ...theme.typography.h3,
    fontWeight: theme.typography.fontWeightMedium,
    margin: theme.spacing(1, 0),
    color: theme.palette.primary.main,
  },
  h4: {
    ...theme.typography.h4,
    margin: 0,
    color: 'var(--mui-palette-text-secondary)',
  },
  h5: theme.typography.h5,
  h6: theme.typography.h6,

  // Content Elements
  p: {
    ...theme.typography.body1,
    margin: theme.spacing(1, 0, 3, 0),
  },

  ul: {
    ...theme.typography.body1,
    listStyleType: 'square',
    padding: 0,
    margin: theme.spacing(1, 0, 3, 0),

    li: {
      paddingLeft: theme.spacing(1),
      marginLeft: `calc(${theme.spacing(2)} + 1px)`,
      marginBottom: theme.spacing(0.5),
    },

    '&.list-icon': {
      listStyleType: 'none',
      li: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 0,
        marginLeft: 0,
        marginBottom: theme.spacing(0.75),
        '> .icon': {
          display: 'inline-flex',
          fontSize: theme.typography.h3.fontSize,
          marginRight: theme.spacing(1),
        }
      }
    }
  },

  a: {
    color: theme.palette.link_color,
    textDecoration: 'none',
    '&:hover, &:active': { color: theme.palette.link_color_hover }
  },

  img: {
    display: 'inline-block',
    maxWidth: '100%',
    height: 'auto',
  },

  blockquote: {
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    paddingLeft: theme.spacing(2),
    margin: theme.spacing(2, 0),
    fontStyle: 'italic',
  },

  '.accent': {
    fontWeight: theme.typography.fontWeightRegular,
    color: 'var(--mui-palette-text-secondary)'
  },

  '.muted': { color: theme.palette.muted },

  '.social-btn': {
    display: 'inline-block',
    height: '1.625rem',
    width: '1.625rem',
    overflow: 'hidden',
    filter: 'grayscale(1) opacity(0.5)',
    transition: 'filter 0.5s ease-in-out',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right center',
    backgroundColor: 'transparent',
    backgroundSize: 'contain',
    marginTop: '0.25rem',
    '&:hover': { filter: 'grayscale(0) opacity(1)' },
    '&.xing': { backgroundImage: `url(${icon_xing})` },
    '&.linkedin': { backgroundImage: `url(${icon_linkedin})` },
    '&.github': { backgroundImage: `url(${icon_github})` },
    '&--sm': {
      marginTop: '2px',
      width: '20px',
      height: '20px',
    },
  },

  '.btn-lifted': {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    outline: 0,
    border: 0,
    margin: 0,
    borderRadius: 0,
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    textDecoration: 'none',
    textTransform: 'uppercase',
    minWidth: '8.125rem',
    boxShadow: 'none',
    padding: '0.125rem 1.625rem',
    lineHeight: 1.3,
    whiteSpace: 'nowrap',
    fontSize: theme.typography.h4.fontSize,
    fontWeight: 500,
    backgroundColor: 'transparent !important',
    color: 'var(--mui-palette-primary-contrastText) !important',
    transition: 'background 0.4s ease, transform 0.4s ease',
    zIndex: 0,

    '&::before, &::after ': {
      content: '""',
      display: 'block',
      position: 'absolute',
      pointerEvents: 'none',
    },

    '&::before': {
      right: '-8px',
      bottom: '-21px',
      width: '130px',
      height: '40px',
      background: `url(${shadow}) no-repeat right bottom transparent`
    },

    '&::after': {
      right: 0,
      bottom: 0,
      left: 0,
      top: 0,
      transition: 'background 0.8s ease',
      backgroundColor: 'var(--mui-palette-link_color)',
      backgroundPosition: 'center',
      zIndex: -1
    },

    '&:focus::after, &:hover::after': {
      background: 'var(--mui-palette-link_color_hover) radial-gradient(circle, transparent 1%, var(--mui-palette-link_color_hover) 1%) center/15000%'
    },
    '&:active::after': {
      backgroundColor: 'var(--mui-palette-link_color)',
      backgroundSize: '100%',
      transition: 'background 0s'
    }
  },

  // Custom typography based on sections
  '#content-header': {
    h1: {
      marginTop: 0,
      fontWeight: theme.typography.fontWeightRegular,
      lineHeight: 1.2,
      color: theme.palette.primary.main,
      borderBottom: '0 none',
    },
    '.post-hero': {
      h1: {
        ...theme.typography.overline,
        fontWeight: 700,
        lineHeight: 1,
        margin: 0,
        textIndent: '-3px',
      },
      h2: {
        color: theme.palette.primary.main,
        fontSize: theme.typography.h3.fontSize,
        fontWeight: theme.typography.fontWeightRegular,
        paddingBottom: theme.spacing(1.5),
        lineHeight: 1.1,
        margin: theme.spacing(1, 0),
      }
    },
  },
  '#content-main': {
    h2: {
      fontWeight: theme.typography.fontWeightBold,
      borderBottom: `1px solid ${theme.palette.divider}`,
      margin: theme.spacing(0, 0,3,0),
      paddingTop: theme.spacing(3),
      lineHeight: '2.5rem',
    },
    'h3 + h4': { marginTop: theme.spacing(-1) }
  },
  '#content-sidebar': {
    h2: {
      fontWeight: theme.typography.fontWeightBold,
      borderBottom: `1px solid ${theme.palette.divider}`,
      margin: theme.spacing(0, 0,3,0),
      lineHeight: '2.5rem',

      [theme.breakpoints.up('md')]: {
        fontSize: theme.typography.h3.fontSize,
        fontWeight: theme.typography.fontWeightMedium,
        color: theme.palette.primary.main,
        paddingTop: theme.spacing(3)
      }
    }
  }
}));

export default ContentWrapper;
