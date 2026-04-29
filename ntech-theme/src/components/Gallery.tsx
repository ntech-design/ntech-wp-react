import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import { safeHtml } from '@/utils/template';

import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type GalleryImage = {
  id: number | string;
  url: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
  aspectRatio?: string;
  linkDestination?: string;
  href?: string;
  target?: string;
  lightbox?: boolean;
};

type GalleryProps = {
  images: GalleryImage[];
  columns?: number;
  children?: React.ReactNode;
};

const SwiperWrapper = styled('div')(({ theme }) => ({
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

const SwiperRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  textAlign: 'center',
  zIndex: 0,
  minWidth: 0,
  width: '100%',
  flex: 3,
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    marginBottom: 0,
    width: '50vw'
  },
  '&:hover': {
    '.swiper-button-prev, .swiper-button-next': { opacity: 0.5 },
  },
  '.swiper-gallery__container': { paddingBottom: theme.spacing(4) },
  '.swiper-pagination': { bottom: 0 },
  '.swiper-pagination-bullet': { backgroundColor: 'var(--mui-palette-indicator_bg)' },
  '.swiper-pagination-bullet-active': { backgroundColor: theme.palette.primary.main },
  '.swiper-button-prev, .swiper-button-next': {
    opacity: '0',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    padding: theme.spacing(1, 0),
    transition: 'opacity 0.25s ease-in-out, background-color 0.25s ease-in-out',
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      opacity: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(5px) saturate(200%)',
    },
    'svg': {
      color: theme.palette.primary.main,
      fill: theme.palette.primary.main
    }
  },
  '.swiper-slide': {
    lineHeight: 0,
    height: 'auto',
  }
}));

const MediaFrame = styled('div')(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  minHeight: '10rem',
  maxHeight: '22rem',
  backgroundColor: 'var(--mui-palette-post_header_bg)',

  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'top',
    display: 'block',
  },

  '.swiper-slide__caption': {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing(1),
    color: theme.palette.common.white,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(5px) saturate(200%)',
    margin: 0,
    lineHeight: 1.4,

    p: {
      margin: 0,
      color: 'inherit',
    }
  }
}));

function normalizeAspectRatio(value?: string) {
  if (!value) return undefined;

  const normalized = value.trim().replace(/\s+/g, '');
  if (!normalized) return undefined;

  if (/^\d+(\.\d+)?$/.test(normalized)) {
    return normalized;
  }

  const match = normalized.match(/^(\d+(?:\.\d+)?)[/:](\d+(?:\.\d+)?)$/);
  if (!match) return undefined;

  return `${match[1]} / ${match[2]}`;
}

function getAspectRatio(image: GalleryImage) {
  return normalizeAspectRatio(image.aspectRatio) || (image.width && image.height ? `${image.width} / ${image.height}` : undefined) || '4 / 3';
}

export default function Gallery({ images, children }: GalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>({});

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (!images?.length) return null;

  // Preload all images
  useEffect(() => {
    images.forEach((image) => {
      const img = new Image();
      img.src = image.url;
      img.onload = () => {
        setLoadedImages((prev) => ({ ...prev, [image.id]: true }));
      };
    });
  }, [images]);

  return (
    <SwiperWrapper>
      <SwiperRoot className="swiper-gallery">
        <div className="swiper-gallery__viewport">
          <Swiper
            modules={[Pagination, Navigation]}
            slidesPerView={1}
            spaceBetween={10}
            loop={true}
            pagination={{ clickable: true }}
            navigation={true}
            className="swiper-gallery__container"
          >
            {images.map((image, index) => (
              <SwiperSlide key={image.id} className="swiper-slide">
                <MediaFrame style={{ aspectRatio: getAspectRatio(image) }}>
                  {!loadedImages[image.id] && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'var(--mui-palette-indicator_bg)',
                      }}
                    />
                  )}

                  <img
                    src={image.url}
                    alt={image.alt || ''}
                    onClick={() => {
                      if (image.lightbox) {
                        openLightbox(index);
                        return;
                      }

                      if (image.linkDestination === 'custom' && image.href) {
                        window.open(image.href, image.target || '_self');
                        return;
                      }

                      if (image.linkDestination === 'media') {
                        openLightbox(index);
                        return;
                      }

                      if (image.linkDestination === 'attachment' && image.href) {
                        window.location.href = image.href;
                      }
                    }}
                    className="swiper-slide__image"
                    loading="eager"
                    style={{
                      opacity: loadedImages[image.id] ? 1 : 0,
                      transition: 'opacity 0.4s ease',
                      position: loadedImages[image.id] ? 'relative' : 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      cursor: image.lightbox || (image.linkDestination === 'custom' && image.href) || image.linkDestination === 'attachment' || image.linkDestination === 'media' ? 'pointer' : 'default'
                    }}
                  />
                  { image.caption && <p className="swiper-slide__caption" dangerouslySetInnerHTML={ safeHtml(image.caption) } /> }
                  <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                </MediaFrame>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          controller={{ closeOnBackdropClick: true }}
          slides={images.map((img) => ({ src: img.url, alt: img.alt, title: (<span dangerouslySetInnerHTML={ safeHtml(img.caption) } />) }))}
          plugins={[Zoom, Captions]}
        />
      </SwiperRoot>

      { children && <div className="swiper-gallery__description">{ children }</div> }
    </SwiperWrapper>
  );
}
