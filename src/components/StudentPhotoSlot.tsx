import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  Link as LinkIcon, 
  Trash2, 
  Sliders, 
  Maximize2, 
  Check, 
  RotateCw,
  RotateCcw,
  Sparkles,
  Move,
  Smartphone,
  CreditCard
} from 'lucide-react';
import { parseImageInput } from '../utils/imageParser';

export interface PhotoSlotConfig {
  x: number; // in px from left
  y: number; // in px from top
  width: number; // in px
  height: number; // in px
  borderRadius: number; // in px
  showBorder: boolean;
  objectFit: 'cover' | 'contain';
  rotation: number; // in degrees (0, 90, 180, 270)
  visible: boolean;
}

export const DEFAULT_PHOTO_SLOT_CONFIG: PhotoSlotConfig = {
  x: 24,
  y: 152,
  width: 130,
  height: 98,
  borderRadius: 14,
  showBorder: true,
  objectFit: 'cover',
  rotation: 90,
  visible: true,
};

interface StudentPhotoSlotProps {
  cardWidth?: number;
  cardHeight?: number;
}

export const StudentPhotoSlot: React.FC<StudentPhotoSlotProps> = ({
  cardWidth = 355,
  cardHeight = 560,
}) => {
  // Stored 3x4 Photo
  const [photoUrl, setPhotoUrl] = useState<string>(() => {
    return localStorage.getItem('app_carteira_foto_3x4') || '';
  });

  // Stored Slot Position & Dimensions
  const [config, setConfig] = useState<PhotoSlotConfig>(() => {
    try {
      const saved = localStorage.getItem('app_carteira_foto_slot_config');
      return saved ? { ...DEFAULT_PHOTO_SLOT_CONFIG, ...JSON.parse(saved) } : DEFAULT_PHOTO_SLOT_CONFIG;
    } catch {
      return DEFAULT_PHOTO_SLOT_CONFIG;
    }
  });

  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInputValue, setUrlInputValue] = useState('');
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Persistence
  useEffect(() => {
    if (photoUrl) {
      localStorage.setItem('app_carteira_foto_3x4', photoUrl);
    } else {
      localStorage.removeItem('app_carteira_foto_3x4');
    }
  }, [photoUrl]);

  useEffect(() => {
    localStorage.setItem('app_carteira_foto_slot_config', JSON.stringify(config));
  }, [config]);

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        setPhotoUrl(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!urlInputValue.trim()) return;
    const parsed = parseImageInput(urlInputValue);
    if (parsed.src) {
      setPhotoUrl(parsed.src);
      setShowUrlInput(false);
      setUrlInputValue('');
    }
  };

  const handleResetConfig = () => {
    setConfig(DEFAULT_PHOTO_SLOT_CONFIG);
  };

  const rotateRight = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setConfig(prev => ({
      ...prev,
      rotation: ((prev.rotation || 0) + 90) % 360,
    }));
  };

  if (!config.visible) {
    return (
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="absolute top-3 left-20 z-20"
      >
        <button
          type="button"
          onClick={() => setConfig(prev => ({ ...prev, visible: true }))}
          className="px-2.5 py-1 bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-full text-[10px] text-white font-medium border border-white/20 transition-all flex items-center gap-1 shadow-sm"
        >
          <Camera className="w-3 h-3 text-teal-300" />
          <span>Ativar Foto 3x4</span>
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Hidden File Input for the 3x4 Photo Slot */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileUpload(file);
        }}
        className="hidden"
      />

      {/* The Rounded Photo Slot Overlay on the Card */}
      <div
        id="student-photo-slot-container"
        onClick={(e) => {
          e.stopPropagation();
          if (!photoUrl) {
            fileInputRef.current?.click();
          }
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDraggingOver(false);
          const file = e.dataTransfer.files?.[0];
          if (file) handleFileUpload(file);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDraggingOver(true);
        }}
        onDragLeave={(e) => {
          e.stopPropagation();
          setIsDraggingOver(false);
        }}
        style={{
          position: 'absolute',
          left: `${config.x}px`,
          top: `${config.y}px`,
          width: `${config.width}px`,
          height: `${config.height}px`,
          borderRadius: `${config.borderRadius}px`,
          transform: config.rotation ? `rotate(${config.rotation}deg)` : undefined,
          transformOrigin: 'center center',
        }}
        className={`z-20 group/slot transition-all select-none overflow-hidden cursor-pointer ${
          isDraggingOver 
            ? 'ring-4 ring-teal-400 bg-teal-500/30' 
            : ''
        } ${
          !photoUrl 
            ? 'bg-white/80 hover:bg-white/95 border-2 border-dashed border-teal-500/80 shadow-md backdrop-blur-xs flex flex-col items-center justify-center p-2 text-center' 
            : config.showBorder 
              ? 'border-2 border-white/60 shadow-lg' 
              : 'shadow-md'
        }`}
      >
        {photoUrl ? (
          /* Rendered Image in Rounded Rectangle */
          <div className="relative w-full h-full">
            <img
              src={photoUrl}
              alt="Foto Estudante"
              referrerPolicy="no-referrer"
              style={{ borderRadius: `${config.borderRadius}px` }}
              className={`w-full h-full transition-all duration-200 ${
                config.objectFit === 'cover' ? 'object-cover' : 'object-contain bg-slate-900/40'
              }`}
            />

            {/* Quick Action Overlay on Hover/Tap */}
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="absolute inset-0 bg-black/60 backdrop-blur-xs opacity-0 group-hover/slot:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-1 text-white"
            >
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors"
                  title="Trocar Foto"
                >
                  <Upload className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={rotateRight}
                  className="p-1.5 rounded-lg bg-teal-500 hover:bg-teal-600 text-white transition-colors"
                  title="Girar 90° para a Direita"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setShowUrlInput(true)}
                  className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors"
                  title="Inserir por Link"
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsConfigModalOpen(true)}
                  className="p-1.5 rounded-lg bg-teal-500 hover:bg-teal-600 text-white transition-colors"
                  title="Ajustar Medidas / Posição"
                >
                  <Sliders className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setPhotoUrl('')}
                  className="p-1.5 rounded-lg bg-rose-500/80 hover:bg-rose-600 text-white transition-colors"
                  title="Remover Foto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-[9px] font-semibold text-teal-200 tracking-tight">
                {config.width}×{config.height}px {config.rotation ? `• ${config.rotation}°` : ''}
              </span>
            </div>
          </div>
        ) : (
          /* Empty Placeholder inside the White/Dashed Rectangle */
          <div className="flex flex-col items-center justify-center text-teal-800 space-y-1">
            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-[#178596] shadow-xs">
              <Camera className="w-4 h-4" />
            </div>
            <div className="text-[10px] font-bold leading-tight">
              Foto {config.rotation ? `(${config.rotation}°)` : 'Horizontal'}
            </div>
            <div className="text-[8px] text-teal-700/80 font-medium">
              Canto arredondado ({config.borderRadius}px)
            </div>
          </div>
        )}
      </div>



      {/* URL Input Popup */}
      {showUrlInput && (
        <div 
          onClick={(e) => e.stopPropagation()} 
          className="absolute inset-x-3 bottom-3 p-3 bg-slate-900/95 backdrop-blur-md rounded-2xl border border-white/20 text-white z-40 shadow-2xl"
        >
          <form onSubmit={handleApplyUrl} className="space-y-2">
            <div className="text-[11px] font-bold text-teal-200 flex items-center justify-between">
              <span>Link ou Tag da Foto 3x4</span>
              <button
                type="button"
                onClick={() => setShowUrlInput(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>
            <div className="flex gap-1.5">
              <input
                type="text"
                value={urlInputValue}
                onChange={(e) => setUrlInputValue(e.target.value)}
                placeholder="https://... ou <img src='...'>"
                className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
                autoFocus
              />
              <button
                type="submit"
                disabled={!urlInputValue.trim()}
                className="px-3 py-1.5 bg-[#178596] hover:bg-teal-600 disabled:opacity-50 rounded-xl text-xs font-bold text-white transition-colors"
              >
                Inserir
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal to Adjust Photo Slot Position, Size, and Border Radius */}
      {isConfigModalOpen && (
        <div 
          onClick={(e) => e.stopPropagation()} 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
        >
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0c515c] via-[#126b79] to-[#178596] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                  <Sliders className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold leading-tight">
                    Medidas e Posição da Foto 3x4
                  </h3>
                  <p className="text-[11px] text-teal-100">
                    Ajuste fino para encaixar no retângulo branco da imagem
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsConfigModalOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-5 space-y-4 overflow-y-auto text-xs text-slate-700">
              {/* Photo Source Quick Actions */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
                <div className="font-bold text-slate-800 flex items-center justify-between">
                  <span>Foto do Estudante (3x4)</span>
                  {photoUrl ? (
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Foto Inserida
                    </span>
                  ) : (
                    <span className="text-[10px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      Sem Foto
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      fileInputRef.current?.click();
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#178596] hover:bg-[#126b79] text-white font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload de Foto</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsConfigModalOpen(false);
                      setShowUrlInput(true);
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <LinkIcon className="w-3.5 h-3.5 text-[#178596]" />
                    <span>Por Link / URL</span>
                  </button>
                  {photoUrl && (
                    <button
                      type="button"
                      onClick={() => setPhotoUrl('')}
                      className="py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 font-bold transition-colors"
                      title="Remover Foto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Sliders Grid */}
              <div className="space-y-3.5">
                {/* Pos X */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-slate-700">Posição Horizontal (X):</span>
                    <span className="font-mono font-bold text-[#178596]">{config.x}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={cardWidth - config.width}
                    value={config.x}
                    onChange={(e) => setConfig({ ...config, x: Number(e.target.value) })}
                    className="w-full accent-[#178596]"
                  />
                </div>

                {/* Pos Y */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-slate-700">Posição Vertical (Y):</span>
                    <span className="font-mono font-bold text-[#178596]">{config.y}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={cardHeight - config.height}
                    value={config.y}
                    onChange={(e) => setConfig({ ...config, y: Number(e.target.value) })}
                    className="w-full accent-[#178596]"
                  />
                </div>

                {/* Width */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-slate-700">Largura (Width):</span>
                    <span className="font-mono font-bold text-[#178596]">{config.width}px</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="200"
                    value={config.width}
                    onChange={(e) => setConfig({ ...config, width: Number(e.target.value) })}
                    className="w-full accent-[#178596]"
                  />
                </div>

                {/* Height */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-slate-700">Altura (Height):</span>
                    <span className="font-mono font-bold text-[#178596]">{config.height}px</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="260"
                    value={config.height}
                    onChange={(e) => setConfig({ ...config, height: Number(e.target.value) })}
                    className="w-full accent-[#178596]"
                  />
                </div>

                {/* Corner Radius (Canto Arredondado) */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-slate-700">Canto Arredondado (Raio):</span>
                    <span className="font-mono font-bold text-[#178596]">{config.borderRadius}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="36"
                    value={config.borderRadius}
                    onChange={(e) => setConfig({ ...config, borderRadius: Number(e.target.value) })}
                    className="w-full accent-[#178596]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                    <span>0px (Reto)</span>
                    <span>14px (Padrão 3x4)</span>
                    <span>36px (Ultra Arredondado)</span>
                  </div>
                </div>

                {/* Fit and Border Options */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-medium text-slate-700 text-[11px]">Borda Branca</span>
                    <input
                      type="checkbox"
                      checked={config.showBorder}
                      onChange={(e) => setConfig({ ...config, showBorder: e.target.checked })}
                      className="w-4 h-4 accent-[#178596] rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-medium text-slate-700 text-[11px]">Ajuste da Foto</span>
                    <button
                      type="button"
                      onClick={() => setConfig({ ...config, objectFit: config.objectFit === 'cover' ? 'contain' : 'cover' })}
                      className="px-2 py-0.5 rounded-lg bg-white border border-slate-300 font-bold text-[10px] text-[#178596]"
                    >
                      {config.objectFit === 'cover' ? 'Preencher' : 'Conter'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={handleResetConfig}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-600 hover:bg-slate-200 text-xs font-semibold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurar Padrão</span>
              </button>

              <button
                type="button"
                onClick={() => setIsConfigModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#178596] hover:bg-[#126b79] text-white text-xs font-bold transition-colors shadow-xs"
              >
                Concluir Ajustes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
