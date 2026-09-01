import React from 'react';
import { Home, UserPlus, Wallet, Bell } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  unreadAvisosCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  unreadAvisosCount = 0,
}) => {
  const navItems = [
    {
      id: 'inicio' as TabType,
      label: 'Início',
      icon: Home,
    },
    {
      id: 'indique' as TabType,
      label: 'Indique',
      icon: UserPlus,
    },
    {
      id: 'carteiras' as TabType,
      label: 'Carteiras',
      icon: Wallet,
    },
    {
      id: 'avisos' as TabType,
      label: 'Avisos',
      icon: Bell,
      badge: unreadAvisosCount > 0 ? unreadAvisosCount : undefined,
    },
  ];

  return (
    <nav 
      id="app-bottom-nav"
      className="bg-white border-t border-slate-200/80 px-2 py-2 shrink-0 z-40 select-none shadow-[0_-4px_12px_rgba(0,0,0,0.03)]"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChangeTab(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative group ${
                isActive
                  ? 'text-[#178596]'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon 
                  strokeWidth={isActive ? 2.3 : 1.8} 
                  className={`w-6 h-6 transition-transform duration-200 ${
                    isActive ? 'scale-110' : 'group-hover:scale-105'
                  }`} 
                />
                
                {item.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 min-w-[15px] h-[15px] px-1 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[11px] mt-1 font-medium transition-all ${
                  isActive ? 'font-bold text-[#178596]' : 'text-slate-600'
                }`}
              >
                {item.label}
              </span>

              {/* Active Indicator bar */}
              {isActive && (
                <span className="absolute bottom-0 w-6 h-0.5 bg-[#178596] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
