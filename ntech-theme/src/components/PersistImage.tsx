import React, { useState, useEffect } from 'react';

type PersistImageProps = {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  placeholder?: string;
  effect?: 'blur' | 'opacity';
} & Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'>;

const PersistImageComponent = ({
  src,
  alt = '',
  width,
  height,
  className = '',
  placeholder,
  effect = 'blur',
  ...props
}: PersistImageProps)=> {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  const handleLoad = () => setIsLoaded(true);
  const handleError = () => setHasError(true);

  return (
    <img
      {...props}
      src={hasError && placeholder ? placeholder : src}
      alt={alt}
      width={width}
      height={height}
      className={[className, effect === 'blur' && 'blur-load'].filter(Boolean).join(' ')}
      loading="lazy"
      decoding="async"
      onLoad={handleLoad}
      onError={handleError}
      style={{
        opacity: isLoaded ? 1 : 0.6,
        transition: effect === 'blur' ? 'filter 0.4s ease, opacity 0.4s ease' : 'opacity 0.35s ease',
        filter: isLoaded ? 'blur(0)' : 'blur(5px)',
        willChange: 'opacity, filter',
      }}
    />
  );
}

const PersistImage = React.memo(PersistImageComponent);
export default PersistImage;