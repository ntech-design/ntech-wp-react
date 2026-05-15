import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import BlockRenderer from '@/components/BlockRenderer';
import type { WordPressBlock } from '@/types/content';

jest.mock('dompurify', () => ({
  __esModule: true,
  default: {
    sanitize: (html: string) => html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/\son\w+="[^"]*"/gi, ''),
  },
}));

jest.mock('@/components/HtmlContent', () => ({
  __esModule: true,
  default: ({ html }: { html: string }) => <div data-testid="html-content">{html}</div>,
}));

function block(overrides: Partial<WordPressBlock>): WordPressBlock {
  return {
    clientId: 'block-id',
    name: 'core/paragraph',
    attributes: {},
    innerBlocks: [],
    ...overrides,
  };
}

describe('BlockRenderer', () => {
  it('renders headings and paragraphs with sanitized content', () => {
    const markup = renderToStaticMarkup(
      <BlockRenderer
        blocks={[
          block({
            clientId: 'heading',
            name: 'core/heading',
            attributes: {
              level: 3,
              content: 'About <em>me</em><script>alert("xss")</script>',
            },
          }),
          block({
            clientId: 'paragraph',
            name: 'core/paragraph',
            attributes: {
              content: 'Clean <strong>copy</strong><span onclick="alert(1)"> now</span>',
            },
          }),
        ]}
      />
    );

    expect(markup).toContain('<h3>About <em>me</em></h3>');
    expect(markup).toContain('<p>Clean <strong>copy</strong><span> now</span></p>');
    expect(markup).not.toContain('<script');
    expect(markup).not.toContain('onclick');
  });

  it('renders ordered lists and list-item icons from icon classes', () => {
    const markup = renderToStaticMarkup(
      <BlockRenderer
        blocks={[
          block({
            clientId: 'list',
            name: 'core/list',
            attributes: { ordered: true, className: 'icon-list' },
            innerBlocks: [
              block({
                clientId: 'item',
                name: 'core/list-item',
                attributes: {},
                renderedHtml: '<li class="icon-wiki featured">Wikipedia</li>',
              }),
            ],
          }),
        ]}
      />
    );

    expect(markup).toContain('<ol class="icon-list">');
    expect(markup).toContain('<li class="icon-wiki featured">');
    expect(markup).toContain('Wikipedia');
    expect(markup).toContain('<span class="icon">');
  });

  it('renders nested column blocks recursively', () => {
    const markup = renderToStaticMarkup(
      <BlockRenderer
        blocks={[
          block({
            clientId: 'columns',
            name: 'core/columns',
            attributes: {},
            innerBlocks: [
              block({
                clientId: 'column',
                name: 'core/column',
                attributes: {},
                innerBlocks: [
                  block({
                    clientId: 'column-copy',
                    name: 'core/paragraph',
                    attributes: { content: 'Nested content' },
                  }),
                ],
              }),
            ],
          }),
        ]}
      />
    );

    expect(markup).toContain('class="wp-block-core-columns"');
    expect(markup).toContain('class="wp-block-core-column"');
    expect(markup).toContain('<p>Nested content</p>');
  });

  it('delegates raw HTML blocks to HtmlContent', () => {
    const markup = renderToStaticMarkup(
      <BlockRenderer
        blocks={[
          block({
            clientId: 'html',
            name: 'core/html',
            attributes: {},
            renderedHtml: '<section>Raw content</section>',
          }),
        ]}
      />
    );

    expect(markup).toContain('data-testid="html-content"');
    expect(markup).toContain('&lt;section&gt;Raw content&lt;/section&gt;');
  });
});
