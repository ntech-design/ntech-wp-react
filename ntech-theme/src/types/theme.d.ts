import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    customSpacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
    };
  }
  interface ThemeOptions {
    customSpacing?: {
      xs?: string;
      sm?: string;
      md?: string;
      lg?: string;
    };
  }
  interface Palette {
    link_color: string;
    link_color_hover: string;
    footer_color: string;
    footer_color_hover: string;
    footer_bg: string;
    header_color_title_1: string;
    header_color_title_2: string;
    header_bg: string;
    header_bg_gradient: string;
    header_menu_bg_1: string;
    header_menu_bg_2: string;
    header_menu_bg_3: string;
    header_switch_color: string;
    header_menu_color: string;
    header_menu_color_hover: string;
    header_menu_color_active: string;
    content_text_color: string;
    post_header_bg: string;
    post_header_color_border: string;
    indicator_bg: string;
    scroll_top_bg: string;
    scroll_top_gradient: string;
    muted: string;
  }
  interface PaletteOptions {
    link_color?: string;
    link_color_hover?: string;
    footer_color?: string;
    footer_color_hover?: string;
    footer_bg?: string;
    header_color_title_1?: string;
    header_color_title_2?: string;
    header_bg?: string;
    header_bg_gradient?: string;
    header_menu_bg_1?: string;
    header_menu_bg_2?: string;
    header_menu_bg_3?: string;
    header_switch_color?: string;
    header_menu_color?: string;
    header_menu_color_hover?: string;
    header_menu_color_active?: string;
    content_text_color?: string;
    post_header_bg?: string;
    post_header_color_border?: string;
    indicator_bg?: string;
    scroll_top_bg?: string;
    scroll_top_gradient?: string;
    muted?: string;
  }
}
