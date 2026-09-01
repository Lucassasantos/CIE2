import React, { useState } from 'react';
import { ExternalLink, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { parseImageInput } from '../utils/imageParser';

interface DirectHtmlImageCardProps {
  srcOrHtml: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  targetHref?: string;
  className?: string;
  aspectRatio?: 'video' | 'wide' | 'square' | 'banner' | 'card';
  onClick?: () => void;
  onInspect?: () => void;
}

export const DirectHtmlImageCard: React.FC<DirectHtmlImageCardProps> = ({
  srcOrHtml,
  alt = 'Imagem',
  title,
  subtitle,
  badge,
  targetHref,
  className = '',
  aspectRatio = 'video',
  onClick,
  onInspect,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const parsed = parseImageInput(srcOrHtml);
  const effectiveSrc = parsed.src || srcOrHtml;
  const effectiveAlt = parsed.alt || alt;
  const effectiveHref = parsed.href || targetHref;

  const aspectClass = {
    video: 'aspect-[16/9]',
    wide: 'aspect-[21/9]',
    banner: 'aspect-[2.4/1]',
    square: 'aspect-square',
    card: 'aspect-[1.586/1]', // standard credit card ratio
  }[aspectRatio];

  const content = (
    <div
      id="direct-image-card-container"
      className={`relative overflow-hidden rounded-2xl bg-slate-900 shadow-sm border border-slate-200/60 group transition-all duration-300 hover:shadow-md ${aspectClass} ${className}`}
      onClick={onClick}
    >
      {/* Background Image / HTML Rendered */}
      {!hasError && effectiveSrc ? (
        <>
          {isLoading && (
            <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-slate-400 animate-bounce" />
            </div>
          )}
          <img
            src={effectiveSrc}
            alt={effectiveAlt}
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
          {/* Subtle Dark Gradient Overlay for Readability */}
          {(title || subtitle || badge) && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />
          )}
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900 to-slate-900 p-4 flex flex-col items-center justify-center text-center text-white">
          <AlertCircle className="w-7 h-7 text-amber-300 mb-2" />
          <span className="text-xs font-semibold text-slate-200">Imagem não carregada</span>
          <span className="text-[10px] text-slate-400 max-w-[200px] truncate mt-1">
            Verifique o link direto ou tag HTML
          </span>
        </div>
      )}

      {/* Badge */}
      {badge && (
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-500/90 text-white backdrop-blur-md shadow-sm">
            {badge}
          </span>
        </div>
      )}

      {/* Inspect & Direct Link Tooltip Buttons */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        {onInspect && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onInspect();
            }}
            className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
            title="Ver detalhes do link/HTML"
          >
            <ImageIcon className="w-3.5 h-3.5" />
          </button>
        )}
        {effectiveHref && (
          <a
            href={effectiveHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
            title="Abrir link de destino"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      {/* Text Info (Title, Subtitle) */}
      {(title || subtitle) && (
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10 text-white">
          {title && <h4 className="text-sm font-bold leading-tight tracking-tight line-clamp-1">{title}</h4>}
          {subtitle && <p className="text-xs text-slate-200/90 mt-0.5 line-clamp-2">{subtitle}</p>}
        </div>
      )}
    </div>
  );

  return content;
};
