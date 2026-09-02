import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Upload, 
  Link as LinkIcon, 
  Trash2, 
  Maximize2, 
  Image as ImageIcon,
  RotateCw,
  Lock,
  Unlock,
  Sparkles
} from 'lucide-react';
import { parseImageInput } from '../../utils/imageParser';
import { StudentPhotoSlot } from '../StudentPhotoSlot';
import { VerticalTextSlot } from '../VerticalTextSlot';
import { useEditMode } from '../../context/EditModeContext';
import { EditableText } from '../EditableText';

interface InicioTabProps {
  [key: string]: any;
}

export const InicioTab: React.FC<InicioTabProps> = () => {
  const { isEditMode, toggleEditMode } = useEditMode();
  const [isFlipped, setIsFlipped] = useState(false);

  // Front Photo
  const [frontPhoto, setFrontPhoto] = useState<string>(() => {
    return localStorage.getItem('app_carteira_frente') || localStorage.getItem('app_center_photo') || '';
  });

  // Back Photo
  const [backPhoto, setBackPhoto] = useState<string>(() => {
    return localStorage.getItem('app_carteira_verso') || '';
  });

  const [showUrlInputFront, setShowUrlInputFront] = useState(false);
  const [showUrlInputBack, setShowUrlInputBack] = useState(false);
  const [urlInputValue, setUrlInputValue] = useState('');
  
  const [isDraggingFront, setIsDraggingFront] = useState(false);
  const [isDraggingBack, setIsDraggingBack] = useState(false);
  
  const [objectFitFront, setObjectFitFront] = useState<'cover' | 'contain'>('cover');
  const [objectFitBack, setObjectFitBack] = useState<'cover' | 'contain'>('cover');

  const fileInputFrontRef = useRef<HTMLInputElement>(null);
  const fileInputBackRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isEditMode) {
      setShowUrlInputFront(false);
      setShowUrlInputBack(false);
    }
  }, [isEditMode]);

  useEffect(() => {
    if (frontPhoto) {
      localStorage.setItem('app_carteira_frente', frontPhoto);
      localStorage.setItem('app_center_photo', frontPhoto);
    } else {
      localStorage.removeItem('app_carteira_frente');
      localStorage.removeItem('app_center_photo');
    }
  }, [frontPhoto]);

  useEffect(() => {
    if (backPhoto) {
      localStorage.setItem('app_carteira_verso', backPhoto);
    } else {
      localStorage.removeItem('app_carteira_verso');
    }
  }, [backPhoto]);

  const handleFileUpload = (file: File, side: 'front' | 'back') => {
    if (!isEditMode) return;
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        if (side === 'front') {
          setFrontPhoto(e.target.result);
        } else {
          setBackPhoto(e.target.result);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyUrl = (e: React.FormEvent, side: 'front' | 'back') => {
    e.preventDefault();
    e.stopPropagation();
    if (!urlInputValue.trim()) return;
    const parsed = parseImageInput(urlInputValue);
    if (parsed.src) {
      if (side === 'front') {
        setFrontPhoto(parsed.src);
        setShowUrlInputFront(false);
      } else {
        setBackPhoto(parsed.src);
        setShowUrlInputBack(false);
      }
      setUrlInputValue('');
    }
  };

  return (
    <div 
      id="tab-inicio-container" 
      className="min-h-full flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-50 select-none gap-4"
    >
      {/* Hidden File Inputs (only active in edit mode) */}
      {isEditMode && (
        <>
          <input
            ref={fileInputFrontRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file, 'front');
            }}
            className="hidden"
          />
          <input
            ref={fileInputBackRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file, 'back');
            }}
            className="hidden"
          />
        </>
      )}

      {/* 3D Perspective Wrapper */}
      <div 
        className="perspective-1000 flex items-center justify-center"
        style={{ perspective: '1200px' }}
      >
        {/* Animated 3D Card */}
        <motion.div
          id="photo-frame-container"
          onClick={() => setIsFlipped(!isFlipped)}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
          style={{ 
            width: '355px', 
            height: '560px',
            transformStyle: 'preserve-3d'
          }}
          className="relative max-w-full rounded-3xl cursor-pointer shadow-xl transition-shadow hover:shadow-2xl"
        >
          {/* ==================== FRONT SIDE ==================== */}
          <div
            style={{ 
              transform: 'rotateY(0deg)',
              backfaceVisibility: 'hidden', 
              WebkitBackfaceVisibility: 'hidden',
              transformStyle: 'preserve-3d',
            }}
            onDrop={(e) => {
              if (!isEditMode) return;
              e.preventDefault();
              setIsDraggingFront(false);
              const file = e.dataTransfer.files?.[0];
              if (file) handleFileUpload(file, 'front');
            }}
            onDragOver={(e) => {
              if (!isEditMode) return;
              e.preventDefault();
              setIsDraggingFront(true);
            }}
            onDragLeave={() => setIsDraggingFront(false)}
            className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden border-2 bg-white flex flex-col justify-center items-center select-none shadow-sm ${
              isDraggingFront 
                ? 'border-[#178596] bg-teal-50 ring-4 ring-teal-500/20' 
                : 'border-slate-300 hover:border-slate-400'
            }`}
          >
            {/* Front Side Badge */}
            <div className="absolute top-3 left-3 z-30 pointer-events-none">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-black/60 text-white backdrop-blur-md border border-white/20">
                <EditableText id="badge_frente" defaultText="Frente" />
              </span>
            </div>

            {frontPhoto ? (
              <div className="relative w-full h-full group bg-slate-950 flex items-center justify-center overflow-hidden">
                <img
                  src={frontPhoto}
                  alt="Frente da Carteirinha"
                  referrerPolicy="no-referrer"
                  className={`w-full h-full transition-all duration-300 ${
                    objectFitFront === 'cover' ? 'object-cover' : 'object-contain'
                  }`}
                />

                {/* Slot para Inserir Foto com Canto Arredondado sobre o Retângulo Branco da Carteirinha */}
                <StudentPhotoSlot cardWidth={355} cardHeight={560} />

                {/* Texto Vertical ao lado direito da foto (de baixo para cima) */}
                <VerticalTextSlot cardWidth={355} cardHeight={560} />

                {/* Floating controls - ONLY VISIBLE IN EDIT MODE */}
                {isEditMode && (
                  <div 
                    onClick={(e) => e.stopPropagation()} 
                    className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 z-30"
                  >
                    <button
                      type="button"
                      onClick={() => setObjectFitFront(objectFitFront === 'cover' ? 'contain' : 'cover')}
                      className="p-2 rounded-xl text-white hover:bg-white/20 transition-colors"
                      title={objectFitFront === 'cover' ? 'Ajustar para caber inteiro (contain)' : 'Preencher quadro (cover)'}
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => fileInputFrontRef.current?.click()}
                      className="p-2 rounded-xl text-white hover:bg-white/20 transition-colors"
                      title="Trocar Foto da Frente"
                    >
                      <Upload className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowUrlInputFront(!showUrlInputFront)}
                      className="p-2 rounded-xl text-white hover:bg-white/20 transition-colors"
                      title="Trocar Foto por Link"
                    >
                      <LinkIcon className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setFrontPhoto('')}
                      className="p-2 rounded-xl text-rose-300 hover:bg-rose-500/30 transition-colors"
                      title="Remover Foto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* URL input modal */}
                {isEditMode && showUrlInputFront && (
                  <div 
                    onClick={(e) => e.stopPropagation()} 
                    className="absolute inset-x-3 bottom-3 p-3 bg-slate-900/95 backdrop-blur-md rounded-2xl border border-white/20 text-white z-40"
                  >
                    <form onSubmit={(e) => handleApplyUrl(e, 'front')} className="space-y-2">
                      <div className="text-[11px] font-bold text-teal-200">URL ou &lt;img&gt; da Frente</div>
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          value={urlInputValue}
                          onChange={(e) => setUrlInputValue(e.target.value)}
                          placeholder="https://..."
                          className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
                        />
                        <button
                          type="submit"
                          className="px-3 py-1.5 bg-[#178596] hover:bg-teal-600 rounded-xl text-xs font-bold text-white"
                        >
                          OK
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowUrlInputFront(false)}
                          className="px-2 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs text-white"
                        >
                          ✕
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            ) : (
              /* EMPTY FRONT */
              <div className="p-6 text-center w-full h-full flex flex-col justify-between items-center bg-slate-50">
                <div className="w-full flex justify-end">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                    355 × 560 pt
                  </span>
                </div>

                <div className="space-y-4 max-w-[280px]">
                  <div className="w-16 h-16 mx-auto rounded-3xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#178596] shadow-xs">
                    <ImageIcon className="w-8 h-8 text-[#178596]" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-800 tracking-tight">
                      <EditableText id="title_foto_frente" defaultText="Foto da Frente" />
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {isEditMode 
                        ? 'Arraste ou escolha a foto para a frente da carteirinha' 
                        : 'Nenhuma imagem carregada na frente da carteirinha'}
                    </p>
                  </div>

                  {isEditMode && (
                    <div className="flex flex-col gap-2 pt-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => fileInputFrontRef.current?.click()}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#178596] hover:bg-[#126b79] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Escolher Arquivo da Frente</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowUrlInputFront(!showUrlInputFront)}
                        className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-bold transition-colors flex items-center justify-center gap-2"
                      >
                        <LinkIcon className="w-4 h-4 text-[#178596]" />
                        <span>Inserir Link da Imagem</span>
                      </button>
                    </div>
                  )}

                  {isEditMode && showUrlInputFront && (
                    <form 
                      onClick={(e) => e.stopPropagation()} 
                      onSubmit={(e) => handleApplyUrl(e, 'front')} 
                      className="pt-2 space-y-2 text-left animate-fade-in"
                    >
                      <input
                        type="text"
                        value={urlInputValue}
                        onChange={(e) => setUrlInputValue(e.target.value)}
                        placeholder="https://exemplo.com/frente.jpg"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#178596]"
                      />
                      <button
                        type="submit"
                        disabled={!urlInputValue.trim()}
                        className="w-full py-1.5 bg-[#178596] hover:bg-[#126b79] disabled:opacity-50 rounded-xl text-xs font-bold text-white transition-colors"
                      >
                        Aplicar Foto
                      </button>
                    </form>
                  )}
                </div>

                <div className="text-[11px] text-slate-400 font-medium">
                  Toque para virar o lado
                </div>
              </div>
            )}
          </div>

          {/* ==================== BACK SIDE ==================== */}
          <div
            style={{ 
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden', 
              WebkitBackfaceVisibility: 'hidden',
              transformStyle: 'preserve-3d',
            }}
            onDrop={(e) => {
              if (!isEditMode) return;
              e.preventDefault();
              setIsDraggingBack(false);
              const file = e.dataTransfer.files?.[0];
              if (file) handleFileUpload(file, 'back');
            }}
            onDragOver={(e) => {
              if (!isEditMode) return;
              e.preventDefault();
              setIsDraggingBack(true);
            }}
            onDragLeave={() => setIsDraggingBack(false)}
            className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden border-2 bg-white flex flex-col justify-center items-center select-none shadow-sm ${
              isDraggingBack 
                ? 'border-[#178596] bg-teal-50 ring-4 ring-teal-500/20' 
                : 'border-slate-300 hover:border-slate-400'
            }`}
          >
            {/* Back Side Badge */}
            <div className="absolute top-3 left-3 z-30 pointer-events-none">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#178596] text-white backdrop-blur-md border border-white/20">
                <EditableText id="badge_verso" defaultText="Verso" />
              </span>
            </div>

            {backPhoto ? (
              <div className="relative w-full h-full group bg-slate-950 flex items-center justify-center overflow-hidden">
                <img
                  src={backPhoto}
                  alt="Verso da Carteirinha"
                  referrerPolicy="no-referrer"
                  className={`w-full h-full transition-all duration-300 ${
                    objectFitBack === 'cover' ? 'object-cover' : 'object-contain'
                  }`}
                />

                {/* Floating controls - ONLY VISIBLE IN EDIT MODE */}
                {isEditMode && (
                  <div 
                    onClick={(e) => e.stopPropagation()} 
                    className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 z-30"
                  >
                    <button
                      type="button"
                      onClick={() => setObjectFitBack(objectFitBack === 'cover' ? 'contain' : 'cover')}
                      className="p-2 rounded-xl text-white hover:bg-white/20 transition-colors"
                      title={objectFitBack === 'cover' ? 'Ajustar para caber inteiro (contain)' : 'Preencher quadro (cover)'}
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => fileInputBackRef.current?.click()}
                      className="p-2 rounded-xl text-white hover:bg-white/20 transition-colors"
                      title="Trocar Foto do Verso"
                    >
                      <Upload className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowUrlInputBack(!showUrlInputBack)}
                      className="p-2 rounded-xl text-white hover:bg-white/20 transition-colors"
                      title="Trocar Foto por Link"
                    >
                      <LinkIcon className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setBackPhoto('')}
                      className="p-2 rounded-xl text-rose-300 hover:bg-rose-500/30 transition-colors"
                      title="Remover Verso"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* URL input modal */}
                {isEditMode && showUrlInputBack && (
                  <div 
                    onClick={(e) => e.stopPropagation()} 
                    className="absolute inset-x-3 bottom-3 p-3 bg-slate-900/95 backdrop-blur-md rounded-2xl border border-white/20 text-white z-40"
                  >
                    <form onSubmit={(e) => handleApplyUrl(e, 'back')} className="space-y-2">
                      <div className="text-[11px] font-bold text-teal-200">URL ou &lt;img&gt; do Verso</div>
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          value={urlInputValue}
                          onChange={(e) => setUrlInputValue(e.target.value)}
                          placeholder="https://..."
                          className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
                        />
                        <button
                          type="submit"
                          className="px-3 py-1.5 bg-[#178596] hover:bg-teal-600 rounded-xl text-xs font-bold text-white"
                        >
                          OK
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowUrlInputBack(false)}
                          className="px-2 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs text-white"
                        >
                          ✕
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            ) : (
              /* EMPTY BACK */
              <div className="p-6 text-center w-full h-full flex flex-col justify-between items-center bg-slate-50">
                <div className="w-full flex justify-end">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                    355 × 560 pt (Verso)
                  </span>
                </div>

                <div className="space-y-4 max-w-[280px]">
                  <div className="w-16 h-16 mx-auto rounded-3xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#178596] shadow-xs">
                    <RotateCw className="w-8 h-8 text-[#178596]" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-800 tracking-tight">
                      <EditableText id="title_foto_verso" defaultText="Foto do Verso" />
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {isEditMode 
                        ? 'Adicione o verso da sua carteirinha (código de barras, validação, etc)'
                        : 'Nenhuma imagem carregada no verso da carteirinha'}
                    </p>
                  </div>

                  {isEditMode && (
                    <div className="flex flex-col gap-2 pt-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => fileInputBackRef.current?.click()}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#178596] hover:bg-[#126b79] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Escolher Arquivo do Verso</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowUrlInputBack(!showUrlInputBack)}
                        className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-bold transition-colors flex items-center justify-center gap-2"
                      >
                        <LinkIcon className="w-4 h-4 text-[#178596]" />
                        <span>Inserir Link do Verso</span>
                      </button>
                    </div>
                  )}

                  {isEditMode && showUrlInputBack && (
                    <form 
                      onClick={(e) => e.stopPropagation()} 
                      onSubmit={(e) => handleApplyUrl(e, 'back')} 
                      className="pt-2 space-y-2 text-left animate-fade-in"
                    >
                      <input
                        type="text"
                        value={urlInputValue}
                        onChange={(e) => setUrlInputValue(e.target.value)}
                        placeholder="https://exemplo.com/verso.jpg"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#178596]"
                      />
                      <button
                        type="submit"
                        disabled={!urlInputValue.trim()}
                        className="w-full py-1.5 bg-[#178596] hover:bg-[#126b79] disabled:opacity-50 rounded-xl text-xs font-bold text-white transition-colors"
                      >
                        Aplicar Verso
                      </button>
                    </form>
                  )}
                </div>

                <div className="text-[11px] text-slate-400 font-medium">
                  Toque para voltar à frente
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Phrase below rectangular area */}
      <p 
        id="text-touch-carteirinha-hint"
        className="text-xs sm:text-sm text-slate-500 font-medium text-center select-none cursor-pointer hover:text-[#178596] transition-colors"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <EditableText
          id="text_touch_hint_label"
          defaultText="Toque na carteirinha para exibir o lado oposto"
        />
        <span className="ml-1 text-[11px] text-slate-400">
          ({isFlipped ? 'vendo Verso' : 'vendo Frente'})
        </span>
      </p>
    </div>
  );
};

