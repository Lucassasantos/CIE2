export type TabType = 'inicio' | 'indique' | 'carteiras' | 'avisos';

export interface ImageResource {
  id: string;
  title: string;
  description?: string;
  url: string;
  htmlSnippet?: string;
  targetUrl?: string;
  category: 'banner' | 'promo' | 'card' | 'avatar' | 'custom';
  targetTab?: TabType;
  dateAdded: string;
  isHtmlTag?: boolean;
}

export interface WalletCard {
  id: string;
  name: string;
  holderName: string;
  type: 'credit' | 'debit' | 'black' | 'virtual';
  numberMasked: string;
  expiryDate: string;
  cvv: string;
  balance: number;
  limit: number;
  spent: number;
  colorScheme: string;
  bgImageUrl?: string;
  isVirtual: boolean;
  status: 'active' | 'blocked';
  brand: 'mastercard' | 'visa' | 'elo';
}

export interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: 'in' | 'out';
  date: string;
  time: string;
  recipientOrSender?: string;
  method: 'pix' | 'card' | 'transfer' | 'cashback' | 'bonus';
  status: 'completed' | 'pending' | 'failed';
}

export interface InvitedFriend {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  date: string;
  status: 'completed' | 'pending' | 'signed_up';
  rewardEarned: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  time: string;
  read: boolean;
  type: 'promo' | 'security' | 'transaction' | 'system';
  imageUrl?: string;
  htmlSnippet?: string;
  actionUrl?: string;
  actionText?: string;
}

export interface StudentCieData {
  id: string;
  name: string;
  photoUrl: string;
  photoHtmlSnippet?: string;
  institution: string;
  institutionLogoUrl?: string;
  course: string;
  educationLevel: string; // 'Graduação', 'Pós-Graduação', 'Ensino Médio', etc.
  registrationNumber: string; // Matrícula
  dnvCode: string; // Documento Nacional do Estudante / Código de Uso
  rg: string;
  cpfMasked: string;
  birthDate: string;
  validUntil: string; // Ex: '31/03/2027'
  issuerEntity: string; // 'DNE / UNE / UBES / ANPG'
  certificateNumber: string;
  qrCodeData: string;
  status: 'valid' | 'expired' | 'pending';
  securitySeal: string;
}

export interface BenefitOffer {
  id: string;
  title: string;
  category: 'cinema' | 'cultura' | 'shows' | 'educacao' | 'transporte';
  discountText: string;
  partnerName: string;
  partnerLogoUrl: string;
  badge: string;
  description: string;
  howToUse: string;
}

export interface AppBanner {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  imageUrl: string;
  htmlSnippet?: string;
  linkUrl?: string;
  actionText?: string;
  bgGradient?: string;
}
