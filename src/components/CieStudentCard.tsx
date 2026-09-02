import React, { useState } from 'react';
import { 
  QrCode, 
  RotateCw, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink, 
  Camera, 
  FileText, 
  Calendar, 
  GraduationCap, 
  Building2, 
  BadgeCheck, 
  Lock,
  Share2,
  Copy,
  Check
} from 'lucide-react';
import { StudentCieData } from '../types';
import { useEditMode } from '../context/EditModeContext';

interface CieStudentCardProps {
  cieData: StudentCieData;
  onOpenQrModal: () => void;
  onOpenImageManager: () => void;
  onInspectImage: (url: string, title?: string, html?: string) => void;
}

export const CieStudentCard: React.FC<CieStudentCardProps> = ({
  cieData,
  onOpenQrModal,
  onOpenImageManager,
  onInspectImage,
}) => {
  const { isEditMode } = useEditMode();
  const [isFlipped, setIsFlipped] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);


  const handleCopyDnv = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(cieData.dnvCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div id="cie-student-card-wrapper" className="space-y-3 select-none">
      {/* Top Header info and quick flip toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Carteira Digital do Estudante (CIE)
          </h2>
        </div>
        <button
          type="button"
          onClick={() => setIsFlipped(!isFlipped)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          title="Girar carteirinha para ver o verso"
        >
          <RotateCw className={`w-3.5 h-3.5 transition-transform duration-300 ${isFlipped ? 'rotate-180 text-[#178596]' : ''}`} />
          <span>{isFlipped ? 'Ver Frente' : 'Ver Verso'}</span>
        </button>
      </div>

      {/* Main 3D Flippable Card */}
      <div 
        className="relative w-full rounded-3xl overflow-hidden shadow-xl border border-teal-800/30 transition-all duration-500 group cursor-pointer"
        style={{ perspective: '1000px' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {!isFlipped ? (
          /* FRONT SIDE */
          <div className="bg-gradient-to-br from-[#0c515c] via-[#126b79] to-[#178596] text-white p-4 sm:p-5 relative overflow-hidden flex flex-col justify-between min-h-[225px] sm:min-h-[235px]">
            {/* Guilloche / Security Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-teal-200 to-transparent bg-cover" />
            <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-teal-400/10 blur-2xl pointer-events-none" />
            <div className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />

            {/* Holographic Top Security Strip */}
            <div className="flex items-center justify-between pb-3 border-b border-white/20">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                  <GraduationCap className="w-3.5 h-3.5 text-teal-200" />
                </div>
                <div>
                  <div className="text-[10px] font-extrabold tracking-widest text-teal-200 uppercase leading-none">
                    DOCUMENTO NACIONAL DO ESTUDANTE
                  </div>
                  <div className="text-[9px] font-medium text-teal-100/80 leading-tight">
                    CIE • LEI FEDERAL Nº 12.933/2013
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/25 border border-emerald-400/40 text-emerald-200 text-[10px] font-bold">
                <BadgeCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>VÁLIDA</span>
              </div>
            </div>

            {/* Student Body (Photo + Details + Quick QR) */}
            <div className="grid grid-cols-12 gap-3 py-3 items-center">
              {/* Student Photo 3x4 */}
              <div className="col-span-4 sm:col-span-3">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-900 border-2 border-white/40 shadow-md group/photo">
                  <img
                    src={cieData.photoUrl}
                    alt={cieData.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {/* Photo Edit Direct Link Overlay */}
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenImageManager();
                      }}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover/photo:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[9px] font-bold p-1 text-center"
                      title="Trocar Foto da Carteirinha via link direto"
                    >
                      <Camera className="w-4 h-4 mb-0.5 text-teal-300" />
                      <span>Trocar Foto</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Student Text Data */}
              <div className="col-span-5 sm:col-span-6 space-y-1.5 leading-tight">
                <div>
                  <span className="text-[9px] uppercase font-bold text-teal-200/90 block">Nome do Estudante</span>
                  <div className="text-xs sm:text-sm font-extrabold text-white tracking-tight truncate">
                    {cieData.name}
                  </div>
                </div>

                <div>
                  <span className="text-[9px] uppercase font-bold text-teal-200/90 block">Instituição de Ensino</span>
                  <div className="text-[11px] font-bold text-teal-50 truncate">
                    {cieData.institution}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div>
                    <span className="text-[8px] uppercase font-semibold text-teal-200/80 block">Curso</span>
                    <span className="font-bold text-white truncate block">{cieData.course}</span>
                  </div>
                  <div>
                    <span className="text-[8px] uppercase font-semibold text-teal-200/80 block">Nível</span>
                    <span className="font-bold text-white truncate block">{cieData.educationLevel}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div>
                    <span className="text-[8px] uppercase font-semibold text-teal-200/80 block">Matrícula</span>
                    <span className="font-mono font-bold text-teal-100 truncate block">{cieData.registrationNumber}</span>
                  </div>
                  <div>
                    <span className="text-[8px] uppercase font-semibold text-teal-200/80 block">Validade</span>
                    <span className="font-bold text-emerald-300 truncate block">{cieData.validUntil}</span>
                  </div>
                </div>
              </div>

              {/* Official QR Code Mini Display */}
              <div className="col-span-3 sm:col-span-3 flex flex-col items-center justify-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenQrModal();
                  }}
                  className="p-2 rounded-2xl bg-white text-slate-900 shadow-md hover:scale-105 active:scale-95 transition-transform flex flex-col items-center group/qr"
                  title="Clique para expandir QR Code oficial para meia-entrada"
                >
                  <QrCode className="w-10 h-10 sm:w-12 sm:h-12 text-[#0c515c]" />
                  <span className="text-[8px] font-extrabold text-[#0c515c] uppercase tracking-tighter mt-0.5">
                    Meia-Entrada
                  </span>
                </button>
                <span className="text-[8px] text-teal-200 mt-1 font-semibold text-center">Toque p/ Validar</span>
              </div>
            </div>

            {/* Bottom Bar: Security Certification & DNV */}
            <div className="pt-2 border-t border-white/20 flex items-center justify-between text-[9px] text-teal-100/90 font-mono">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-300" />
                <span>DNV: <strong>{cieData.dnvCode}</strong></span>
                <button
                  type="button"
                  onClick={handleCopyDnv}
                  className="ml-1 p-0.5 hover:text-white transition-colors"
                  title="Copiar Código DNV"
                >
                  {copiedCode ? <Check className="w-2.5 h-2.5 text-emerald-300" /> : <Copy className="w-2.5 h-2.5" />}
                </button>
              </div>
              <span className="text-[8px] uppercase font-sans text-teal-200/80 tracking-tight">
                {cieData.issuerEntity}
              </span>
            </div>
          </div>
        ) : (
          /* BACK SIDE */
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white p-4 sm:p-5 relative overflow-hidden flex flex-col justify-between min-h-[225px] sm:min-h-[235px]">
            <div className="flex items-center justify-between pb-2 border-b border-white/15">
              <div className="flex items-center gap-1.5 text-xs font-bold text-teal-200">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>CERTIFICAÇÃO DIGITAL PADRÃO ITI / ICP-BRASIL</span>
              </div>
              <span className="text-[9px] font-mono text-teal-300">{cieData.certificateNumber}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 py-2 text-[10px]">
              <div className="space-y-1">
                <div>
                  <span className="text-[8px] text-slate-400 uppercase">RG do Titular</span>
                  <div className="font-bold text-white font-mono">{cieData.rg}</div>
                </div>
                <div>
                  <span className="text-[8px] text-slate-400 uppercase">CPF Mascarado</span>
                  <div className="font-bold text-white font-mono">{cieData.cpfMasked}</div>
                </div>
                <div>
                  <span className="text-[8px] text-slate-400 uppercase">Data de Nascimento</span>
                  <div className="font-bold text-white">{cieData.birthDate}</div>
                </div>
              </div>

              <div className="space-y-1">
                <div>
                  <span className="text-[8px] text-slate-400 uppercase">Órgão Emissor Oficial</span>
                  <div className="font-bold text-white">{cieData.issuerEntity}</div>
                </div>
                <div>
                  <span className="text-[8px] text-slate-400 uppercase">Chave de Autenticidade</span>
                  <div className="font-mono text-[9px] text-teal-300 break-all leading-tight">
                    SHA256: 9F8A...21DE
                  </div>
                </div>
                <div>
                  <span className="text-[8px] text-slate-400 uppercase">Selo de Segurança</span>
                  <div className="font-bold text-emerald-400 text-[9px]">{cieData.securitySeal}</div>
                </div>
              </div>
            </div>

            {/* Barcode & Flip back prompt */}
            <div className="pt-2 border-t border-white/15 flex items-center justify-between">
              <div className="space-y-0.5">
                {/* Simulated Barcode */}
                <div className="h-6 w-32 bg-white rounded p-0.5 flex items-stretch gap-0.5 justify-between">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`bg-slate-900 ${i % 3 === 0 ? 'w-1' : i % 5 === 0 ? 'w-1.5' : 'w-0.5'}`} 
                    />
                  ))}
                </div>
                <span className="text-[7px] font-mono text-slate-400 block">{cieData.dnvCode}</span>
              </div>

              <div className="text-right">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(false);
                  }}
                  className="text-xs font-bold text-teal-300 hover:text-teal-100 flex items-center gap-1"
                >
                  <RotateCw className="w-3 h-3" />
                  Voltar à Frente
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Card Quick Action Bar Under the Card */}
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={onOpenQrModal}
          className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 active:bg-teal-200 border border-teal-200 text-[#0c515c] text-xs font-bold transition-all shadow-xs"
        >
          <QrCode className="w-3.5 h-3.5 text-[#178596]" />
          <span>Apresentar Meia</span>
        </button>

        <button
          type="button"
          onClick={onOpenImageManager}
          className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold transition-all shadow-xs"
        >
          <Camera className="w-3.5 h-3.5 text-[#178596]" />
          <span>Trocar Foto / Logo</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'Minha Carteira de Estudante CIE',
                text: `Documento Nacional do Estudante - ${cieData.name} - DNV: ${cieData.dnvCode}`,
                url: window.location.href,
              }).catch(() => {});
            } else {
              navigator.clipboard.writeText(`CIE Estudante: ${cieData.name} - DNV: ${cieData.dnvCode}`);
              alert('Dados da CIE copiados para a área de transferência!');
            }
          }}
          className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold transition-all shadow-xs"
        >
          <Share2 className="w-3.5 h-3.5 text-[#178596]" />
          <span>Compartilhar</span>
        </button>
      </div>
    </div>
  );
};
