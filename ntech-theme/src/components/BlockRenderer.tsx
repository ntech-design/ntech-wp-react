import { ComponentChildren } from 'preact';
import { JSX, Suspense, lazy, useMemo, memo } from 'preact/compat';
import { WordPressBlock, CoreImageBlock } from '@/types/content';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';

import HtmlContent from '@/components/HtmlContent';
import { getIcon } from '@/components/IconRenderer';
import { parseAspectRatioValue, safeHtml } from '@/utils/template';

type BlockRendererProps = {
  blocks: WordPressBlock[];
};

const Gallery = lazy(() => import('@/components/Gallery'));
const PersistImage = lazy(() => import('@/components/PersistImage'));

const EMPTY_BLOCKS: WordPressBlock[] = [];
const LIST_CLASS_PATTERN = /class="([^"]+)"/i;
const ICON_CLASS_PATTERN = /icon-([a-z0-9-]+)/i;
const OPENING_LI_PATTERN = /^\s*<li[^>]*>/i;
const CLOSING_LI_PATTERN = /<\/li>\s*$/i;

const GalleryFallbackRoot = styled('div')(({ theme }) => ({
  display: 'block',
  gap: theme.spacing(4),
  flexWrap: 'wrap',
  margin: theme.spacing(4, 0),
  [theme.breakpoints.up('sm')]: { display: 'flex' },
  '.swiper-gallery__description': {
    flex: 2,
    'h1, h2, h3, h4': { marginTop: 0 }
  }
}));

const GalleryFallbackMedia = styled('div')(({ theme }) => ({
  flex: 3,
  width: '100%',
  minWidth: 0,
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    marginBottom: 0,
    width: '50vw'
  }
}));

const GalleryFallbackFrame = styled('div')({
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  minHeight: '10rem',
  maxHeight: '22rem',
  backgroundColor: 'var(--mui-palette-post_header_bg)',
});

const GalleryFallbackSkeleton = styled(Skeleton)({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  transform: 'none',
});

function GalleryFallback({ aspectRatio, children }: {
  aspectRatio?: string;
  children?: ComponentChildren;
}) {
  return (
    <GalleryFallbackRoot aria-hidden="true">
      <GalleryFallbackMedia>
        <GalleryFallbackFrame style={{ aspectRatio: aspectRatio || '4 / 3' }}>
          <GalleryFallbackSkeleton variant="rectangular" animation="wave" />
        </GalleryFallbackFrame>
      </GalleryFallbackMedia>

      { children && <div className="swiper-gallery__description">{ children }</div> }
    </GalleryFallbackRoot>
  );
}

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

function BlockRenderer({ blocks }: BlockRendererProps) {
  const renderedBlocks = useMemo(() => {
    const consumedBlocks = new Set<string>();
    const galleryAspectRatioCache = new Map<string, Array<string | undefined>>();

    const getCachedGalleryAspectRatios = (renderedHtml?: string) => {
      if (!renderedHtml) return [];

      const cached = galleryAspectRatioCache.get(renderedHtml);
      if (cached) return cached;

      const aspectRatios = getGalleryAspectRatios(renderedHtml);
      galleryAspectRatioCache.set(renderedHtml, aspectRatios);

      return aspectRatios;
    };

    const renderBlock = (block: WordPressBlock, index: number, allBlocks: WordPressBlock[]): ComponentChildren => {
      if (!block) return null;
      if (consumedBlocks.has(block.clientId)) return null;

      switch (block.name) {
        case 'core/gallery': {
          const images: CoreImageBlock[] = block.innerBlocks.filter((b): b is CoreImageBlock =>
            b.__typename === 'CoreImage' || b.name === 'core/image'
          );
          const aspectRatios = getCachedGalleryAspectRatios(block.renderedHtml);

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
          let descriptionContent: ComponentChildren = null;

          if (nextBlock && nextBlock.name === 'core/html') {
            consumedBlocks.add(nextBlock.clientId);
            descriptionContent = (
              <div dangerouslySetInnerHTML={ safeHtml(nextBlock.renderedHtml, { ADD_ATTR: ['target'] }) } />
            );
          }

          return (
            <Suspense
              key={ block.clientId }
              fallback={
                <GalleryFallback aspectRatio={ aspectRatios[0] }>
                  { descriptionContent }
                </GalleryFallback>
              }
            >
              <Gallery images={imageData} columns={Number(block.attributes.columns) || 1}>
                { descriptionContent }
              </Gallery>
            </Suspense>
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
              <Suspense fallback={ null }>
                <PersistImage
                  src={ src }
                  alt={ typeof attrs.alt === 'string' ? attrs.alt : '' }
                  width={ typeof attrs.width === 'string' || typeof attrs.width === 'number' ? attrs.width : '' }
                  height={ typeof attrs.height === 'string' || typeof attrs.height === 'number' ? attrs.height : '' }
                  className="wp-image"
                />
              </Suspense>
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
            <Tag key={ block.clientId } className={ block.attributes.className || '' }>
              { block.innerBlocks?.map((child) => renderBlock(child as WordPressBlock, -1, EMPTY_BLOCKS)) }
            </Tag>
          );
        }

        case 'core/list-item': {
          const rawHtml = block.renderedHtml || '';
          const classMatch = rawHtml.match(LIST_CLASS_PATTERN);
          const className = classMatch?.[1] || '';

          // Get icon key
          const iconMatch = className.match(ICON_CLASS_PATTERN);
          const iconKey = iconMatch?.[1];

          const icon = getIcon(iconKey);
          const content = rawHtml
            .replace(OPENING_LI_PATTERN, '')
            .replace(CLOSING_LI_PATTERN, '');

          return (
            <li key={block.clientId} className={ className }>
              { icon && <span className="icon">{ icon }</span> }
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
            return <HtmlContent key={ block.clientId } html={ block.renderedHtml } />;
          }
          return null;
      }
    };

    return blocks.map((block, index) => renderBlock(block, index, blocks));
  }, [blocks]);

  return <>{ renderedBlocks }</>;
}

export default memo(BlockRenderer);
