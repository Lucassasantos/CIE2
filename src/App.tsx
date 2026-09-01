/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  TabType, 
  AppBanner, 
  WalletCard, 
  Transaction, 
  InvitedFriend, 
  NotificationItem, 
  ImageResource 
} from './types';
import { 
  DEFAULT_BANNERS, 
  DEFAULT_CARDS, 
  DEFAULT_TRANSACTIONS, 
  DEFAULT_FRIENDS, 
  DEFAULT_NOTIFICATIONS, 
  DEFAULT_CIE_DATA,
  DEFAULT_BENEFIT_OFFERS,
  PRESET_IMAGE_GALLERY 
} from './data/defaultData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { InicioTab } from './components/tabs/InicioTab';
import { IndiqueTab } from './components/tabs/IndiqueTab';
import { CarteirasTab } from './components/tabs/CarteirasTab';
import { AvisosTab } from './components/tabs/AvisosTab';
import { ImageLinkManagerModal } from './components/ImageLinkManagerModal';
import { ImageLightboxModal } from './components/ImageLightboxModal';
import { NotificationDetailModal } from './components/NotificationDetailModal';
import { CieQrCodeModal } from './components/CieQrCodeModal';
import { 
  Sparkles, 
  Link as LinkIcon, 
  Smartphone, 
  CheckCircle2, 
  Info,
  HelpCircle,
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import { StudentCieData, BenefitOffer } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('inicio');
  const [isSimulatorFrame, setIsSimulatorFrame] = useState<boolean>(true);

  // CIE Student Card State (persisted locally)
  const [cieData, setCieData] = useState<StudentCieData>(() => {
    const saved = localStorage.getItem('app_cie_data');
    return saved ? JSON.parse(saved) : DEFAULT_CIE_DATA;
  });

  const [benefitOffers] = useState<BenefitOffer[]>(DEFAULT_BENEFIT_OFFERS);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  // Application Data States (persisted locally)
  const [banners, setBanners] = useState<AppBanner[]>(() => {
    const saved = localStorage.getItem('app_banners');
    return saved ? JSON.parse(saved) : DEFAULT_BANNERS;
  });

  const [cards, setCards] = useState<WalletCard[]>(() => {
    const saved = localStorage.getItem('app_cards');
    return saved ? JSON.parse(saved) : DEFAULT_CARDS;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('app_transactions');
    return saved ? JSON.parse(saved) : DEFAULT_TRANSACTIONS;
  });

  const [friends, setFriends] = useState<InvitedFriend[]>(() => {
    const saved = localStorage.getItem('app_friends');
    return saved ? JSON.parse(saved) : DEFAULT_FRIENDS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('app_notifications');
    return saved ? JSON.parse(saved) : DEFAULT_NOTIFICATIONS;
  });

  const [customImages, setCustomImages] = useState<ImageResource[]>(() => {
    const saved = localStorage.getItem('app_custom_images');
    return saved ? JSON.parse(saved) : PRESET_IMAGE_GALLERY;
  });

  // Modal States
  const [isImageManagerOpen, setIsImageManagerOpen] = useState(false);
  const [lightboxData, setLightboxData] = useState<{
    isOpen: boolean;
    url: string;
    title?: string;
    htmlSnippet?: string;
  }>({
    isOpen: false,
    url: '',
  });

  const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('app_cie_data', JSON.stringify(cieData));
  }, [cieData]);

  useEffect(() => {
    localStorage.setItem('app_banners', JSON.stringify(banners));
  }, [banners]);

  useEffect(() => {
    localStorage.setItem('app_cards', JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    localStorage.setItem('app_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('app_friends', JSON.stringify(friends));
  }, [friends]);

  useEffect(() => {
    localStorage.setItem('app_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('app_custom_images', JSON.stringify(customImages));
  }, [customImages]);

  // Handler: Add Custom Direct Image or HTML Snippet
  const handleAddImage = (newResource: {
    title: string;
    url: string;
    htmlSnippet?: string;
    targetTab: TabType;
    category: 'banner' | 'promo' | 'card' | 'avatar' | 'custom';
    targetHref?: string;
  }) => {
    const resource: ImageResource = {
      id: `img-${Date.now()}`,
      title: newResource.title,
      url: newResource.url,
      htmlSnippet: newResource.htmlSnippet,
      category: newResource.category,
      targetTab: newResource.targetTab,
      targetUrl: newResource.targetHref,
      dateAdded: 'Hoje',
    };

    setCustomImages((prev) => [resource, ...prev]);

    // Apply automatically based on targetTab
    if (newResource.category === 'avatar') {
      setCieData((prev) => ({
        ...prev,
        photoUrl: newResource.url,
        photoHtmlSnippet: newResource.htmlSnippet,
      }));
    } else if (newResource.targetTab === 'inicio') {
      const newBanner: AppBanner = {
        id: `banner-${Date.now()}`,
        title: newResource.title,
        subtitle: 'Adicionado com link direto de imagem HTML',
        tag: 'PERSONALIZADO',
        imageUrl: newResource.url,
        htmlSnippet: newResource.htmlSnippet,
        linkUrl: newResource.targetHref || '#',
        actionText: 'Saiba Mais',
      };
      setBanners((prev) => [newBanner, ...prev]);
    } else if (newResource.targetTab === 'indique') {
      // Update campaign banner
      const newBanner: AppBanner = {
        id: `banner-${Date.now()}`,
        title: newResource.title,
        subtitle: 'Indique seus amigos e ganhe prêmios exclusivos',
        tag: 'NOVA CAMPANHA',
        imageUrl: newResource.url,
        htmlSnippet: newResource.htmlSnippet,
        linkUrl: newResource.targetHref || '#',
      };
      setBanners((prev) => [newBanner, ...prev]);
    } else if (newResource.targetTab === 'carteiras') {
      // Update background of primary card
      setCards((prev) =>
        prev.map((c, i) => (i === 0 ? { ...c, bgImageUrl: newResource.url } : c))
      );
    } else if (newResource.targetTab === 'avisos') {
      const newNotice: NotificationItem = {
        id: `notif-${Date.now()}`,
        title: newResource.title,
        message: 'Aviso cadastrado utilizando link direto de imagem HTML com pré-visualização em alta qualidade.',
        date: 'Hoje',
        time: 'Agora',
        read: false,
        type: 'promo',
        imageUrl: newResource.url,
        htmlSnippet: newResource.htmlSnippet,
        actionText: 'Ver Detalhes',
      };
      setNotifications((prev) => [newNotice, ...prev]);
    }

    setActiveTab(newResource.targetTab);
  };

  // Handler: Inspect Image in Lightbox
  const handleInspectImage = (url: string, title?: string, html?: string) => {
    setLightboxData({
      isOpen: true,
      url: url,
      title: title || 'Imagem Direta',
      htmlSnippet: html,
    });
  };

  // Handler: Simulate referral friend joining
  const handleSimulateReferral = () => {
    const randomNames = [
      { name: 'Gabriel Torres', email: 'gabriel.t@email.com', phone: '(11) 97722-3344', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { name: 'Juliana Paes', email: 'ju.paes@email.com', phone: '(21) 98833-2211', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
      { name: 'Lucas Pinheiro', email: 'lucas.p@email.com', phone: '(31) 99122-8877', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
    ];
    const picked = randomNames[Math.floor(Math.random() * randomNames.length)];

    const newFriend: InvitedFriend = {
      id: `friend-${Date.now()}`,
      name: picked.name,
      email: picked.email,
      phone: picked.phone,
      avatarUrl: picked.avatar,
      date: 'Hoje',
      status: 'completed',
      rewardEarned: 30.00,
    };

    setFriends((prev) => [newFriend, ...prev]);

    // Add bonus transaction
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      title: `Bônus Indicação: ${picked.name}`,
      category: 'Recompensas',
      amount: 30.00,
      type: 'in',
      date: 'Hoje',
      time: 'Agora',
      recipientOrSender: picked.name,
      method: 'bonus',
      status: 'completed',
    };
    setTransactions((prev) => [newTx, ...prev]);

    // Add notification
    const newNotice: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `🎉 ${picked.name} abriu a conta pelo seu link!`,
      message: 'Você recebeu R$ 30,00 de recompensa no programa Indique e Ganhe. O saldo já está disponível.',
      date: 'Hoje',
      time: 'Agora',
      read: false,
      type: 'promo',
      imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
      actionText: 'Ver Saldo',
    };
    setNotifications((prev) => [newNotice, ...prev]);
  };

  // Handler: Add New Virtual Card
  const handleAddNewVirtualCard = () => {
    const newCard: WalletCard = {
      id: `card-${Date.now()}`,
      name: `Cartão Virtual #${cards.length + 1}`,
      holderName: 'LUCAS S SANTOS',
      type: 'virtual',
      numberMasked: `•••• •••• •••• ${Math.floor(1000 + Math.random() * 9000)}`,
      expiryDate: '10/29',
      cvv: String(Math.floor(100 + Math.random() * 900)),
      balance: 1500.00,
      limit: 3000.00,
      spent: 0,
      colorScheme: 'from-purple-900 via-indigo-900 to-slate-900',
      bgImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      isVirtual: true,
      status: 'active',
      brand: 'mastercard',
    };

    setCards((prev) => [...prev, newCard]);
  };

  // Unread notifications count
  const unreadAvisosCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  const handleNotificationClick = (notif: NotificationItem) => {
    setSelectedNotification(notif);
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="min-h-screen bg-slate-200/90 flex flex-col items-center justify-start p-0 sm:py-6 sm:px-4">
      {/* Top Banner Guide for User's Question */}
      <aside aria-label="Informações e Controles Rápidos" className="w-full max-w-md mb-3 px-3 sm:px-0 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-slate-700 bg-white/90 px-3 py-1.5 rounded-full shadow-xs backdrop-blur-xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="font-medium text-[11px] truncate">
            Links diretos e tags HTML suportados
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsImageManagerOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#178596] hover:bg-teal-800 text-white font-bold text-[11px] shadow-xs transition-colors"
          >
            <LinkIcon className="w-3 h-3" />
            Adicionar Imagem
          </button>
        </div>
      </aside>

      {/* Main Container / Mobile Simulator Frame matching the provided screenshot */}
      <div
        id="app-mobile-viewport"
        className={`w-full bg-white flex flex-col overflow-hidden transition-all duration-300 ${
          isSimulatorFrame
            ? 'max-w-[420px] rounded-none sm:rounded-[36px] shadow-2xl border-0 sm:border-[8px] sm:border-slate-800/90 h-[100dvh] sm:h-[860px]'
            : 'max-w-4xl rounded-2xl shadow-xl min-h-[90vh]'
        }`}
      >
        {/* Header - Exact deep teal style as user uploaded screenshot */}
        <Header
          activeTab={activeTab}
          unreadNotificationsCount={unreadAvisosCount}
          onOpenImageManager={() => setIsImageManagerOpen(true)}
          onOpenNotifications={() => setActiveTab('avisos')}
          isSimulatorFrame={isSimulatorFrame}
          onToggleSimulatorFrame={() => setIsSimulatorFrame(!isSimulatorFrame)}
        />

        {/* Screen Content Body (Scrollable) */}
        <main className="flex-1 overflow-y-auto bg-slate-50 relative focus:outline-none">
          {activeTab === 'inicio' && (
            <InicioTab
              cieData={cieData}
              banners={banners}
              benefitOffers={benefitOffers}
              transactions={transactions}
              onOpenImageManager={() => setIsImageManagerOpen(true)}
              onInspectImage={handleInspectImage}
              onNavigateToTab={(tab) => setActiveTab(tab)}
              onOpenQrModal={() => setIsQrModalOpen(true)}
            />
          )}

          {activeTab === 'indique' && (
            <IndiqueTab
              friends={friends}
              onSimulateReferral={handleSimulateReferral}
              onOpenImageManager={() => setIsImageManagerOpen(true)}
              onInspectImage={handleInspectImage}
              campaignImageUrl={banners[0]?.imageUrl}
            />
          )}

          {activeTab === 'carteiras' && (
            <CarteirasTab
              cards={cards}
              transactions={transactions}
              onOpenImageManager={() => setIsImageManagerOpen(true)}
              onInspectImage={handleInspectImage}
              onAddNewVirtualCard={handleAddNewVirtualCard}
            />
          )}

          {activeTab === 'avisos' && (
            <AvisosTab
              notifications={notifications}
              onMarkAllAsRead={handleMarkAllAsRead}
              onClearAll={handleClearAllNotifications}
              onOpenImageManager={() => setIsImageManagerOpen(true)}
              onInspectImage={handleInspectImage}
              onNotificationClick={handleNotificationClick}
            />
          )}
        </main>

        {/* Bottom Navigation Bar - Faithful to screenshot: Início | Indique | Carteiras | Avisos */}
        <BottomNav
          activeTab={activeTab}
          onChangeTab={(tab) => setActiveTab(tab)}
          unreadAvisosCount={unreadAvisosCount}
        />
      </div>

      {/* Image Manager Modal (for adding direct image URLs and HTML <img> tags) */}
      <ImageLinkManagerModal
        isOpen={isImageManagerOpen}
        onClose={() => setIsImageManagerOpen(false)}
        onAddImage={handleAddImage}
        customImages={customImages}
      />

      {/* Lightbox / Code Inspector Modal */}
      <ImageLightboxModal
        isOpen={lightboxData.isOpen}
        onClose={() => setLightboxData({ isOpen: false, url: '' })}
        imageUrl={lightboxData.url}
        title={lightboxData.title}
        htmlSnippet={lightboxData.htmlSnippet}
      />

      {/* Notification Detail Modal */}
      <NotificationDetailModal
        notification={selectedNotification}
        onClose={() => setSelectedNotification(null)}
        onInspectImage={handleInspectImage}
      />

      {/* CIE Student QR Code Modal */}
      <CieQrCodeModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        cieData={cieData}
      />
    </div>
  );
}
