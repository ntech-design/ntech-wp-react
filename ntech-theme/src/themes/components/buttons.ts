import type { ThemeOptions } from '@mui/material/styles';
import { colors } from '@/themes/variables/colors';
import { fontSizes } from '@/themes/variables/typography';
import type { ButtonProps } from '@mui/material/Button';
import shadow from '@/assets/images/shadow_button.png';

export const buttonTheme: ThemeOptions["components"] = {
  MuiButtonBase: {},
  MuiButton: {
    styleOverrides: {
      root: {
        minWidth: 'unset',
      },
    },
    variants: [
      {
        props: {
          variant: 'lifted' as const,
          color: 'primary'
        } satisfies Partial<ButtonProps>,
        style: ({ theme }) => ({
          position: 'relative',
          textTransform: 'uppercase',
          boxShadow: 'none',
          borderRadius: 0,
          padding: '2px 26px',
          lineHeight: 1.3,
          whiteSpace: 'nowrap',
          fontSize: fontSizes.h4.max,
          backgroundColor: colors.primary,
          minWidth: '130px',
          color: theme.palette.getContrastText(colors.primary),
          transition: 'background-color 0.4s ease, transform 0.4s ease',
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
          '&::before': {
            content: "''",
            display: 'block',
            position: 'absolute',
            right: '-8px',
            bottom: '-21px',
            width: '130px',
            height: '40px',
            background: `url(${shadow}) no-repeat right bottom transparent`,
            pointerEvents: 'none',
          },
        }),
      },
    ],
  },
  MuiIconButton: {},
};
