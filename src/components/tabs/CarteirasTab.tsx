import React from 'react';
import { EditableText } from '../EditableText';

interface CarteirasTabProps {
  [key: string]: any;
}

export const CarteirasTab: React.FC<CarteirasTabProps> = () => {
  return (
    <div id="tab-carteiras-container" className="p-4 sm:p-5 space-y-4 pb-12 animate-fade-in">
      {/* CARD 1: CARTEIRA 2026 */}
      <div 
        id="card-carteira-item-2026"
        className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4"
      >
        {/* Top Header: Title & Approved Badge */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight">
            <EditableText id="carteira_card_title" defaultText="Carteira 2026" />
          </h2>
          
          <span className="px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold bg-[#10b981] text-white shadow-xs inline-flex items-center">
            <EditableText id="carteira_badge_status" defaultText="Aprovada" />
          </span>
        </div>

        {/* Student Info Details */}
        <div className="space-y-1 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
          <div>
            <EditableText id="carteira_item_modelo" defaultText="Modelo: Digital" />
          </div>
          <div>
            <EditableText id="carteira_item_instituicao" defaultText="IFRS" />
          </div>
          <div className="leading-snug">
            <EditableText id="carteira_item_curso" defaultText="Curso:  Assistente de Contabilidade" />
          </div>
        </div>

        {/* Validade Row */}
        <div className="flex items-center justify-between pt-2 text-sm sm:text-base text-slate-800">
          <span className="text-slate-600">
            <EditableText id="carteira_validade_label" defaultText="Validade:" />
          </span>
          <span className="font-bold text-[#0f172a]">
            <EditableText id="carteira_validade_valor" defaultText="31/03/2027" />
          </span>
        </div>

        {/* Active Pill Badge at Bottom */}
        <div className="pt-1">
          <span className="inline-block px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#dcfce7] text-[#16a34a] border border-emerald-100">
            <EditableText id="carteira_tag_ativa" defaultText="Carteira Ativa" />
          </span>
        </div>
      </div>

      {/* CARD 2: DOCUMENTOS NECESSÁRIOS */}
      <div 
        id="card-carteira-documentos"
        className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-3.5"
      >
        <h3 className="text-lg sm:text-xl font-bold text-[#0f172a] tracking-tight">
          <EditableText id="carteira_docs_title" defaultText="Documentos necessários" />
        </h3>

        <ul className="space-y-2 text-sm sm:text-base text-slate-600 leading-relaxed list-none">
          <li>
            <EditableText id="carteira_doc_item_1" defaultText="• Foto 3x4 recente" />
          </li>
          <li>
            <EditableText id="carteira_doc_item_2" defaultText="• Comprovante de matrícula" />
          </li>
          <li>
            <EditableText id="carteira_doc_item_3" defaultText="• Dados pessoais atualizados" />
          </li>
          <li>
            <EditableText id="carteira_doc_item_4" defaultText="• Informações da instituição" />
          </li>
        </ul>
      </div>
    </div>
  );
};
