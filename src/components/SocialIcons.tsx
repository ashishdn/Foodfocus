import React from 'react';

interface SocialIconButtonProps {
  network: 'facebook' | 'x' | 'linkedin' | 'youtube';
  variant: 'utility' | 'lime-circle' | 'footer-circle';
  onClick: (network: string) => void;
}

const NETWORK_LABELS = {
  facebook: 'Facebook',
  x: 'X (formerly Twitter)',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
};

const NetworkSvg: React.FC<{ network: SocialIconButtonProps['network']; className?: string }> = ({
  network,
  className = 'w-3.5 h-3.5',
}) => {
  switch (network) {
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5h1.7V4.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1V11H7.7v3h2.7v8h3.1z" />
        </svg>
      );
    case 'x':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.6 15.6V8.4L15.9 12l-6.3 3.6z" />
        </svg>
      );
  }
};

export const SocialIconRow: React.FC<{
  variant: SocialIconButtonProps['variant'];
  onSelect: (network: string) => void;
}> = ({ variant, onSelect }) => {
  const networks: SocialIconButtonProps['network'][] = ['facebook', 'x', 'linkedin', 'youtube'];

  return (
    <div className="flex items-center gap-2.5">
      {networks.map((net) => {
        const baseStyle =
          variant === 'utility'
            ? 'w-7 h-7 flex items-center justify-center text-white/85 hover:text-[#9BC53D] transition-colors'
            : variant === 'lime-circle'
            ? 'w-10 h-10 rounded-full bg-[#9BC53D] text-white flex items-center justify-center hover:bg-[#84AC2D] transition-colors shadow-xs'
            : 'w-9 h-9 rounded-full bg-[#242424] text-white/90 flex items-center justify-center hover:bg-[#9BC53D] hover:text-black transition-colors border border-white/10';

        const iconSize = variant === 'utility' ? 'w-3.5 h-3.5' : 'w-4 h-4';

        return (
          <button
            key={net}
            type="button"
            aria-label={`foodfocus on ${NETWORK_LABELS[net]}`}
            onClick={() => onSelect(NETWORK_LABELS[net])}
            className={`${baseStyle} cursor-pointer`}
          >
            <NetworkSvg network={net} className={iconSize} />
          </button>
        );
      })}
    </div>
  );
};
