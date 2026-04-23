import React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import { useQuery } from '@apollo/client/react';
import { GET_FOOTER_MENU } from '@/apollo/queries/navigation';

interface FooterMenuItem {
  id: string;
  label: string;
  url: string;
  target: string | null;
}

interface FooterMenu {
  menuItems: {
    nodes: FooterMenuItem[];
  };
}

interface FooterData {
  menu: FooterMenu | null;
}

const FooterRoot = styled('footer')(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  borderTop: '1px solid var(--mui-palette-divider)',
  color: 'var(--mui-palette-footer_color)',
  backgroundColor: 'var(--mui-palette-footer_bg)',
  marginTop: theme.spacing(4),
  fontSize: '0.95rem',

  '.footer__navigation': {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: { justifyContent: 'end' }
  },

  '& a, & a:link, & a:visited': {
    display: 'inline-block',
    textTransform: 'uppercase',
    color: 'var(--mui-palette-footer_color)',
    textDecoration: 'none',
    fontSize: theme.typography.body2,
    '&:not(:last-child)::after': {
      display: 'inline-block',
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      content: '"|"',
    },
    '&:hover, &:focus': {
      color: 'var(--mui-palette-footer_color_hover)',
    },
  },
}));

function Footer() {
  const { loading, error, data } = useQuery<FooterData>(GET_FOOTER_MENU, {
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: false,
  });

  if (loading) return (
    <FooterRoot>
      <Container>
        <div className="footer__navigation">
          &nbsp;
        </div>
      </Container>
    </FooterRoot>
  );
  if (error) return <footer>Error: { error.message }</footer>;
  if (!data?.menu) return null;

  return (
    <FooterRoot id="site-footer">
      <Container>
        <nav className="footer__navigation" role="navigation">
          {data.menu.menuItems.nodes.map((item) => (
            <Link
              key={item.id}
              to={new URL(item.url).pathname}
              target={item.target || '_self'}
              title={item.label}
            >
              { item.label }
            </Link>
          ))}
        </nav>
      </Container>
    </FooterRoot>
  );
}

export default React.memo(Footer);