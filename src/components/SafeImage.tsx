import React, { useState } from 'react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  /** Use "eager" only for above-the-fold hero images. */
  loading?: 'lazy' | 'eager';
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackTitle,
  loading = 'lazy',
}) => {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (hasError) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#2B3036] to-[#1C1C1C] flex flex-col items-center justify-center p-4 text-center">
        <div className="w-8 h-8 mb-2 border border-[#9BC53D]/60 flex items-center justify-center text-[#9BC53D] text-xs font-bold">
          FF
        </div>
        {fallbackTitle && (
          <span className="text-xs text-white/80 font-medium line-clamp-2">{fallbackTitle}</span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={loading}
      decoding="async"
      fetchPriority={loading === 'eager' ? 'high' : 'auto'}
      onLoad={() => setLoaded(true)}
      onError={() => setHasError(true)}
      className={`${className} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
    />
  );
};
