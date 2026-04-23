export {}

declare global {
  interface Window {
    cmplz_run_blocking_scripts?: () => void;
    conditionally_show_banner?: () => void;
    show_cookie_banner?: () => void;
  }
}