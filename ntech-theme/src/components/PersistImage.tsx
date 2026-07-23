import JSXInternal, { ImgHTMLAttributes } from 'preact';
import { useState, useEffect, useRef, memo } from 'preact/compat';

type PersistImageProps = {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  placeholder?: string;
  effect?: 'blur' | 'opacity';
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'>;

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
  const imgRef = useRef<HTMLImageElement>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(() => {
    if (typeof window !== 'undefined' && imgRef.current) {
      return imgRef.current.complete;
    }
    return false;
  });

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
      setHasError(false);
    } else {
      setIsLoaded(false);
      setHasError(false);
    }
  }, [src]);

  const handleLoad = () => setIsLoaded(true);
  const handleError = () => setHasError(true);

  return (
    <img
      {...props}
      ref={imgRef}
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
        ...(props.style as JSXInternal.CSSProperties)
      }}
    />
  );
}

const PersistImage = memo(PersistImageComponent);
export default PersistImage;