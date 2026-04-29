import React, { Suspense, lazy } from 'react';
import parse, { HTMLReactParserOptions } from 'html-react-parser';
import { wpText } from '@/utils/template';
import { safeHtml } from '@/utils/template';

type HtmlContentProps = {
  html?: { rendered?: string } | string;
};

const PersistImage = lazy(() => import('@/components/PersistImage'));

export default function HtmlContent({ html }: HtmlContentProps) {
  const content = wpText(html);
  if (!content) return null;

  const clean = safeHtml(content);
  const options: HTMLReactParserOptions = {
    replace(node) {
      if (node.type === 'tag' && node.name === 'img') {
        const attrs = node.attribs || {};
        const src = attrs.src;
        const alt = attrs.alt;
        const width = attrs.width;
        const height = attrs.height;
        const className = attrs.class;

        if (!src) return null;

        return (
          <Suspense fallback={null}>
            <PersistImage
              src={src}
              alt={alt}
              width={width}
              height={height}
              className={className}
            />
          </Suspense>
        );
      }
    },
  };

  return <>{parse(clean.__html, options)}</>;
}