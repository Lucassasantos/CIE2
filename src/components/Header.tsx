import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
  [key: string]: any;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (onMenuClick) {
      onMenuClick();
    }
  };

  return (
    <header 
      id="app-main-header"
      className="bg-[#178596] text-white px-6 py-7 shadow-md select-none shrink-0"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Olá, Lucas
          </h1>
          <p className="text-sm font-medium text-teal-100/90">
            Sua carteira estudantil
          </p>
        </div>

        <button
          type="button"
          id="btn-header-menu"
          aria-label="Abrir menu"
          onClick={handleToggle}
          className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 active:bg-white/30 text-white transition-colors flex items-center justify-center"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </header>
  );
};
