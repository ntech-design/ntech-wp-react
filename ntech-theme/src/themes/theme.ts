import { createTheme, darken, alpha } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';
import { fluidFont } from '@/utils/typography';
import { common } from '@mui/material/colors';
import { container } from '@/themes/variables/container';
import { colors } from '@/themes/variables/colors';
import { fontSizes } from '@/themes/variables/typography';
import { buttonTheme } from '@/themes/components/buttons';

const getBaseTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
  spacing: (...factors: (number | string)[]) => factors
    .map(f => typeof f === 'number' ? `${0.5 * f}rem` : f)
    .join(' '),

  palette: {
    mode,
    primary: { main: colors.primary },
    secondary: { main: colors.secondary },
    grey: colors.grey,

    background: {
      default: mode === 'dark' ? colors.grey[1000] : common.white,
      paper: mode === 'dark' ? colors.grey[800] : colors.grey[200],
    },

    text: {
      primary: mode === 'dark' ? colors.grey[300] : colors.grey[600],
      secondary: mode === 'dark' ? colors.grey[100] : colors.grey[900],
    },

    divider: mode === 'dark' ? colors.grey[200] : colors.grey[400],
    link_color: colors.primary,
    link_color_hover: darken(colors.primary, 0.2),
    footer_color: mode === 'dark' ? colors.primary : colors.grey[800],
    footer_color_hover: darken(colors.primary, 0.2),
    footer_bg: mode === 'dark' ? colors.grey[800] : colors.grey[200],
    header_color_title_1: common.white,
    header_color_title_2: colors.primary,
    header_bg: colors.grey[800],
    header_bg_gradient: colors.grey[900],
    header_switch_color: mode === 'dark' ? colors.grey[100] : colors.primary,
    header_menu_bg_1: common.white,
    header_menu_bg_2: colors.grey[300],
    header_menu_bg_3: colors.grey[400],
    header_menu_color: colors.grey[600],
    header_menu_color_hover: darken(colors.primary, 0.4),
    header_menu_color_active: darken(colors.primary, 0.4),
    post_header_bg: mode === 'dark' ? colors.grey[900] : colors.grey[100],
    post_header_color_border: mode === 'dark' ? colors.grey[800] : colors.grey[400],
    indicator_bg: mode === 'dark' ? alpha(colors.grey[100], 0.65) : alpha(colors.grey[900], 0.65),
    scroll_top_bg: alpha(colors.grey[700], 0.85),
    scroll_top_gradient: alpha(colors.grey[900], 0.85),
    muted: mode === 'dark' ? alpha(colors.grey[300], 0.8) : alpha(colors.grey[600], 0.8),
  },

  shape: { borderRadius: 4 },

  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI"',
  },
});

export const brandedComponents: ThemeOptions['components'] = {
  ...buttonTheme,

  MuiContainer: {
    styleOverrides: {
      root: {
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',

        '&.MuiContainer-maxWidthXs': { maxWidth: container.xs },
        '&.MuiContainer-maxWidthSm': { maxWidth: container.sm },
        '&.MuiContainer-maxWidthMd': { maxWidth: container.md },
        '&.MuiContainer-maxWidthLg': { maxWidth: container.lg },
        '&.MuiContainer-maxWidthXl': { maxWidth: container.xl },
      },
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        background:
          theme.palette.mode === 'dark' ? colors.grey[800] : colors.grey[200],
      })
    },
    defaultProps: {
      elevation: 20
    }
  }
};

const brandedTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data'
  },
  colorSchemes: {
    light: getBaseTokens('light'),
    dark: getBaseTokens('dark'),
  },

  components: brandedComponents,
});

brandedTheme.typography = {
  ...brandedTheme.typography,
  h1: { lineHeight: 1.5, fontSize: fluidFont(brandedTheme, fontSizes.h1.min, fontSizes.h1.max, 'lg') },
  h2: { lineHeight: 1.5, fontSize: fluidFont(brandedTheme, fontSizes.h2.min, fontSizes.h2.max, 'lg') },
  h3: { lineHeight: 1.2, fontSize: fluidFont(brandedTheme, fontSizes.h3.min, fontSizes.h3.max, 'md') },
  h4: { lineHeight: 1.5, fontSize: fluidFont(brandedTheme, fontSizes.h4.min, fontSizes.h4.max, 'md') },
  h5: { lineHeight: 1.5, fontSize: fluidFont(brandedTheme, fontSizes.h5.min, fontSizes.h5.max, 'md') },
  h6: { lineHeight: 1.5, fontSize: fluidFont(brandedTheme, fontSizes.h6.min, fontSizes.h6.max, 'md') },
  body1: { lineHeight: 1.5, fontSize: fluidFont(brandedTheme, fontSizes.body.min, fontSizes.body.max, 'lg') },
  body2: { lineHeight: 1.2, fontSize: fontSizes.small.min },
  overline: { lineHeight: 1.5, fontSize: fluidFont(brandedTheme, fontSizes.hero.min, fontSizes.hero.max, 'lg') }
};

export const theme = brandedTheme;