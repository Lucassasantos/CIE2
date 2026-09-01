import React, { useState } from 'react';
import { 
  CreditCard, 
  Plus, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  Sliders, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Copy, 
  Check,
  Image as ImageIcon
} from 'lucide-react';
import { WalletCard, Transaction } from '../../types';
import { formatCurrency } from '../../utils/imageParser';

interface CarteirasTabProps {
  cards: WalletCard[];
  transactions: Transaction[];
  onOpenImageManager: () => void;
  onInspectImage: (url: string, title?: string, html?: string) => void;
  onAddNewVirtualCard: () => void;
}

export const CarteirasTab: React.FC<CarteirasTabProps> = ({
  cards,
  transactions,
  onOpenImageManager,
  onInspectImage,
  onAddNewVirtualCard,
}) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [lockedCards, setLockedCards] = useState<Record<string, boolean>>({});
  const [copiedNumber, setCopiedNumber] = useState(false);

  const currentCard = cards[activeCardIndex] || cards[0];
  const isCardLocked = lockedCards[currentCard?.id] || false;

  const toggleLockCard = (cardId: string) => {
    setLockedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const handleCopyCardNumber = (number: string) => {
    navigator.clipboard.writeText(number);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const walletBreakdown = [
    { title: 'Saldo em Conta Corrente', amount: 8450.00, yieldText: '+100% do CDI', color: 'text-teal-700 bg-teal-50' },
    { title: 'Investimentos & CDB', amount: 14200.00, yieldText: '+118% do CDI', color: 'text-emerald-700 bg-emerald-50' },
    { title: 'Cashback & Recompensas', amount: 245.50, yieldText: 'Disponível p/ resgate', color: 'text-amber-700 bg-amber-50' },
  ];

  return (
    <div id="tab-carteiras-container" className="p-4 sm:p-5 space-y-5 pb-8 animate-fade-in">
      {/* Cards Header & Add Card */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">Meus Cartões</h2>
          <p className="text-xs text-slate-500">Físico e virtuais com proteção ativa</p>
        </div>
        <button
          type="button"
          onClick={onAddNewVirtualCard}
          className="px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#178596] text-xs font-bold transition-colors flex items-center gap-1 border border-teal-200"
        >
          <Plus className="w-3.5 h-3.5" />
          Novo Virtual
        </button>
      </div>

      {/* Interactive Credit / Debit Card Display */}
      {currentCard && (
        <div className="space-y-3">
          <div
            className={`relative rounded-3xl p-5 text-white shadow-xl overflow-hidden aspect-[1.586/1] flex flex-col justify-between transition-all duration-300 ${
              isCardLocked ? 'grayscale opacity-75' : ''
            }`}
          >
            {/* Custom Background Image / Direct Link if configured */}
            {currentCard.bgImageUrl ? (
              <>
                <img
                  src={currentCard.bgImageUrl}
                  alt={currentCard.name}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/50 to-transparent" />
              </>
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-tr ${currentCard.colorScheme}`} />
            )}

            {/* Top of card: Brand and Type */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/20 backdrop-blur-md">
                  {currentCard.type === 'virtual' ? 'Cartão Virtual' : 'Cartão Principal'}
                </span>
                {isCardLocked && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" /> Bloqueado
                  </span>
                )}
              </div>
              <span className="font-extrabold text-sm tracking-wider uppercase font-mono">
                {currentCard.brand.toUpperCase()}
              </span>
            </div>

            {/* Middle of card: Chip & Contactless */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="w-10 h-7 rounded-md bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 border border-amber-500/50 shadow-inner flex items-center justify-center opacity-90">
                <div className="w-6 h-4 border border-amber-600/40 rounded-sm" />
              </div>
              <button
                type="button"
                onClick={() =>
                  currentCard.bgImageUrl &&
                  onInspectImage(currentCard.bgImageUrl, `Fundo do ${currentCard.name}`)
                }
                className="p-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-white/80 hover:text-white backdrop-blur-md transition-colors"
                title="Inspecionar Imagem de Fundo do Cartão"
              >
                <ImageIcon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bottom of card: Number, Name, Expiry, CVV */}
            <div className="relative z-10 space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-mono text-base sm:text-lg tracking-widest font-semibold drop-shadow-sm">
                  {showCardDetails ? '4829 •••• •••• 9104' : currentCard.numberMasked}
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyCardNumber(currentCard.numberMasked)}
                  className="p-1 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                  title="Copiar número"
                >
                  {copiedNumber ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="flex items-end justify-between text-xs">
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-slate-300">Titular</div>
                  <div className="font-bold tracking-wide">{currentCard.holderName}</div>
                </div>
                <div className="flex items-center gap-4 text-right font-mono">
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-slate-300">Validade</div>
                    <div className="font-semibold">{currentCard.expiryDate}</div>
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-slate-300">CVV</div>
                    <div className="font-semibold">{showCardDetails ? currentCard.cvv : '•••'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cards Switcher Tabs */}
          <div className="flex items-center justify-center gap-2">
            {cards.map((card, idx) => (
              <button
                key={card.id}
                type="button"
                onClick={() => setActiveCardIndex(idx)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  idx === activeCardIndex
                    ? 'bg-[#178596] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {card.name}
              </button>
            ))}
          </div>

          {/* Card Management Controls */}
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setShowCardDetails(!showCardDetails)}
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 transition-all flex flex-col items-center justify-center text-center gap-1"
            >
              {showCardDetails ? <EyeOff className="w-4 h-4 text-teal-700" /> : <Eye className="w-4 h-4 text-teal-700" />}
              <span className="text-[11px] font-bold text-slate-700">
                {showCardDetails ? 'Ocultar CVV' : 'Ver CVV/Dados'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => toggleLockCard(currentCard.id)}
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 transition-all flex flex-col items-center justify-center text-center gap-1"
            >
              {isCardLocked ? <Unlock className="w-4 h-4 text-emerald-600" /> : <Lock className="w-4 h-4 text-rose-600" />}
              <span className="text-[11px] font-bold text-slate-700">
                {isCardLocked ? 'Desbloquear' : 'Bloquear'}
              </span>
            </button>

            <button
              type="button"
              onClick={onOpenImageManager}
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 transition-all flex flex-col items-center justify-center text-center gap-1"
            >
              <Sparkles className="w-4 h-4 text-[#178596]" />
              <span className="text-[11px] font-bold text-slate-700">Trocar Fundo</span>
            </button>
          </div>
        </div>
      )}

      {/* Wallet Balances Breakdown */}
      <div className="space-y-2.5">
        <h2 className="text-sm font-bold text-slate-900 tracking-tight">Composição da Carteira</h2>

        <div className="space-y-2">
          {walletBreakdown.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-between hover:shadow-xs transition-all"
            >
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-slate-800">{item.title}</div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${item.color}`}>
                  {item.yieldText}
                </span>
              </div>
              <div className="text-sm font-extrabold text-slate-900">
                {formatCurrency(item.amount)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statements & History */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">Extrato Recente</h2>
          <span className="text-xs font-semibold text-slate-500">Agosto 2026</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 divide-y divide-slate-100 overflow-hidden">
          {transactions.map((tx) => (
            <div key={tx.id} className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                    tx.type === 'in' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {tx.type === 'in' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">{tx.title}</div>
                  <div className="text-[11px] text-slate-500">{tx.date} • {tx.recipientOrSender}</div>
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`text-xs font-bold ${
                    tx.type === 'in' ? 'text-emerald-600' : 'text-slate-900'
                  }`}
                >
                  {tx.type === 'in' ? '+' : '-'} {formatCurrency(tx.amount)}
                </div>
                <span className="text-[10px] text-slate-400 capitalize">{tx.method}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
