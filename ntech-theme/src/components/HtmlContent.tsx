import React from 'react';
import parse, { HTMLReactParserOptions } from 'html-react-parser';
import { wpText } from '@/utils/template';

import PersistImage from '@/components/PersistImage';
import { safeHtml } from '@/utils/template';

type HtmlContentProps = {
  html?: { rendered?: string } | string;
};

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
          <PersistImage
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
          />
        );
      }
    },
  };

  return <>{parse(clean.__html, options)}</>;
}