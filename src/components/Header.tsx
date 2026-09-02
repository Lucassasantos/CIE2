import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Lock, 
  Unlock, 
  Edit3, 
  Image as ImageIcon, 
  Bell, 
  RotateCcw, 
  GraduationCap, 
  ShieldCheck, 
  Sparkles
} from 'lucide-react';
import { useEditMode } from '../context/EditModeContext';
import { EditableText } from './EditableText';

interface HeaderProps {
  onOpenImageManager?: () => void;
  onOpenNotifications?: () => void;
  unreadNotificationsCount?: number;
  [key: string]: any;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenImageManager,
  onOpenNotifications,
  unreadNotificationsCount = 0
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isEditMode, toggleEditMode } = useEditMode();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleToggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const handleToggleEditWithFeedback = () => {
    const nextState = !isEditMode;
    toggleEditMode();
    setToastMessage(nextState ? 'Modo de Edição LIBERADO: Clique em qualquer texto ou foto para editar!' : 'Modo de Edição BLOQUEADO: Visualização limpa!');
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleResetAllPositions = () => {
    localStorage.removeItem('app_carteira_foto_slot_config');
    localStorage.removeItem('app_carteira_vertical_text_lines_v3');
    localStorage.removeItem('app_carteira_vertical_text_lines_v2');
    setToastMessage('Posições e textos restaurados para o padrão.');
    setTimeout(() => {
      setToastMessage(null);
      window.location.reload();
    }, 1200);
  };

  return (
    <>
      <header 
        id="app-main-header"
        className="bg-[#178596] text-white px-5 sm:px-6 py-6 sm:py-7 shadow-md select-none shrink-0 w-full relative z-30"
      >
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center">
                <EditableText
                  id="header_user_greeting"
                  defaultText="Olá, Lucas"
                  className="text-white font-bold"
                  title="Clique para editar a saudação"
                />
              </h1>

              {/* Quick status pill - ONLY SHOWN WHEN EDIT MODE IS ACTIVE */}
              {isEditMode && (
                <button
                  type="button"
                  onClick={handleToggleEditWithFeedback}
                  className="text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border transition-all bg-amber-400/25 text-amber-200 border-amber-300/50 hover:bg-amber-400/35"
                  title="Edição Liberada (Clique para Bloquear)"
                >
                  <Edit3 className="w-3 h-3 text-amber-300" />
                  <span>Edição Ativa</span>
                </button>
              )}
            </div>
            
            <p className="text-xs sm:text-sm font-medium text-teal-100/90">
              <EditableText
                id="header_subtitle"
                defaultText="Sua carteira estudantil"
                className="text-teal-100/90 font-medium"
                title="Clique para editar o subtítulo"
              />
            </p>
          </div>

          <button
            type="button"
            id="btn-header-menu"
            aria-label="Abrir menu"
            onClick={handleToggleMenu}
            className={`p-2.5 rounded-2xl transition-all flex items-center justify-center ${
              isOpen 
                ? 'bg-white text-[#178596] shadow-md' 
                : 'bg-white/10 hover:bg-white/20 active:bg-white/30 text-white'
            }`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Floating Status Toast */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-teal-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* SANDWICH DRAWER / SLIDE-OVER MENU */}
      {isOpen && (
        <div 
          id="sandwich-menu-overlay"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div 
            id="sandwich-menu-drawer"
            className="w-full max-w-sm h-full bg-white text-slate-800 flex flex-col shadow-2xl overflow-y-auto animate-slide-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="bg-[#178596] text-white p-5 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-teal-200" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white leading-tight">Menu de Opções</h2>
                  <p className="text-xs text-teal-100/90">Carteira Estudantil Digital</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm font-bold transition-colors"
                aria-label="Fechar menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-5 space-y-5 flex-1">
              
              {/* PRIMARY FEATURE: BOTÃO DE EDIÇÃO (BLOQUEAR / LIBERAR EDIÇÃO) */}
              <div className="bg-slate-50 rounded-3xl p-4 border-2 border-slate-200 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      isEditMode ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {isEditMode ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Modo de Edição
                      </h3>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {isEditMode ? 'Edição Liberada' : 'Edição Bloqueada'}
                      </p>
                    </div>
                  </div>

                  {/* Toggle Switch */}
                  <button
                    type="button"
                    onClick={handleToggleEditWithFeedback}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none ${
                      isEditMode ? 'bg-[#178596]' : 'bg-slate-300'
                    }`}
                    aria-label="Alternar modo de edição"
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                        isEditMode ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {isEditMode 
                    ? 'Textos, linhas verticais, fotos 3x4 e imagens estão livres para mover, alterar fontes, trocar arquivos e editar.'
                    : 'A edição está bloqueada. Todos os textos e fotos estão fixados para visualização limpa e apresentação sem botões extras.'}
                </p>

                {/* Big Action Button for clear toggle */}
                <button
                  type="button"
                  onClick={handleToggleEditWithFeedback}
                  className={`w-full py-2.5 px-4 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs ${
                    isEditMode
                      ? 'bg-amber-500 hover:bg-amber-600 text-slate-900 border border-amber-600/30'
                      : 'bg-[#178596] hover:bg-[#126b79] text-white shadow-teal-700/20'
                  }`}
                >
                  {isEditMode ? (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Bloquear Edição (Modo Apresentação)</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="w-4 h-4" />
                      <span>Liberar Edição de Textos e Fotos</span>
                    </>
                  )}
                </button>
              </div>

              {/* Menu Shortcuts */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
                  Atalhos e Ferramentas
                </div>

                {onOpenImageManager && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      onOpenImageManager();
                    }}
                    className="w-full p-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-left flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#178596] flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                        <ImageIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">Gerenciador de Imagens</div>
                        <div className="text-[10px] text-slate-500">Adicione links ou tags &lt;img&gt;</div>
                      </div>
                    </div>
                  </button>
                )}

                {onOpenNotifications && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      onOpenNotifications();
                    }}
                    className="w-full p-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-left flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#178596] flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                        <Bell className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">Central de Avisos</div>
                        <div className="text-[10px] text-slate-500">
                          {unreadNotificationsCount > 0 ? `${unreadNotificationsCount} novas mensagens` : 'Nenhum aviso pendente'}
                        </div>
                      </div>
                    </div>
                    {unreadNotificationsCount > 0 && (
                      <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                        {unreadNotificationsCount}
                      </span>
                    )}
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleResetAllPositions}
                  className="w-full p-3 rounded-2xl bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-left flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-rose-100 group-hover:text-rose-700 transition-colors flex items-center justify-center">
                      <RotateCcw className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 group-hover:text-rose-700">Restaurar Posições Padrão</div>
                      <div className="text-[10px] text-slate-500">Recupera a configuração original da foto e textos</div>
                    </div>
                  </div>
                </button>
              </div>

              {/* Informações da Carteira */}
              <div className="p-4 bg-teal-50/70 rounded-3xl border border-teal-100 space-y-2">
                <div className="flex items-center gap-2 text-[#178596]">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs font-bold">Documento Padrão Nacional</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Carteira de Identificação Estudantil (CIE) conforme Lei Federal nº 12.933/2013 e Portaria ITI nº 78/2016.
                </p>
              </div>

            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-slate-100 text-center bg-slate-50">
              <span className="text-[10px] font-medium text-slate-400">
                CIE Digital • Versão 2.4
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

