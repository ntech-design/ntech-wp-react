import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Captions from 'yet-another-react-lightbox/plugins/captions';

import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type GalleryImage = {
  id: number | string;
  url: string;
  alt?: string;
  caption?: string;
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
  [theme.breakpoints.up('md')]: { display: 'flex' },
  '.swiper-gallery__description': {
    flex: 2,
    'h1, h2, h3, h4': { marginTop: 0 }
  }
}));

const SwiperRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  textAlign: 'center',
  zIndex: 0,
  flex: 3,
  '&:hover': {
    '.swiper-button-prev, .swiper-button-next': { opacity: 0.5 },
  },
  '.swiper-wrapper': {
    alignItems: 'flex-end',
  },
  '.swiper-pagination-bullet': { backgroundColor: 'var(--mui-palette-indicator_bg)' },
  '.swiper-pagination-bullet-active': { backgroundColor: theme.palette.primary.main },
  '.swiper-button-prev, .swiper-button-next': {
    opacity: '0',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    padding: theme.spacing(1, 0),
    transition: 'opacity 0.25s ease-in-out, background-color 0.25s ease-in-out',
    '&:hover': {
      opacity: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    'svg': {
      color: theme.palette.primary.main,
      fill: theme.palette.primary.main
    }
  },
  '.swiper-slide': {
    lineHeight: 0,
    '&__image': {
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
      objectPosition: 'center',
    },
    '&__caption': {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '1rem',
      color: '#fff',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      margin: 0
    }
  }
}));

export default function Gallery({ images, children }: GalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (!images?.length) return null;

  return (
    <SwiperWrapper>
      <SwiperRoot className="swiper-gallery">
        <Swiper
          modules={[Pagination, Navigation]}
          slidesPerView='auto'
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          className="swiper-gallery__container"
        >
          {images.map((image, index) => (
            <SwiperSlide key={image.id} className="swiper-slide">
              <img
                src={image.url}
                alt={image.alt || ''}
                onClick={() => openLightbox(index)}
                className="swiper-slide__image"
                loading="lazy"
              />
              { image.caption && <p className="swiper-slide__caption">{ image.caption }</p> }
              <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
            </SwiperSlide>
          ))}
        </Swiper>

        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          controller={{ closeOnBackdropClick: true }}
          slides={images.map((img) => ({ src: img.url, alt: img.alt, title: img.caption }))}
          plugins={[Zoom, Captions]}
        />
      </SwiperRoot>

      { children && <div className="swiper-gallery__description">{ children }</div> }
    </SwiperWrapper>
  );
}