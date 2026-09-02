import React, { useState } from 'react';
import { 
  UserPlus, 
  Copy, 
  Check, 
  Share2, 
  Gift, 
  TrendingUp, 
  Users, 
  Sparkles, 
  ChevronRight, 
  MessageCircle, 
  Send,
  Award,
  Plus
} from 'lucide-react';
import { InvitedFriend } from '../../types';
import { formatCurrency } from '../../utils/imageParser';
import { DirectHtmlImageCard } from '../DirectHtmlImageCard';
import { EditableText } from '../EditableText';

interface IndiqueTabProps {
  friends: InvitedFriend[];
  onSimulateReferral: () => void;
  onOpenImageManager: () => void;
  onInspectImage: (url: string, title?: string, html?: string) => void;
  campaignImageUrl?: string;
}

export const IndiqueTab: React.FC<IndiqueTabProps> = ({
  friends,
  onSimulateReferral,
  onOpenImageManager,
  onInspectImage,
  campaignImageUrl = 'https://images.unsplash.com/photo-1556742049-0a67e557224f?auto=format&fit=crop&w=1000&q=80',
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const referralCode = 'LUCAS-VIP77';
  const referralUrl = `https://app.fin/convite/${referralCode}`;

  const completedFriends = friends.filter((f) => f.status === 'completed');
  const totalEarned = completedFriends.reduce((acc, curr) => acc + curr.rewardEarned, 0);
  const pendingFriends = friends.filter((f) => f.status === 'pending');
  const pendingAmount = pendingFriends.length * 30.00;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = `Ganhe R$ 30 de bônus abrindo sua conta comigo usando meu código ${referralCode}! Acesse: ${referralUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div id="tab-indique-container" className="p-4 sm:p-5 space-y-5 pb-8 animate-fade-in">
      {/* Campaign Visual Banner (Loaded via Direct Image Link) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <Gift className="w-4 h-4 text-[#178596]" />
            Banner da Campanha
          </div>
          <button
            type="button"
            onClick={onOpenImageManager}
            className="text-[11px] font-bold text-[#178596] hover:underline flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            Trocar Imagem do Banner
          </button>
        </div>

        <DirectHtmlImageCard
          srcOrHtml={campaignImageUrl}
          title="Indique e Ganhe R$ 30,00"
          subtitle="Para cada amigo que abrir conta e fizer a primeira transação"
          badge="BÔNUS EM DOBRO"
          aspectRatio="banner"
          onInspect={() => onInspectImage(campaignImageUrl, 'Banner Indique e Ganhe')}
        />
      </div>

      {/* Referral Code & Share Link Box */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-sm font-bold text-slate-900">
            <EditableText id="indique_box_title" defaultText="Seu Código de Indicação Exclusivo" />
          </h2>
          <p className="text-xs text-slate-500">
            <EditableText id="indique_box_subtitle" defaultText="Envie para seus contatos e ganhe bônus direto no seu saldo" />
          </p>
        </div>

        {/* Code Card with Copy */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-teal-50/70 border-2 border-dashed border-teal-600/40">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800">Código VIP</span>
            <div className="text-lg sm:text-xl font-extrabold text-[#178596] tracking-widest font-mono">
              {referralCode}
            </div>
          </div>
          <button
            type="button"
            onClick={handleCopyCode}
            className="px-3.5 py-2 rounded-xl bg-[#178596] hover:bg-teal-800 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
          >
            {copiedCode ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copiar
              </>
            )}
          </button>
        </div>

        {/* Quick Social Share Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </button>
          <button
            type="button"
            onClick={handleCopyLink}
            className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            {copiedLink ? 'Link Copiado' : 'Copiar Link'}
          </button>
          <button
            type="button"
            onClick={onSimulateReferral}
            className="col-span-2 sm:col-span-1 py-2.5 px-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#178596] text-xs font-bold flex items-center justify-center gap-1.5 border border-teal-200 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            Simular Indicação
          </button>
        </div>
      </div>

      {/* Rewards Metrics Cards */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Ganho</span>
          <div className="text-base font-extrabold text-emerald-600 mt-0.5">
            {formatCurrency(totalEarned)}
          </div>
          <span className="text-[10px] text-slate-500">{completedFriends.length} concluídos</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">A Receber</span>
          <div className="text-base font-extrabold text-amber-600 mt-0.5">
            {formatCurrency(pendingAmount)}
          </div>
          <span className="text-[10px] text-slate-500">{pendingFriends.length} pendentes</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Convidados</span>
          <div className="text-base font-extrabold text-slate-800 mt-0.5">
            {friends.length}
          </div>
          <span className="text-[10px] text-slate-500">Amigos no total</span>
        </div>
      </div>

      {/* Milestone / Level Progress */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-900 to-cyan-900 text-white space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-300" />
            <div>
              <div className="text-xs font-bold">Meta Próximo Nível (VIP 2)</div>
              <div className="text-[11px] text-teal-200">Indique 5 amigos para bônus extra de R$ 50</div>
            </div>
          </div>
          <span className="text-xs font-extrabold text-amber-300">
            {completedFriends.length}/5
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
          <div
            className="h-full bg-amber-400 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, (completedFriends.length / 5) * 100)}%` }}
          />
        </div>
      </div>

      {/* Friends List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#178596]" />
            <h2 className="text-sm font-bold text-slate-800 tracking-tight">
              Amigos Indicados ({friends.length})
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 divide-y divide-slate-100 overflow-hidden">
          {friends.map((friend) => (
            <div key={friend.id} className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={friend.avatarUrl}
                    alt={friend.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  {friend.status === 'completed' && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </span>
                  )}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">{friend.name}</div>
                  <div className="text-[11px] text-slate-500">{friend.date} • {friend.email}</div>
                </div>
              </div>

              <div className="text-right">
                {friend.status === 'completed' ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    +R$ 30,00 Pago
                  </span>
                ) : friend.status === 'pending' ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                    Em Validação
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                    Iniciado
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
