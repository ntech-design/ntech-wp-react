import React from 'react';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { ColorModeSwitch } from '@/components/ColorModeSwitch';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';

import bg_sm from '@/assets/images/bg_head_sm.png';
import bg_lg from '@/assets/images/bg_head_lg.png';
import shadow_menu from '@/assets/images/shadow_menu.png';

import { InfoType } from '@/types/wordpress';
import { GET_MAIN_MENU } from '@/apollo/queries/navigation';
import { GET_INFO } from '@/apollo/queries/content';
import { useQuery } from '@apollo/client/react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

interface HeaderMenuItem {
  id: string;
  label: string;
  url: string;
  target: string | null;
}

interface HeaderMenu {
  menuItems: {
    nodes: HeaderMenuItem[];
  };
}

interface HeaderData {
  menu: HeaderMenu | null;
}

const MotionBox = motion.create(Box);

const HeaderRoot = styled('header')(({ theme }) => ({
  position: 'relative',
  left: 0,
  right: 0,
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: '0.95rem',
  letterSpacing: '0.035rem',
  color: 'var(--mui-palette-header_color)',
  zIndex: 1,
  [theme.breakpoints.up('sm')]: { position: 'fixed' },

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '9.6rem',
    backgroundColor: 'var(--mui-palette-header_bg)',
    background:'linear-gradient(to bottom, var(--mui-palette-header_bg) 31%, var(--mui-palette-header_bg_gradient) 100%)',
    boxShadow: '0 -4px 6px 3px rgba(0, 0, 0, 0.75)',
    borderBottom: `1px solid ${theme.palette.header_bg}`,
    zIndex: 0
  },

  '.mode-switch': {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: 'var(--mui-palette-header_switch_color)'
  },

  '.header': {
    '&__container': {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '8.15rem',
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        background: `url(${bg_sm}) no-repeat scroll right top transparent`,
      },
      [theme.breakpoints.up('lg')]: {
        backgroundImage: `url(${bg_lg})`,
      }
    },

    '&__title, &__description': {
      textAlign: 'center',
      whiteSpace: 'nowrap',
      [theme.breakpoints.up('sm')]: { textAlign: 'left' }
    },

    '&__title': {
      fontSize: '2.4rem',
      lineHeight: '3.6rem',
      fontWeight: theme.typography.fontWeightBold,
      [theme.breakpoints.up('sm')]: {
        fontSize: '3.4rem',
        lineHeight: '5.6rem',
      },

      'a': {
        display: 'inline-block',
        textDecoration: 'none',
        transition: 'color 0.25s ease',
        color: theme.palette.header_color_title_1,
        'span': { color: theme.palette.header_color_title_2 },
        '&:hover': {
          color: theme.palette.header_color_title_2,
          'span': { color: theme.palette.header_color_title_1 },
        }
      }
    },

    '&__description': {
      fontSize: '1rem',
      fontWeight: theme.typography.fontWeightRegular,
      color: theme.palette.header_color_title_1,
      [theme.breakpoints.up('sm')]: {
        lineHeight: '3.9rem',
        marginLeft: theme.spacing(2)
      }
    },

    '&__navigation': {
      position: 'relative',
      textAlign: 'center',

      '&__menu': {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        background:'linear-gradient(to bottom, var(--mui-palette-header_menu_bg_1) 5%, var(--mui-palette-header_menu_bg_2) 80%, var(--mui-palette-header_menu_bg_3) 100%)',
        textIndent: 0,
        boxShadow: 'var(--mui-shadows-5)',
        listStyle: 'none',
        padding: 0,
        marginTop: 0,
        isolation: 'isolate',
        [theme.breakpoints.up('sm')]: { display: 'flex' },
        '&::before, &::after': {
          content: '""',
          display: 'block',
          position: 'absolute',
          bottom: '-26px',
          height: '26px',
          width: '165px'
        },
        '&::before': { left: '-16px', background: `url(${shadow_menu}) no-repeat scroll left 0 transparent` },
        '&::after': { right: '-16px', background: `url(${shadow_menu}) no-repeat scroll right 0 transparent` },
      },

      '&__item': {
        '.link, a': {
          display: 'block',
          padding: theme.spacing(0, 3),
          transition: 'background-color 0.4s ease, color 0.4s ease',
          borderTop: '1px solid var(--mui-palette-grey-400)',
          textDecoration: 'none',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          textShadow: '1px 1px 0px rgba(255, 255, 255, 0.95)',
          color: 'var(--mui-palette-header_menu_color)',
          lineHeight: '3rem',
          '&:hover': {
            color: 'var(--mui-palette-header_menu_color_hover)',
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
          },
          [theme.breakpoints.up('sm')]: {
            borderTop: '0 none',
            '&:not(.link)': { borderRight: '1px solid var(--mui-palette-grey-400)' }
          },
          '&.active': {
            pointerEvents: 'none',
            color: 'var(--mui-palette-header_menu_color_active)',
            fontWeight: theme.typography.fontWeightBold,
          }
        },
        '.link, &:first-of-type a': { borderTop: '0 none' }
      }
    }
  }
}));

function Header() {
  const theme = useTheme();
  const {data: infoData} = useQuery<InfoType>(GET_INFO, {
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: false,
  });
  const {data: menuData, loading: menuLoading, error: menuError} = useQuery<HeaderData>(GET_MAIN_MENU, {
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: false,
  });

  const {title, description, url} = infoData?.generalSettings ?? {};
  const pageTitle = title ? title.split(' ') : ['', ''];
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });

  if (menuLoading) return (
    <HeaderRoot id="site-header">
      <Container>
        <div className='header__container'>
        </div>
        <nav className="header__navigation" role="navigation">
          <ul className="header__navigation__menu">
            <li className="header__navigation__item">
              <span className="link">&nbsp;</span>
            </li>
          </ul>
        </nav>
      </Container>
    </HeaderRoot>
  );
  if (menuError) return <header>Error: {menuError.message}</header>;
  if (!menuData?.menu) return null;

  return (
    <HeaderRoot id="site-header">
      <Container>
        <div className='header__container'>
          <MotionBox
            initial={{ y: isDesktop ? '-6.25rem' : '0rem' }}
            animate={{ y: '0rem' }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="header__title">
              <a href={url}>
                <span>{ pageTitle[0] }</span> { pageTitle[1] }
              </a>
            </div>
          </MotionBox>

          <MotionBox
            initial={{ y: isDesktop ? '-6.25rem' : '0rem' }}
            animate={{ y: '0rem' }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="header__description">{ description }</div>
          </MotionBox>
        </div>

        <nav id="site-navigation" className="header__navigation" role="navigation">
          <div className="lifted-shadow-area">
            <div className="lifted-shadow-left"></div>
            <div className="lifted-shadow-right"></div>
          </div>
          <ul id="menu-main" className="header__navigation__menu" role="menu">
            {menuData.menu.menuItems.nodes.map((item) => (
              <li className="header__navigation__item" key={item.id} role="menuitem" tabIndex={-1}>
                <NavLink
                  to={new URL(item.url).pathname}
                  target={item.target || '_self'}
                  className={({ isActive }) => isActive ? 'active' : ''}
                >
                  { item.label }
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <ColorModeSwitch className="mode-switch"/>
    </HeaderRoot>
  );
}

export default React.memo(Header);