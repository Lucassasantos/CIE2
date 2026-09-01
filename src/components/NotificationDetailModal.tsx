import React from 'react';
import { X, Bell, ExternalLink, Calendar, Clock, Code2 } from 'lucide-react';
import { NotificationItem } from '../types';
import { DirectHtmlImageCard } from './DirectHtmlImageCard';

interface NotificationDetailModalProps {
  notification: NotificationItem | null;
  onClose: () => void;
  onInspectImage: (url: string, title?: string, html?: string) => void;
}

export const NotificationDetailModal: React.FC<NotificationDetailModalProps> = ({
  notification,
  onClose,
  onInspectImage,
}) => {
  if (!notification) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div 
        id="notification-detail-modal"
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-100 flex items-center justify-center text-teal-800">
              <Bell className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Detalhes do Aviso
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-slate-900 leading-snug">
              {notification.title}
            </h2>
            <div className="flex items-center gap-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {notification.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {notification.time}
              </span>
            </div>
          </div>

          {/* Direct Image or HTML Preview */}
          {notification.imageUrl && (
            <div className="space-y-1.5">
              <DirectHtmlImageCard
                srcOrHtml={notification.imageUrl}
                title=""
                aspectRatio="banner"
                onInspect={() =>
                  onInspectImage(
                    notification.imageUrl!,
                    notification.title,
                    notification.htmlSnippet
                  )
                }
              />
            </div>
          )}

          <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
            {notification.message}
          </p>

          {/* Action button */}
          <div className="pt-2 flex items-center gap-2">
            {notification.actionText && (
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#178596] hover:bg-teal-800 text-white text-xs font-bold transition-colors text-center"
              >
                {notification.actionText}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
