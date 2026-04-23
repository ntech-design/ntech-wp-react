import React, { JSX, useMemo } from 'react';
import DOMPurify from 'dompurify';
import { WordPressBlock, CoreImageBlock } from '@/types/content';

import Gallery from '@/components/Gallery';
import { getIcon } from '@/components/IconRenderer';
import { safeHtml } from '@/utils/template';

type BlockRendererProps = {
  blocks: WordPressBlock[];
};

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  const consumedBlocks = useMemo(() => new Set<string>(), []);
  const renderBlock = (block: WordPressBlock, index: number, allBlocks: WordPressBlock[]): React.ReactNode => {
    if (!block) return null;

    if (consumedBlocks.has(block.clientId)) {
      return null;
    }

    switch (block.name) {
      case 'core/gallery': {
        const images: CoreImageBlock[] = block.innerBlocks.filter((b): b is CoreImageBlock =>
          b.__typename === 'CoreImage' || b.name === 'core/image'
        );

        const imageData = images.map((img) => ({
          id: img.attributes.id,
          url: img.attributes.url,
          alt: img.attributes.alt || '',
          caption: img.attributes.caption || '',
        }));

        // Gallery Description
        const nextBlock = allBlocks[index + 1];
        let descriptionContent: React.ReactNode = null;

        if (nextBlock && nextBlock.name === 'core/html') {
          consumedBlocks.add(nextBlock.clientId);
          descriptionContent = (
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(nextBlock.renderedHtml || '', {
              ADD_ATTR: ['target', 'rel']
            }) }} />
          );
        }

        return (
          <Gallery key={block.clientId} images={imageData} columns={Number(block.attributes.columns) || 1}>
            { descriptionContent }
          </Gallery>
        );
      }

      case 'core/heading': {
        const level = block.attributes.level || 2;
        const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag
            key={block.clientId}
            dangerouslySetInnerHTML={ safeHtml(block.attributes.content || '') }
          />
        );
      }

      case 'core/paragraph':
        return (
          <p
            key={block.clientId}
            dangerouslySetInnerHTML={ safeHtml(block.attributes.content || '') }
          />
        );

      case 'core/list': {
        const Tag = block.attributes.ordered ? 'ol' : 'ul';
        return (
          <Tag key={block.clientId} className={block.attributes.className || ''}>
            { block.innerBlocks?.map((child) => renderBlock(child as WordPressBlock, -1, [])) }
          </Tag>
        );
      }

      case 'core/list-item': {
        const rawHtml = DOMPurify.sanitize(block.renderedHtml || '');
        const classMatch = rawHtml.match(/class="([^"]+)"/i);
        const className = classMatch?.[1] || '';

        // Get icon key
        const iconMatch = className.match(/icon-([a-z0-9-]+)/i);
        const iconKey = iconMatch?.[1];

        const icon = getIcon(iconKey);
        const content = rawHtml
          .replace(/^\s*<li[^>]*>/i, '')
          .replace(/<\/li>\s*$/i, '');

        return (
          <li key={block.clientId} className={className}>
            { icon && <span className="icon">{icon}</span> }
            <span dangerouslySetInnerHTML={ safeHtml(content) } />
          </li>
        );
      }

      case 'core/columns':
      case 'core/column':
        return (
          <div key={block.clientId} className={`wp-block-${block.name.replace('/', '-')}`}>
            { block.innerBlocks?.map((child, i) => renderBlock(child as WordPressBlock, i, block.innerBlocks)) }
          </div>
        );

      case 'core/html':
      default:
        if (block.renderedHtml) {
          return (
            <div
              key={block.clientId}
              dangerouslySetInnerHTML={ safeHtml(block.renderedHtml) }
            />
          );
        }
        return null;
    }
  };

  return <>{ blocks.map((block, index) => renderBlock(block, index, blocks)) }</>;
}