import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Link as LinkIcon, 
  Code2, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Home, 
  UserPlus, 
  IdCard, 
  Bell,
  HelpCircle,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { TabType, ImageResource } from '../types';
import { parseImageInput, generateHtmlSnippet } from '../utils/imageParser';
import { PRESET_IMAGE_GALLERY } from '../data/defaultData';

interface ImageLinkManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddImage: (resource: {
    title: string;
    url: string;
    htmlSnippet?: string;
    targetTab: TabType;
    category: 'banner' | 'promo' | 'card' | 'avatar' | 'custom';
    targetHref?: string;
  }) => void;
  customImages: ImageResource[];
}

export const ImageLinkManagerModal: React.FC<ImageLinkManagerModalProps> = ({
  isOpen,
  onClose,
  onAddImage,
  customImages,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'create' | 'gallery' | 'guide'>('create');
  const [inputMode, setInputMode] = useState<'url' | 'html'>('url');
  const [inputValue, setInputValue] = useState('');
  const [title, setTitle] = useState('');
  const [targetDestination, setTargetDestination] = useState<'banner_inicio' | 'photo_cie' | 'indique' | 'carteiras' | 'avisos'>('photo_cie');
  const [targetHref, setTargetHref] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const parsed = parseImageInput(inputValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parsed.src) return;

    const finalTitle = title.trim() || (inputMode === 'html' ? 'Imagem HTML' : 'Nova Imagem Direta');
    const finalHtml = inputMode === 'html' ? inputValue : generateHtmlSnippet(parsed.src, finalTitle, targetHref);

    let tab: TabType = 'inicio';
    let category: 'banner' | 'promo' | 'card' | 'avatar' | 'custom' = 'banner';

    if (targetDestination === 'photo_cie') {
      tab = 'inicio';
      category = 'avatar';
    } else if (targetDestination === 'banner_inicio') {
      tab = 'inicio';
      category = 'banner';
    } else if (targetDestination === 'indique') {
      tab = 'indique';
      category = 'promo';
    } else if (targetDestination === 'carteiras') {
      tab = 'carteiras';
      category = 'card';
    } else if (targetDestination === 'avisos') {
      tab = 'avisos';
      category = 'banner';
    }

    onAddImage({
      title: finalTitle,
      url: parsed.src,
      htmlSnippet: finalHtml,
      targetTab: tab,
      category: category,
      targetHref: targetHref.trim() || undefined,
    });

    const destinationLabels: Record<string, string> = {
      photo_cie: 'Foto 3x4 da Carteira Estudantil (CIE)',
      banner_inicio: 'Banner da Página Inicial',
      indique: 'Campanha Indique e Ganhe',
      carteiras: 'Fundo do Cartão da Carteira',
      avisos: 'Avisos e Notificações',
    };

    setSuccessMessage(`Imagem aplicada com sucesso em "${destinationLabels[targetDestination]}"!`);
    setInputValue('');
    setTitle('');
    setTargetHref('');

    setTimeout(() => {
      setSuccessMessage(null);
      onClose();
    }, 1400);
  };

  const loadPreset = (preset: ImageResource) => {
    setTitle(preset.title);
    setInputValue(preset.htmlSnippet || preset.url);
    if (preset.isHtmlTag || (preset.htmlSnippet && preset.htmlSnippet.includes('<img'))) {
      setInputMode('html');
    } else {
      setInputMode('url');
    }
    if (preset.category === 'avatar') {
      setTargetDestination('photo_cie');
    } else if (preset.targetTab === 'inicio') {
      setTargetDestination('banner_inicio');
    } else if (preset.targetTab === 'indique') {
      setTargetDestination('indique');
    } else if (preset.targetTab === 'carteiras') {
      setTargetDestination('carteiras');
    } else if (preset.targetTab === 'avisos') {
      setTargetDestination('avisos');
    }
    setActiveSubTab('create');
  };

  function getTabLabel(tab: TabType) {
    switch (tab) {
      case 'inicio': return 'Início';
      case 'indique': return 'Indique';
      case 'carteiras': return 'Carteiras';
      case 'avisos': return 'Avisos';
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div 
        id="image-manager-modal"
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-teal-900 via-teal-800 to-cyan-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
              <Sparkles className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight">Gerenciador de Imagens & HTML</h2>
              <p className="text-xs text-teal-200/90">Adicione links diretos e tags HTML de imagens no app</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex border-b border-slate-100 px-6 pt-3 bg-slate-50/70">
          <button
            type="button"
            onClick={() => setActiveSubTab('create')}
            className={`pb-3 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition-colors ${
              activeSubTab === 'create'
                ? 'border-teal-700 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Plus className="w-4 h-4" />
            Adicionar Imagem / HTML
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('gallery')}
            className={`pb-3 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition-colors ${
              activeSubTab === 'gallery'
                ? 'border-teal-700 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            Galeria de Exemplos ({PRESET_IMAGE_GALLERY.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('guide')}
            className={`pb-3 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition-colors ${
              activeSubTab === 'guide'
                ? 'border-teal-700 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Como Funciona
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {successMessage && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2.5 animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {activeSubTab === 'create' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Toggle Input Mode */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Formato de Entrada</label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setInputMode('url')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      inputMode === 'url'
                        ? 'bg-white text-teal-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    Link Direto (URL da Imagem)
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputMode('html')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      inputMode === 'html'
                        ? 'bg-white text-teal-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    Tag HTML Completa (&lt;img&gt;)
                  </button>
                </div>
              </div>

              {/* Input Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">
                    {inputMode === 'url' ? 'URL Direta da Imagem' : 'Código HTML da Imagem'}
                  </label>
                  <span className="text-[11px] text-slate-400">
                    {inputMode === 'url' ? 'Ex: https://dominio.com/foto.jpg' : 'Ex: <img src="..." alt="..." />'}
                  </span>
                </div>
                {inputMode === 'url' ? (
                  <input
                    type="url"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 font-mono"
                  />
                ) : (
                  <textarea
                    rows={3}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={'<img src="https://..." alt="Meu Banner" class="w-full rounded-xl" />'}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 font-mono"
                  />
                )}
              </div>

              {/* Title / Description */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Título / Nome de Exibição</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Campanha Black Friday"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Link de Destino ao Clicar (Opcional)</label>
                  <input
                    type="text"
                    value={targetHref}
                    onChange={(e) => setTargetHref(e.target.value)}
                    placeholder="https://suapagina.com ou #"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600"
                  />
                </div>
              </div>

              {/* Target Screen Picker */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Onde aplicar esta imagem no app?</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setTargetDestination('photo_cie')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      targetDestination === 'photo_cie'
                        ? 'border-teal-700 bg-teal-50/80 text-teal-950 ring-2 ring-teal-700/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-lg bg-teal-100 flex items-center justify-center text-[#0c515c] mb-1 font-bold text-xs">
                      3x4
                    </div>
                    <div className="text-xs font-bold">Foto Estudante (CIE)</div>
                    <div className="text-[10px] text-slate-500">Foto da Carteirinha</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTargetDestination('banner_inicio')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      targetDestination === 'banner_inicio'
                        ? 'border-teal-700 bg-teal-50/80 text-teal-950 ring-2 ring-teal-700/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Home className="w-4 h-4 mb-1 text-teal-700" />
                    <div className="text-xs font-bold">Banner Início</div>
                    <div className="text-[10px] text-slate-500">Carrossel de novidades</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTargetDestination('indique')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      targetDestination === 'indique'
                        ? 'border-teal-700 bg-teal-50/80 text-teal-950 ring-2 ring-teal-700/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <UserPlus className="w-4 h-4 mb-1 text-teal-700" />
                    <div className="text-xs font-bold">Indique e Ganhe</div>
                    <div className="text-[10px] text-slate-500">Banner da campanha</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTargetDestination('carteiras')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      targetDestination === 'carteiras'
                        ? 'border-teal-700 bg-teal-50/80 text-teal-950 ring-2 ring-teal-700/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <IdCard className="w-4 h-4 mb-1 text-teal-700" />
                    <div className="text-xs font-bold">Carteiras & Cartões</div>
                    <div className="text-[10px] text-slate-500">Fundo do cartão</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTargetDestination('avisos')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      targetDestination === 'avisos'
                        ? 'border-teal-700 bg-teal-50/80 text-teal-950 ring-2 ring-teal-700/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Bell className="w-4 h-4 mb-1 text-teal-700" />
                    <div className="text-xs font-bold">Avisos & Alertas</div>
                    <div className="text-[10px] text-slate-500">Notificação com imagem</div>
                  </button>
                </div>
              </div>

              {/* Live Preview Box */}
              {parsed.src && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                      Pré-visualização em Tempo Real
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                      Link Válido
                    </span>
                  </div>
                  <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-300 aspect-[16/9] max-h-48">
                    <img
                      src={parsed.src}
                      alt={parsed.alt || 'Preview'}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 p-2.5 bg-gradient-to-t from-black/80 to-transparent text-white">
                      <div className="text-xs font-bold">{title || 'Título do Banner'}</div>
                      <div className="text-[10px] text-slate-300 truncate">{parsed.src}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!parsed.src}
                  className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold shadow-md shadow-teal-700/20 transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Salvar Imagem no App
                </button>
              </div>
            </form>
          )}

          {activeSubTab === 'gallery' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600">
                Selecione qualquer modelo pronto abaixo para aplicar imediatamente ou usar como referência para seus próprios links:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {PRESET_IMAGE_GALLERY.map((preset) => (
                  <div
                    key={preset.id}
                    className="p-3 rounded-2xl border border-slate-200 bg-white hover:border-teal-600 transition-all group flex flex-col justify-between"
                  >
                    <div className="relative rounded-xl overflow-hidden aspect-[16/9] mb-2.5 bg-slate-100">
                      <img
                        src={preset.url}
                        alt={preset.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-black/60 text-white backdrop-blur-md">
                        {preset.targetTab?.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 leading-tight">{preset.title}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{preset.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => loadPreset(preset)}
                      className="mt-3 w-full py-1.5 px-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Usar Este Link / HTML
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSubTab === 'guide' && (
            <div className="space-y-4 text-slate-700 text-xs leading-relaxed">
              <div className="p-4 rounded-2xl bg-teal-50/80 border border-teal-200">
                <h3 className="font-bold text-teal-950 text-sm mb-1 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-teal-700" />
                  Como adicionar links diretos de imagens HTML no app?
                </h3>
                <p className="text-teal-900 text-xs">
                  Sim! Você pode adicionar qualquer URL direta ou tag HTML <code className="bg-teal-100 px-1 py-0.5 rounded font-mono text-[11px]">&lt;img&gt;</code> para exibir imagens personalizadas em todas as telas (Início, Indique, Carteiras e Avisos).
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500">Formatos Aceitos</h4>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-teal-700 text-white text-[10px] flex items-center justify-center font-bold">1</span>
                    Link Direto de Imagem (URL)
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Basta colar qualquer endereço que aponte diretamente para o arquivo de imagem (JPG, PNG, WebP, SVG).
                  </p>
                  <pre className="p-2 bg-slate-900 text-teal-300 rounded-lg text-[10px] font-mono overflow-x-auto">
                    https://images.unsplash.com/photo-1559526324-4b87b5e36e44
                  </pre>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-teal-700 text-white text-[10px] flex items-center justify-center font-bold">2</span>
                    Tag HTML &lt;img&gt; Padrão
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Cole uma tag HTML completa com atributos como <code className="bg-slate-200 px-1 rounded">src</code>, <code className="bg-slate-200 px-1 rounded">alt</code> e classes de estilo.
                  </p>
                  <pre className="p-2 bg-slate-900 text-teal-300 rounded-lg text-[10px] font-mono overflow-x-auto">
                    &lt;img src="https://meusite.com/banner.png" alt="Promoção" class="w-full rounded-xl" /&gt;
                  </pre>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-teal-700 text-white text-[10px] flex items-center justify-center font-bold">3</span>
                    Imagem com Link Clicável (&lt;a&gt;&lt;img&gt;&lt;/a&gt;)
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Encapsule a imagem dentro de um link âncora para abrir uma página ao clicar no banner:
                  </p>
                  <pre className="p-2 bg-slate-900 text-teal-300 rounded-lg text-[10px] font-mono overflow-x-auto">
                    &lt;a href="https://promocao.com" target="_blank"&gt;
  &lt;img src="https://meusite.com/banner.jpg" alt="Promo" /&gt;
&lt;/a&gt;
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
