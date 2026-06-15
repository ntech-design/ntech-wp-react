import { createRoot } from 'preact/compat/client';
import App from '@/app';
import '@/assets/styles/main.scss';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
