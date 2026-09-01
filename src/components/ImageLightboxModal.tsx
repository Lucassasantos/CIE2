import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, Code2, Link as LinkIcon, Sparkles } from 'lucide-react';
import { generateHtmlSnippet, parseImageInput } from '../utils/imageParser';

interface ImageLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title?: string;
  htmlSnippet?: string;
  targetHref?: string;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title = 'Visualizador de Imagem',
  htmlSnippet,
  targetHref,
}) => {
  const [copiedType, setCopiedType] = useState<'url' | 'html' | null>(null);

  if (!isOpen) return null;

  const parsed = parseImageInput(imageUrl);
  const effectiveSrc = parsed.src || imageUrl;
  const effectiveHtml = htmlSnippet || generateHtmlSnippet(effectiveSrc, title, targetHref);

  const copyToClipboard = (text: string, type: 'url' | 'html') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div 
        id="image-lightbox-modal"
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">{title}</h3>
              <p className="text-[11px] text-slate-500">Link Direto e Código HTML</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Image Display */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 aspect-[16/9] flex items-center justify-center">
            <img
              src={effectiveSrc}
              alt={title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Direct URL Box */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-teal-600" />
                Link Direto da Imagem (URL)
              </label>
              <button
                type="button"
                onClick={() => copyToClipboard(effectiveSrc, 'url')}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-teal-700 hover:text-teal-900"
              >
                {copiedType === 'url' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar URL</span>
                  </>
                )}
              </button>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-700 break-all select-all">
              {effectiveSrc}
            </div>
          </div>

          {/* HTML Tag Snippet */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-teal-600" />
                Tag HTML Pronta para Uso
              </label>
              <button
                type="button"
                onClick={() => copyToClipboard(effectiveHtml, 'html')}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-teal-700 hover:text-teal-900"
              >
                {copiedType === 'html' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar HTML</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3 rounded-xl bg-slate-900 text-teal-300 font-mono text-[11px] overflow-x-auto whitespace-pre-wrap select-all">
              {effectiveHtml}
            </pre>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center gap-2.5">
            <a
              href={effectiveSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Abrir Imagem em Nova Aba
            </a>
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-6 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
