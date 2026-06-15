import { render as renderToStaticMarkup } from 'preact-render-to-string';
import { describe, expect, it, vi } from 'vitest';
import Attribute from '@/components/Attribute';

vi.mock('dompurify', () => ({
  __esModule: true,
  default: {
    sanitize: (html: string) => html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/\son\w+="[^"]*"/gi, ''),
  },
}));

describe('Attribute', () => {
  it('renders the title markup after sanitizing unsafe HTML', () => {
    const markup = renderToStaticMarkup(
      <Attribute
        title={'Frontend <strong>Architecture</strong><script>alert("xss")</script><img src="x" onerror="alert(1)" />'}
        key={1}
      />
    );

    expect(markup).toContain('Frontend <strong>Architecture</strong>');
    expect(markup).not.toContain('<script');
    expect(markup).not.toContain('onerror');
  });

  it('keeps the expected component structure', () => {
    const markup = renderToStaticMarkup(<Attribute title="UX Design" key={1} />);

    expect(markup).toContain('class="attribute"');
    expect(markup).toContain('class="attribute__icon"');
    expect(markup).toContain('class="attribute__title"');
    expect(markup).toContain('UX Design');
  });
});
