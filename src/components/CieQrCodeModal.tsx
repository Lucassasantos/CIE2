import React, { useState, useEffect } from 'react';
import { 
  X, 
  QrCode, 
  ShieldCheck, 
  Sun, 
  Copy, 
  Check, 
  Download, 
  CheckCircle2, 
  Sparkles,
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import { StudentCieData } from '../types';

interface CieQrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  cieData: StudentCieData;
}

export const CieQrCodeModal: React.FC<CieQrCodeModalProps> = ({
  isOpen,
  onClose,
  cieData,
}) => {
  const [copiedDnv, setCopiedDnv] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [highBrightness, setHighBrightness] = useState(true);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (!isOpen) return;
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 60));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyDnv = () => {
    navigator.clipboard.writeText(cieData.dnvCode);
    setCopiedDnv(true);
    setTimeout(() => setCopiedDnv(false), 2000);
  };

  const handleCopyValidationUrl = () => {
    navigator.clipboard.writeText(cieData.qrCodeData);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className={`relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl transition-all ${
          highBrightness ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'
        }`}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0c515c] to-[#178596] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-teal-200" />
            </div>
            <div>
              <h3 className="text-sm font-bold leading-tight">Validador Oficial Meia-Entrada</h3>
              <p className="text-[10px] text-teal-100/90 font-mono">Padrão Nacional ITI • Lei 12.933/13</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* QR Code Presentation Box */}
        <div className="p-6 text-center space-y-4">
          <div className="space-y-1">
            <div className="text-sm font-extrabold text-slate-900 uppercase tracking-tight">
              {cieData.name}
            </div>
            <div className="text-xs text-slate-600">
              {cieData.institution} • {cieData.course}
            </div>
          </div>

          {/* High-Contrast QR Code Wrapper */}
          <div className="relative mx-auto w-56 h-56 p-3 bg-white rounded-2xl border-4 border-[#178596] shadow-md flex flex-col items-center justify-center">
            {/* Custom SVG QR Code Representation with Central Crest */}
            <div className="relative w-full h-full flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-[#0c515c]">
                {/* QR Finder Corners */}
                <rect x="5" y="5" width="26" height="26" rx="4" fill="#0c515c" />
                <rect x="9" y="9" width="18" height="18" rx="2" fill="white" />
                <rect x="13" y="13" width="10" height="10" rx="2" fill="#0c515c" />

                <rect x="69" y="5" width="26" height="26" rx="4" fill="#0c515c" />
                <rect x="73" y="9" width="18" height="18" rx="2" fill="white" />
                <rect x="77" y="13" width="10" height="10" rx="2" fill="#0c515c" />

                <rect x="5" y="69" width="26" height="26" rx="4" fill="#0c515c" />
                <rect x="9" y="73" width="18" height="18" rx="2" fill="white" />
                <rect x="13" y="77" width="10" height="10" rx="2" fill="#0c515c" />

                {/* Data Matrix Dots */}
                <rect x="36" y="8" width="6" height="6" rx="1" />
                <rect x="46" y="8" width="6" height="6" rx="1" />
                <rect x="56" y="8" width="6" height="6" rx="1" />
                <rect x="36" y="18" width="6" height="6" rx="1" />
                <rect x="56" y="18" width="6" height="6" rx="1" />
                <rect x="36" y="28" width="6" height="6" rx="1" />
                <rect x="46" y="28" width="6" height="6" rx="1" />
                <rect x="66" y="38" width="6" height="6" rx="1" />
                <rect x="76" y="38" width="6" height="6" rx="1" />
                <rect x="86" y="38" width="6" height="6" rx="1" />

                <rect x="8" y="38" width="6" height="6" rx="1" />
                <rect x="18" y="38" width="6" height="6" rx="1" />
                <rect x="28" y="38" width="6" height="6" rx="1" />
                <rect x="8" y="48" width="6" height="6" rx="1" />
                <rect x="28" y="48" width="6" height="6" rx="1" />
                <rect x="18" y="58" width="6" height="6" rx="1" />

                <rect x="36" y="66" width="6" height="6" rx="1" />
                <rect x="46" y="66" width="6" height="6" rx="1" />
                <rect x="56" y="66" width="6" height="6" rx="1" />
                <rect x="36" y="76" width="6" height="6" rx="1" />
                <rect x="56" y="76" width="6" height="6" rx="1" />
                <rect x="46" y="86" width="6" height="6" rx="1" />
                <rect x="56" y="86" width="6" height="6" rx="1" />

                <rect x="68" y="68" width="6" height="6" rx="1" />
                <rect x="78" y="68" width="6" height="6" rx="1" />
                <rect x="88" y="68" width="6" height="6" rx="1" />
                <rect x="68" y="78" width="6" height="6" rx="1" />
                <rect x="88" y="78" width="6" height="6" rx="1" />
                <rect x="78" y="88" width="6" height="6" rx="1" />
                <rect x="88" y="88" width="6" height="6" rx="1" />

                {/* Center Badge Shield */}
                <circle cx="50" cy="50" r="12" fill="white" />
                <circle cx="50" cy="50" r="10" fill="#178596" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Dynamic Security Pulse Overlay */}
            <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[8px] font-bold">
              {countdown}s
            </div>
          </div>

          {/* DNV & Validation Info */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2 text-left">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-semibold">Código de Uso (DNV):</span>
              <div className="flex items-center gap-1">
                <span className="font-mono font-bold text-slate-800">{cieData.dnvCode}</span>
                <button
                  type="button"
                  onClick={handleCopyDnv}
                  className="p-1 text-slate-500 hover:text-slate-800"
                  title="Copiar DNV"
                >
                  {copiedDnv ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-semibold">Validade Oficial:</span>
              <span className="font-bold text-emerald-600">{cieData.validUntil}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-semibold">Certificado Digital:</span>
              <span className="font-mono text-[11px] text-slate-700">{cieData.certificateNumber}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleCopyValidationUrl}
              className="w-full py-2.5 px-4 rounded-xl bg-[#178596] hover:bg-[#126b79] active:bg-[#0c515c] text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Link de Validação Copiado!</span>
                </>
              ) : (
                <>
                  <ExternalLink className="w-4 h-4" />
                  <span>Copiar Link do Validador Oficial</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setHighBrightness(!highBrightness)}
              className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>{highBrightness ? 'Modo Normal de Brilho' : 'Brilho Máximo para Portaria'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
