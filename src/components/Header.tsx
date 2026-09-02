import React, { useState } from 'react';
import { 
  Menu, 
  Key, 
  LogOut, 
  Edit3,
  Sparkles
} from 'lucide-react';
import { useEditMode } from '../context/EditModeContext';
import { EditableText } from './EditableText';

interface HeaderProps {
  activeTab?: string;
  onOpenImageManager?: () => void;
  onOpenNotifications?: () => void;
  unreadNotificationsCount?: number;
  [key: string]: any;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeTab = 'inicio',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isEditMode, toggleEditMode } = useEditMode();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleToggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const handleTrocarSenha = () => {
    setIsOpen(false);
    const nextState = !isEditMode;
    toggleEditMode();
    setToastMessage(
      nextState 
        ? 'Modo de Edição ativado! Clique em qualquer texto ou foto para editar.' 
        : 'Modo de Edição desativado.'
    );
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleSair = () => {
    setIsOpen(false);
    setToastMessage('Sessão encerrada com sucesso.');
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const getHeaderTitles = () => {
    switch (activeTab) {
      case 'indique':
        return {
          titleId: 'header_indique_title',
          defaultTitle: 'Programa de Indicação',
          subtitleId: 'header_indique_subtitle',
          defaultSubtitle: 'Indique amigos e garanta sua carteirinha de graça'
        };
      case 'carteiras':
        return {
          titleId: 'header_carteiras_title',
          defaultTitle: 'Minhas Carteiras',
          subtitleId: 'header_carteiras_subtitle',
          defaultSubtitle: 'Histórico de carteiras estudantis'
        };
      case 'avisos':
        return {
          titleId: 'header_notificacoes_title',
          defaultTitle: 'Notificações',
          subtitleId: 'header_notificacoes_subtitle',
          defaultSubtitle: 'Fique por dentro de todas as novidades'
        };
      case 'inicio':
      default:
        return {
          titleId: 'header_user_greeting',
          defaultTitle: 'Olá, Lucas',
          subtitleId: 'header_subtitle',
          defaultSubtitle: 'Sua carteira estudantil'
        };
    }
  };

  const currentHeaderInfo = getHeaderTitles();

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
                  key={currentHeaderInfo.titleId}
                  id={currentHeaderInfo.titleId}
                  defaultText={currentHeaderInfo.defaultTitle}
                  className="text-white font-bold"
                  title="Clique para editar o título"
                />
              </h1>

              {/* Quick status pill - ONLY SHOWN WHEN EDIT MODE IS ACTIVE */}
              {isEditMode && (
                <button
                  type="button"
                  onClick={handleTrocarSenha}
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
                key={currentHeaderInfo.subtitleId}
                id={currentHeaderInfo.subtitleId}
                defaultText={currentHeaderInfo.defaultSubtitle}
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
                ? 'bg-white/20 text-white shadow-xs' 
                : 'bg-white/10 hover:bg-white/20 active:bg-white/30 text-white'
            }`}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* POPUP MENU EXACTLY MATCHING USER PRINT */}
        {isOpen && (
          <>
            <div 
              id="sandwich-menu-backdrop"
              className="fixed inset-0 z-40 bg-transparent"
              onClick={() => setIsOpen(false)}
            />
            <div 
              id="sandwich-menu-popup"
              className="absolute top-16 right-4 z-50 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 min-w-[175px] sm:min-w-[190px] animate-fade-in divide-y divide-slate-100/80 overflow-hidden"
            >
              {/* Item 1: Trocar Senha -> Toggles Edit Mode */}
              <button
                type="button"
                id="btn-menu-trocar-senha"
                onClick={handleTrocarSenha}
                className="w-full px-4 py-3 text-left flex items-center gap-3 text-[#178596] hover:bg-teal-50/60 active:bg-teal-100/60 transition-colors"
              >
                <Key className="w-5 h-5 text-[#178596] shrink-0" />
                <span className="text-sm font-semibold text-[#178596]">Trocar Senha</span>
              </button>

              {/* Item 2: Sair */}
              <button
                type="button"
                id="btn-menu-sair"
                onClick={handleSair}
                className="w-full px-4 py-3 text-left flex items-center gap-3 text-[#ef4444] hover:bg-rose-50/60 active:bg-rose-100/60 transition-colors"
              >
                <LogOut className="w-5 h-5 text-[#ef4444] shrink-0" />
                <span className="text-sm font-semibold text-[#ef4444]">Sair</span>
              </button>
            </div>
          </>
        )}
      </header>

      {/* Floating Status Toast */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-teal-300" />
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
};

