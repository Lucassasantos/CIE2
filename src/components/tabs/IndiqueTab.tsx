import React, { useState } from 'react';
import { 
  Copy, 
  Share2, 
  Check, 
  Sparkles 
} from 'lucide-react';
import { EditableText } from '../EditableText';
import { useEditMode } from '../../context/EditModeContext';

interface IndiqueTabProps {
  [key: string]: any;
}

export const IndiqueTab: React.FC<IndiqueTabProps> = () => {
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { isEditMode } = useEditMode();

  const defaultUrl = 'https://site.abafe.org.br/checkout?indicacao=LUCAS123';

  const handleCopyLink = () => {
    const savedUrl = localStorage.getItem('app_editable_text_indique_link_url') || defaultUrl;
    navigator.clipboard.writeText(savedUrl);
    setCopied(true);
    setToastMessage('Link copiado com sucesso!');
    setTimeout(() => {
      setCopied(false);
      setToastMessage(null);
    }, 2500);
  };

  const handleShare = async () => {
    const savedUrl = localStorage.getItem('app_editable_text_indique_link_url') || defaultUrl;
    const shareData = {
      title: 'Emita sua Carteirinha do Estudante',
      text: 'Emita sua carteirinha com meu link e garanta meia-entrada!',
      url: savedUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or share failed, fallback
      }
    } else {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareData.text} ${savedUrl}`)}`, '_blank');
    }
  };

  return (
    <div id="tab-indique-container" className="p-4 sm:p-5 space-y-4 pb-12 animate-fade-in">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-teal-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* CARD 1: DESAFIO (WHITE CARD) */}
      <div 
        id="card-indique-desafio"
        className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-3.5"
      >
        {/* Top Badges Row */}
        <div className="flex items-center">
          <span className="px-3.5 py-1 rounded-full text-[11px] font-black tracking-wider uppercase bg-[#178596] text-white inline-flex items-center shadow-xs">
            <EditableText id="indique_badge_desafio" defaultText="DESAFIO" />
          </span>
          <span className="text-[#d97706] font-bold text-xs sm:text-sm ml-2.5 inline-flex items-center">
            <EditableText id="indique_dias_restantes" defaultText="0 dias restantes" />
          </span>
        </div>

        {/* Main Headline */}
        <h2 className="text-2xl sm:text-[26px] font-extrabold text-[#0f172a] tracking-tight leading-[1.2] pt-1">
          <EditableText 
            id="indique_card1_title" 
            defaultText="Faça sua carteirinha sair de graça" 
          />
        </h2>

        {/* Subtitle / Description */}
        <p className="text-sm text-slate-600 leading-relaxed">
          <EditableText 
            id="indique_card1_desc" 
            defaultText="Basta que 3 colegas emitam a carteirinha com seu link e você recebe o valor da sua carteirinha de volta via PIX." 
          />
        </p>

        {/* Progress Section */}
        <div className="space-y-2 pt-2">
          <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
            <EditableText id="indique_progresso_label" defaultText="SEU PROGRESSO" />
          </div>

          <div className="flex items-center gap-2.5 pt-1">
            {/* 3 Step Boxes */}
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border-2 border-slate-200/90 bg-white shadow-xs" />
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border-2 border-slate-200/90 bg-white shadow-xs" />
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border-2 border-slate-200/90 bg-white shadow-xs" />

            <span className="text-sm sm:text-base font-extrabold text-slate-900 ml-3">
              <EditableText id="indique_progresso_count" defaultText="0 de 3" />
            </span>
          </div>
        </div>
      </div>

      {/* CARD 2: SEU LINK DE INDICAÇÃO (TEAL CARD) */}
      <div 
        id="card-indique-link"
        className="bg-[#178596] rounded-3xl p-5 sm:p-6 text-white shadow-sm space-y-3.5"
      >
        <div className="text-[11px] font-extrabold text-teal-100 tracking-widest uppercase">
          <EditableText id="indique_card2_label" defaultText="SEU LINK DE INDICAÇÃO" />
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
          <EditableText 
            id="indique_card2_title" 
            defaultText="Compartilhe e comece a ganhar agora" 
          />
        </h3>

        {/* Link Input Box */}
        <div className="bg-[#0e6371]/80 border border-white/20 rounded-2xl px-4 py-3.5 flex items-center shadow-inner overflow-hidden">
          <div className="text-xs sm:text-sm font-medium text-white/95 truncate w-full">
            <EditableText 
              id="indique_link_url" 
              defaultText="https://site.abafe.org.br/checkout?indicacao=LUCAS123" 
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            onClick={handleCopyLink}
            className="py-3.5 px-3 sm:px-4 rounded-2xl bg-[#0e6371]/90 hover:bg-[#0c535f] border border-white/20 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-xs active:scale-[0.98]"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copiado!' : <EditableText id="indique_btn_copiar_text" defaultText="Copiar link" />}</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="py-3.5 px-3 sm:px-4 rounded-2xl bg-white hover:bg-slate-50 text-[#178596] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]"
          >
            <Share2 className="w-4 h-4 text-[#178596]" />
            <span><EditableText id="indique_btn_compartilhar_text" defaultText="Compartilhar" /></span>
          </button>
        </div>
      </div>
    </div>
  );
};
