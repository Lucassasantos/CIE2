import React, { useState } from 'react';
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  Sparkles, 
  ShieldAlert, 
  Tag, 
  CreditCard, 
  Info, 
  Plus, 
  ExternalLink,
  ChevronRight,
  Image as ImageIcon
} from 'lucide-react';
import { NotificationItem } from '../../types';
import { DirectHtmlImageCard } from '../DirectHtmlImageCard';
import { EditableText } from '../EditableText';

interface AvisosTabProps {
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  onOpenImageManager: () => void;
  onInspectImage: (url: string, title?: string, html?: string) => void;
  onNotificationClick: (notif: NotificationItem) => void;
}

export const AvisosTab: React.FC<AvisosTabProps> = ({
  notifications,
  onMarkAllAsRead,
  onClearAll,
  onOpenImageManager,
  onInspectImage,
  onNotificationClick,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'promo' | 'security' | 'transaction' | 'system'>('all');

  const filteredNotifications = notifications.filter((item) => {
    if (selectedFilter === 'all') return true;
    return item.type === selectedFilter;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getCategoryIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'promo':
        return <Tag className="w-4 h-4 text-rose-600" />;
      case 'security':
        return <ShieldAlert className="w-4 h-4 text-amber-600" />;
      case 'transaction':
        return <CreditCard className="w-4 h-4 text-teal-700" />;
      case 'system':
        return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  const getCategoryBg = (type: NotificationItem['type']) => {
    switch (type) {
      case 'promo':
        return 'bg-rose-50';
      case 'security':
        return 'bg-amber-50';
      case 'transaction':
        return 'bg-teal-50';
      case 'system':
        return 'bg-blue-50';
    }
  };

  return (
    <div id="tab-avisos-container" className="p-4 sm:p-5 space-y-4 pb-8 animate-fade-in">
      {/* Top Header & Bulk Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
            <Bell className="w-4 h-4 text-[#178596]" />
            <EditableText id="avisos_tab_title" defaultText="Central de Avisos" />
          </h2>
          <p className="text-xs text-slate-500">
            {unreadCount > 0 ? `${unreadCount} novas mensagens não lidas` : 'Todas as mensagens lidas'}
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={onMarkAllAsRead}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors"
              title="Marcar todas como lidas"
            >
              <CheckCheck className="w-4 h-4 text-[#178596]" />
              <span className="hidden xs:inline text-[11px]">Ler todas</span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenImageManager}
            className="p-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#178596] text-xs font-semibold flex items-center gap-1 border border-teal-200 transition-colors"
            title="Adicionar aviso com imagem HTML"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden xs:inline text-[11px]">Novo Aviso</span>
          </button>
        </div>
      </div>

      {/* Filter Categories Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'all', label: 'Todos' },
          { id: 'promo', label: 'Promoções' },
          { id: 'security', label: 'Segurança' },
          { id: 'transaction', label: 'Transações' },
          { id: 'system', label: 'Sistema' },
        ].map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setSelectedFilter(f.id as any)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedFilter === f.id
                ? 'bg-[#178596] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-slate-200/80 text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Bell className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">Nenhum aviso nesta categoria</h3>
            <p className="text-xs text-slate-500">
              Você está com todos os seus alertas e comunicações em dia.
            </p>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => onNotificationClick(notif)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
                notif.read
                  ? 'bg-white border-slate-200/80 hover:border-slate-300'
                  : 'bg-teal-50/30 border-teal-200/90 shadow-xs'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${getCategoryBg(notif.type)}`}>
                  {getCategoryIcon(notif.type)}
                </div>

                <div className="flex-1 space-y-1.5 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`text-xs sm:text-sm font-bold leading-tight ${notif.read ? 'text-slate-800' : 'text-teal-950 font-extrabold'}`}>
                      {notif.title}
                    </h3>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-[#178596] shrink-0" />
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {notif.message}
                  </p>

                  {/* Direct HTML / Image Banner Preview inside Notice */}
                  {notif.imageUrl && (
                    <div className="pt-2">
                      <DirectHtmlImageCard
                        srcOrHtml={notif.imageUrl}
                        title=""
                        aspectRatio="banner"
                        onInspect={() =>
                          onInspectImage(notif.imageUrl!, notif.title, notif.htmlSnippet)
                        }
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                    <span>{notif.date} às {notif.time}</span>
                    {notif.actionText && (
                      <span className="font-bold text-[#178596] group-hover:underline flex items-center gap-0.5">
                        {notif.actionText}
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Clear all footer button */}
      {notifications.length > 0 && (
        <div className="pt-2 flex justify-center">
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs text-slate-400 hover:text-rose-600 flex items-center gap-1.5 py-1 px-3 rounded-lg hover:bg-rose-50 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Limpar todos os avisos
          </button>
        </div>
      )}
    </div>
  );
};
