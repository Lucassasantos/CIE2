import React from 'react';
import { 
  Users, 
  CreditCard, 
  Calendar, 
  ShoppingBag 
} from 'lucide-react';
import { EditableText } from '../EditableText';

interface AvisosTabProps {
  [key: string]: any;
}

export const AvisosTab: React.FC<AvisosTabProps> = () => {
  return (
    <div id="tab-notificacoes-container" className="p-4 sm:p-5 space-y-8 pt-8 pb-12 animate-fade-in">
      {/* Centered Loading / Empty state text */}
      <div className="text-center py-6">
        <p className="text-sm sm:text-base text-slate-500 font-normal">
          <EditableText 
            id="notificacoes_loading_text" 
            defaultText="Carregando notificações..." 
          />
        </p>
      </div>

      {/* Card: Tipos de notificação */}
      <div 
        id="card-tipos-notificacao"
        className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-5"
      >
        <h2 className="text-base sm:text-lg font-bold text-[#0f172a] tracking-tight">
          <EditableText 
            id="notificacoes_tipos_title" 
            defaultText="Tipos de notificação" 
          />
        </h2>

        <div className="space-y-4 pt-1">
          {/* Item 1: Novidades sobre indicações */}
          <div className="flex items-center gap-3.5">
            <Users className="w-5 h-5 text-[#0284c7] shrink-0" />
            <span className="text-sm sm:text-base font-normal text-slate-700">
              <EditableText 
                id="notificacoes_item_1" 
                defaultText="Novidades sobre indicações" 
              />
            </span>
          </div>

          {/* Item 2: Atualizações de carteira */}
          <div className="flex items-center gap-3.5">
            <CreditCard className="w-5 h-5 text-[#7c3aed] shrink-0" />
            <span className="text-sm sm:text-base font-normal text-slate-700">
              <EditableText 
                id="notificacoes_item_2" 
                defaultText="Atualizações de carteira" 
              />
            </span>
          </div>

          {/* Item 3: Lembretes de renovação */}
          <div className="flex items-center gap-3.5">
            <Calendar className="w-5 h-5 text-[#f59e0b] shrink-0" />
            <span className="text-sm sm:text-base font-normal text-slate-700">
              <EditableText 
                id="notificacoes_item_3" 
                defaultText="Lembretes de renovação" 
              />
            </span>
          </div>

          {/* Item 4: Promoções exclusivas */}
          <div className="flex items-center gap-3.5">
            <ShoppingBag className="w-5 h-5 text-[#10b981] shrink-0" />
            <span className="text-sm sm:text-base font-normal text-slate-700">
              <EditableText 
                id="notificacoes_item_4" 
                defaultText="Promoções exclusivas" 
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
