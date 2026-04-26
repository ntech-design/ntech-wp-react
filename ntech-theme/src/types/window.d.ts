export {}

declare global {
  interface Window {
    cmplz_run_blocking_scripts?: () => void;
    show_cookie_banner?: () => void;
    conditionally_show_banner?: () => void;
    cmplz_has_consent?: (category: string) => boolean;
    cmplz_get_banner_status?: () => string;
    cmplz_set_banner_status?: (status?: string) => void;
  }
}
