import React, { JSX, useMemo } from 'react';
import DOMPurify from 'dompurify';
import { WordPressBlock, CoreImageBlock } from '@/types/content';

import HtmlContent from '@/components/HtmlContent';
import Gallery from '@/components/Gallery';
import PersistImage from '@/components/PersistImage';
import { getIcon } from '@/components/IconRenderer';
import { parseAspectRatioValue, safeHtml } from '@/utils/template';

type BlockRendererProps = {
  blocks: WordPressBlock[];
};

function getGalleryAspectRatios(renderedHtml?: string) {
  if (!renderedHtml || typeof DOMParser === 'undefined') return [];

  const doc = new DOMParser().parseFromString(renderedHtml, 'text/html');

  return Array.from(doc.querySelectorAll('img')).map((image) => {
    const figure = image.closest('figure');
    const styleRatio = parseAspectRatioValue(figure instanceof HTMLElement ? figure.style.aspectRatio : '')
      || parseAspectRatioValue(image instanceof HTMLElement ? image.style.aspectRatio : '');
    const classRatio = parseAspectRatioValue([
      figure?.getAttribute('class') || '',
      image.getAttribute('class') || '',
    ].join(' '));

    return styleRatio || classRatio;
  });
}

function isLightboxEnabled(lightbox?: string): boolean {
  if (!lightbox) return false;

  try {
    const parsed = JSON.parse(lightbox);
    return parsed?.enabled === true;
  } catch {
    return false;
  }
}

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
        const aspectRatios = getGalleryAspectRatios(block.renderedHtml);

        const imageData = images.map((img, imageIndex) => {
          return {
            id: img.attributes.id,
            url: img.attributes.url,
            alt: img.attributes.alt || '',
            caption: img.attributes.caption || '',
            width: img.attributes.width,
            height: img.attributes.height,
            aspectRatio: aspectRatios[imageIndex],
            linkDestination: img.attributes.linkDestination || '',
            href: img.attributes.href || '',
            linkTarget: img.attributes.linkTarget || '',
            lightbox: isLightboxEnabled(img.attributes.lightbox) || false,
          };
        });

        // Gallery Description
        const nextBlock = allBlocks[index + 1];
        let descriptionContent: React.ReactNode = null;

        if (nextBlock && nextBlock.name === 'core/html') {
          consumedBlocks.add(nextBlock.clientId);
          descriptionContent = (
            <div dangerouslySetInnerHTML={ safeHtml(nextBlock.renderedHtml, { ADD_ATTR: ['target'] }) } />
          );
        }

        return (
          <Gallery key={block.clientId} images={imageData} columns={Number(block.attributes.columns) || 1}>
            { descriptionContent }
          </Gallery>
        );
      }

      case 'core/image': {
        const attrs = block.attributes || {};

        const src = typeof attrs.url === 'string' ? attrs.url : '';
        if (!src) return null;

        return (
          <figure
            key={block.clientId}
            className={attrs.className || 'wp-block-image'}
          >
            <PersistImage
              src={ src }
              alt={ typeof attrs.alt === 'string' ? attrs.alt : '' }
              width={ typeof attrs.width === 'string' || typeof attrs.width === 'number' ? attrs.width : '' }
              height={ typeof attrs.height === 'string' || typeof attrs.height === 'number' ? attrs.height : '' }
              className="wp-image"
            />
          </figure>
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
          return <HtmlContent key={block.clientId} html={block.renderedHtml} />;
        }
        return null;
    }
  };

  return <>{ blocks.map((block, index) => renderBlock(block, index, blocks)) }</>;
}
