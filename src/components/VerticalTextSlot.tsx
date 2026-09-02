import React, { useState, useEffect, useRef } from 'react';
import { 
  Type, 
  Sliders, 
  Trash2, 
  Check, 
  ArrowUp, 
  Move,
  Plus,
  Minus,
  Copy,
  RotateCcw,
  Sparkles,
  Layers,
  Italic,
  Bold,
  Palette,
  Eye,
  CheckCheck,
  X
} from 'lucide-react';
import { useEditMode } from '../context/EditModeContext';


export type FontFamilyType = 
  | 'mono' 
  | 'sans' 
  | 'roboto' 
  | 'inter' 
  | 'serif' 
  | 'display' 
  | 'ocr';

export type FontWeightType = 
  | 'light' 
  | 'normal' 
  | 'medium' 
  | 'semibold' 
  | 'bold' 
  | 'extrabold' 
  | 'black';

export type TextTransformType = 'uppercase' | 'lowercase' | 'capitalize' | 'none';
export type TextShadowType = 'none' | 'subtle' | 'outline' | 'glow' | 'strong';

export interface VerticalTextItem {
  id: string;
  enabled: boolean;
  text: string;
  x: number; // in px
  y: number; // in px
  height: number; // in px
  fontSize: number; // in px
  fontWeight: FontWeightType;
  fontFamily: FontFamilyType;
  fontStyle?: 'normal' | 'italic';
  textTransform?: TextTransformType;
  textDecoration?: 'none' | 'underline' | 'line-through';
  textShadow?: TextShadowType;
  opacity?: number;
  color: string;
  letterSpacing: number; // in px
  direction: 'bottom-to-top' | 'top-to-bottom';
  showBackground: boolean;
  backgroundColor: string;
}

export const FONT_FAMILY_OPTIONS: { id: FontFamilyType; label: string; cssFont: string; desc: string }[] = [
  { id: 'mono', label: 'Monospaçada (Padrão)', cssFont: 'ui-monospace, "Courier New", Courier, monospace', desc: 'Estilo código e documentos' },
  { id: 'ocr', label: 'OCR-B (Segurança)', cssFont: '"OCR A Extended", "Courier New", monospace', desc: 'Códigos bancários e oficiais' },
  { id: 'sans', label: 'Sans-Serif (Sistema)', cssFont: 'ui-sans-serif, system-ui, -apple-system, sans-serif', desc: 'Moderna e limpa' },
  { id: 'inter', label: 'Inter / UI Clean', cssFont: '"Inter", system-ui, sans-serif', desc: 'Alta legibilidade' },
  { id: 'roboto', label: 'Roboto / Arial', cssFont: '"Roboto", Arial, sans-serif', desc: 'Clássica e neutra' },
  { id: 'display', label: 'Impact / Condensada', cssFont: 'Impact, "Arial Narrow Bold", sans-serif', desc: 'Forte e destacada' },
  { id: 'serif', label: 'Serifada / Clássica', cssFont: 'ui-serif, Georgia, Cambria, "Times New Roman", serif', desc: 'Tradicional' },
];

export const FONT_WEIGHT_OPTIONS: { id: FontWeightType; label: string; numeric: number }[] = [
  { id: 'light', label: 'Fina (300)', numeric: 300 },
  { id: 'normal', label: 'Normal (400)', numeric: 400 },
  { id: 'medium', label: 'Média (500)', numeric: 500 },
  { id: 'semibold', label: 'Seminegrito (600)', numeric: 600 },
  { id: 'bold', label: 'Negrito (700)', numeric: 700 },
  { id: 'extrabold', label: 'Extra Negrito (800)', numeric: 800 },
  { id: 'black', label: 'Preta / Black (900)', numeric: 900 },
];

export const DEFAULT_VERTICAL_TEXT_LINES: VerticalTextItem[] = [
  {
    id: 'vtext-1',
    enabled: true,
    text: 'VALIDADE: 03/2026',
    x: 154,
    y: 152,
    height: 120,
    fontSize: 8,
    fontWeight: 'bold',
    fontFamily: 'mono',
    fontStyle: 'normal',
    textTransform: 'uppercase',
    textDecoration: 'none',
    textShadow: 'none',
    opacity: 1,
    color: '#0f172a',
    letterSpacing: 1.2,
    direction: 'bottom-to-top',
    showBackground: false,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  {
    id: 'vtext-2',
    enabled: true,
    text: 'CÓD. USO: BR-2026-98124',
    x: 166,
    y: 152,
    height: 120,
    fontSize: 8,
    fontWeight: 'bold',
    fontFamily: 'mono',
    fontStyle: 'normal',
    textTransform: 'uppercase',
    textDecoration: 'none',
    textShadow: 'none',
    opacity: 1,
    color: '#0f172a',
    letterSpacing: 1.2,
    direction: 'bottom-to-top',
    showBackground: false,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  {
    id: 'vtext-3',
    enabled: true,
    text: 'DOCUMENTO PADRÃO NACIONAL',
    x: 178,
    y: 152,
    height: 120,
    fontSize: 8,
    fontWeight: 'bold',
    fontFamily: 'mono',
    fontStyle: 'normal',
    textTransform: 'uppercase',
    textDecoration: 'none',
    textShadow: 'none',
    opacity: 1,
    color: '#0f172a',
    letterSpacing: 1.2,
    direction: 'bottom-to-top',
    showBackground: false,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  {
    id: 'vtext-4',
    enabled: true,
    text: 'CERTIFICAÇÃO DIGITAL ICP-BRASIL',
    x: 190,
    y: 152,
    height: 120,
    fontSize: 8,
    fontWeight: 'bold',
    fontFamily: 'mono',
    fontStyle: 'normal',
    textTransform: 'uppercase',
    textDecoration: 'none',
    textShadow: 'none',
    opacity: 1,
    color: '#0f172a',
    letterSpacing: 1.2,
    direction: 'bottom-to-top',
    showBackground: false,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  {
    id: 'vtext-5',
    enabled: true,
    text: 'DNE - CIE OFICIAL 2026',
    x: 202,
    y: 152,
    height: 120,
    fontSize: 8,
    fontWeight: 'bold',
    fontFamily: 'mono',
    fontStyle: 'normal',
    textTransform: 'uppercase',
    textDecoration: 'none',
    textShadow: 'none',
    opacity: 1,
    color: '#0f172a',
    letterSpacing: 1.2,
    direction: 'bottom-to-top',
    showBackground: false,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
];

interface VerticalTextSlotProps {
  cardWidth?: number;
  cardHeight?: number;
}

export const VerticalTextSlot: React.FC<VerticalTextSlotProps> = ({
  cardWidth = 355,
  cardHeight = 560,
}) => {
  const { isEditMode } = useEditMode();

  const [lines, setLines] = useState<VerticalTextItem[]>(() => {
    try {
      const saved = localStorage.getItem('app_carteira_vertical_text_lines_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      const savedV2 = localStorage.getItem('app_carteira_vertical_text_lines_v2');
      if (savedV2) {
        const parsedV2 = JSON.parse(savedV2);
        if (Array.isArray(parsedV2) && parsedV2.length > 0) {
          return parsedV2.map((item: any, idx: number) => ({
            ...DEFAULT_VERTICAL_TEXT_LINES[idx % DEFAULT_VERTICAL_TEXT_LINES.length],
            ...item,
          }));
        }
      }
      return DEFAULT_VERTICAL_TEXT_LINES;
    } catch {
      return DEFAULT_VERTICAL_TEXT_LINES;
    }
  });

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modalItem, setModalItem] = useState<VerticalTextItem | null>(null);
  const [activeTab, setActiveTab] = useState<'font' | 'position' | 'color' | 'presets'>('font');
  const [inputText, setInputText] = useState('');
  const [showApplyAllToast, setShowApplyAllToast] = useState(false);

  // Clear selection if edit mode is locked
  useEffect(() => {
    if (!isEditMode) {
      setSelectedId(null);
      setModalItem(null);
    }
  }, [isEditMode]);


  // Dragging and Resizing State
  const [isDragging, setIsDragging] = useState(false);
  const [activeResizeHandle, setActiveResizeHandle] = useState<'top' | 'bottom' | null>(null);
  const activeLineIdRef = useRef<string | null>(null);
  
  const dragStartRef = useRef<{
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
    initialHeight: number;
    initialFontSize: number;
  }>({
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
    initialHeight: 0,
    initialFontSize: 0,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('app_carteira_vertical_text_lines_v3', JSON.stringify(lines));
  }, [lines]);

  // Click outside to deselect
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setSelectedId(null);
      }
    };
    if (selectedId) {
      document.addEventListener('pointerdown', handleDocumentClick);
    }
    return () => {
      document.removeEventListener('pointerdown', handleDocumentClick);
    };
  }, [selectedId]);

  const updateLine = (id: string, updates: Partial<VerticalTextItem>) => {
    setLines(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const applyFontToAllLines = (sourceItem: VerticalTextItem) => {
    setLines(prev => prev.map(item => ({
      ...item,
      fontFamily: sourceItem.fontFamily,
      fontWeight: sourceItem.fontWeight,
      fontStyle: sourceItem.fontStyle || 'normal',
      textTransform: sourceItem.textTransform || 'uppercase',
      textDecoration: sourceItem.textDecoration || 'none',
      textShadow: sourceItem.textShadow || 'none',
      color: sourceItem.color,
      letterSpacing: sourceItem.letterSpacing,
      opacity: sourceItem.opacity ?? 1,
      fontSize: sourceItem.fontSize,
    })));
    setShowApplyAllToast(true);
    setTimeout(() => setShowApplyAllToast(false), 2500);
  };

  const selectedLine = lines.find(l => l.id === selectedId);

  const toggleDirection = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const item = lines.find(l => l.id === id);
    if (!item) return;
    updateLine(id, {
      direction: item.direction === 'bottom-to-top' ? 'top-to-bottom' : 'bottom-to-top'
    });
  };

  const handleApplyModalText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalItem) return;
    updateLine(modalItem.id, { ...modalItem, text: inputText });
    setModalItem(null);
  };

  // Pointer drag to move handler
  const handlePointerDownMove = (e: React.PointerEvent, item: VerticalTextItem) => {
    e.stopPropagation();
    setSelectedId(item.id);
    activeLineIdRef.current = item.id;
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: item.x,
      initialY: item.y,
      initialHeight: item.height,
      initialFontSize: item.fontSize,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const activeId = activeLineIdRef.current;
    if (!activeId) return;

    if (isDragging) {
      const deltaX = e.clientX - dragStartRef.current.startX;
      const deltaY = e.clientY - dragStartRef.current.startY;
      const newX = Math.max(0, Math.min(cardWidth - 20, Math.round(dragStartRef.current.initialX + deltaX)));
      const newY = Math.max(0, Math.min(cardHeight - 30, Math.round(dragStartRef.current.initialY + deltaY)));
      
      updateLine(activeId, {
        x: newX,
        y: newY,
      });
    } else if (activeResizeHandle === 'bottom') {
      const deltaY = e.clientY - dragStartRef.current.startY;
      const newHeight = Math.max(30, Math.min(cardHeight - dragStartRef.current.initialY, Math.round(dragStartRef.current.initialHeight + deltaY)));
      const scale = newHeight / dragStartRef.current.initialHeight;
      const newFontSize = Math.max(5, Math.min(24, Number((dragStartRef.current.initialFontSize * scale).toFixed(1))));
      
      updateLine(activeId, {
        height: newHeight,
        fontSize: newFontSize,
      });
    } else if (activeResizeHandle === 'top') {
      const deltaY = e.clientY - dragStartRef.current.startY;
      const proposedHeight = Math.round(dragStartRef.current.initialHeight - deltaY);
      const proposedY = Math.round(dragStartRef.current.initialY + deltaY);
      
      if (proposedHeight >= 30 && proposedY >= 0) {
        const scale = proposedHeight / dragStartRef.current.initialHeight;
        const newFontSize = Math.max(5, Math.min(24, Number((dragStartRef.current.initialFontSize * scale).toFixed(1))));
        updateLine(activeId, {
          y: proposedY,
          height: proposedHeight,
          fontSize: newFontSize,
        });
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
    if (activeResizeHandle) {
      setActiveResizeHandle(null);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
    activeLineIdRef.current = null;
  };

  // Start Resizing Handle Pointer Event
  const startResize = (e: React.PointerEvent, item: VerticalTextItem, handle: 'top' | 'bottom') => {
    e.stopPropagation();
    setSelectedId(item.id);
    activeLineIdRef.current = item.id;
    setActiveResizeHandle(handle);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: item.x,
      initialY: item.y,
      initialHeight: item.height,
      initialFontSize: item.fontSize,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handleDuplicate = (item: VerticalTextItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const newItem: VerticalTextItem = {
      ...item,
      id: `vtext-${Date.now()}`,
      x: Math.min(cardWidth - 25, item.x + 12),
      text: item.text,
    };
    setLines(prev => [...prev, newItem]);
    setSelectedId(newItem.id);
  };

  const handleAddNewLine = () => {
    const count = lines.length + 1;
    const lastLine = lines[lines.length - 1];
    const newX = lastLine ? Math.min(cardWidth - 25, lastLine.x + 12) : 160;
    const newItem: VerticalTextItem = {
      id: `vtext-${Date.now()}`,
      enabled: true,
      text: `LINHA VERTICAL ${count}`,
      x: newX,
      y: lastLine ? lastLine.y : 152,
      height: 120,
      fontSize: 8,
      fontWeight: 'bold',
      fontFamily: lastLine ? lastLine.fontFamily : 'mono',
      fontStyle: 'normal',
      textTransform: 'uppercase',
      textDecoration: 'none',
      textShadow: 'none',
      opacity: 1,
      color: lastLine ? lastLine.color : '#0f172a',
      letterSpacing: 1.2,
      direction: 'bottom-to-top',
      showBackground: false,
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
    };
    setLines(prev => [...prev, newItem]);
    setSelectedId(newItem.id);
  };

  const handleDeleteLine = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLines(prev => prev.filter(item => item.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const handleResetToDefault = () => {
    setLines(DEFAULT_VERTICAL_TEXT_LINES);
    setSelectedId(null);
  };

  // Helper to get CSS font string
  const getCssFontFamily = (family: FontFamilyType) => {
    const found = FONT_FAMILY_OPTIONS.find(f => f.id === family);
    return found ? found.cssFont : 'monospace';
  };

  // Helper to get CSS text shadow
  const getCssTextShadow = (shadow?: TextShadowType, color: string = '#000') => {
    switch (shadow) {
      case 'subtle':
        return '0 1px 2px rgba(0,0,0,0.4)';
      case 'outline':
        return `-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff`;
      case 'glow':
        return `0 0 6px ${color}, 0 0 10px ${color}`;
      case 'strong':
        return '0 2px 4px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.5)';
      default:
        return 'none';
    }
  };

  // Helper to get font weight value
  const getFontWeightValue = (weight: FontWeightType) => {
    const found = FONT_WEIGHT_OPTIONS.find(w => w.id === weight);
    return found ? found.numeric : 700;
  };

  const presets = [
    'VALIDADE: 03/2026',
    'VALIDADE: MARÇO/2026',
    'CÓD. USO: BR-2026-98124',
    'DOCUMENTO PADRÃO NACIONAL',
    'CERTIFICAÇÃO DIGITAL ICP-BRASIL',
    'MATRÍCULA: 2026104829',
    'DNE - CIE OFICIAL 2026',
    'MINISTÉRIO DA EDUCAÇÃO',
    'UNE - UBES - ANPG',
    'AUTENTICIDADE GARANTIDA',
  ];

  return (
    <div ref={containerRef} className="contents">
      {/* Toast Feedback for Apply to All */}
      {showApplyAllToast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce">
          <CheckCheck className="w-4 h-4" />
          <span>Fonte e estilo aplicados a todas as linhas!</span>
        </div>
      )}

      {/* Global Button if no lines or want to add line / restore */}
      {isEditMode && lines.length === 0 && (
        <div 
          onClick={(e) => e.stopPropagation()} 
          className="absolute top-11 right-3 z-30 flex items-center gap-1.5"
        >
          <button
            type="button"
            onClick={handleAddNewLine}
            className="p-1.5 rounded-lg bg-black/70 hover:bg-black/90 text-white text-[10px] flex items-center gap-1 backdrop-blur-md border border-white/20 shadow-sm"
            title="Adicionar linha de texto vertical"
          >
            <Plus className="w-3 h-3 text-teal-300" />
            <span>+ Linha Vertical</span>
          </button>
          <button
            type="button"
            onClick={handleResetToDefault}
            className="p-1.5 rounded-lg bg-teal-800/80 hover:bg-teal-700 text-white text-[10px] flex items-center gap-1 backdrop-blur-md border border-teal-400/30 shadow-sm"
            title="Restaurar 5 linhas padrão"
          >
            <RotateCcw className="w-3 h-3 text-teal-200" />
            <span>5 Linhas</span>
          </button>
        </div>
      )}

      {/* Render all individual vertical text lines */}
      {lines.map((item, index) => {
        if (!item.enabled) return null;
        const isSelected = isEditMode && selectedId === item.id;
        const isBottomToTop = item.direction === 'bottom-to-top';

        return (
          <div
            key={item.id}
            id={`vertical-text-line-${item.id}`}
            onClick={(e) => {
              if (!isEditMode) return;
              e.stopPropagation();
              setSelectedId(item.id);
            }}
            onPointerDown={(e) => {
              if (!isEditMode) return;
              handlePointerDownMove(e, item);
            }}
            onPointerMove={isEditMode ? handlePointerMove : undefined}
            onPointerUp={isEditMode ? handlePointerUp : undefined}
            onPointerCancel={isEditMode ? handlePointerUp : undefined}
            style={{
              left: `${item.x}px`,
              top: `${item.y}px`,
              height: `${item.height}px`,
              backgroundColor: item.showBackground ? item.backgroundColor : 'transparent',
              touchAction: isEditMode ? 'none' : 'auto',
              pointerEvents: isEditMode ? 'auto' : 'none',
            }}
            className={`absolute z-30 select-none transition-shadow flex items-center justify-center rounded px-0.5 ${
              isEditMode 
                ? isSelected 
                  ? 'group/vline cursor-move ring-2 ring-teal-500 bg-teal-500/10 shadow-lg' 
                  : 'group/vline cursor-move hover:ring-1 hover:ring-teal-400/80 hover:bg-white/40'
                : 'cursor-default pointer-events-none'
            }`}
            title={isEditMode ? `Linha ${index + 1}: Clique para mover, redimensionar ou trocar fonte` : undefined}
          >

            {/* Rotated Vertical Text with Full Typography Support */}
            <div
              style={{
                writingMode: 'vertical-rl',
                transform: isBottomToTop ? 'rotate(180deg)' : 'none',
                fontSize: `${item.fontSize}px`,
                fontWeight: getFontWeightValue(item.fontWeight),
                fontFamily: getCssFontFamily(item.fontFamily),
                fontStyle: item.fontStyle || 'normal',
                textTransform: item.textTransform || 'uppercase',
                textDecoration: item.textDecoration || 'none',
                textShadow: getCssTextShadow(item.textShadow, item.color),
                opacity: item.opacity ?? 1,
                color: item.color,
                letterSpacing: `${item.letterSpacing}px`,
                userSelect: 'none',
              }}
              className="whitespace-nowrap leading-none pointer-events-none"
            >
              {item.text || `LINHA ${index + 1}`}
            </div>

            {/* SELECTION CONTROLS & RESIZE HANDLES */}
            {isSelected && (
              <>
                {/* Top Resize Handle */}
                <div
                  onPointerDown={(e) => startResize(e, item, 'top')}
                  className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-teal-500 border-2 border-white rounded-full cursor-ns-resize shadow-md hover:scale-125 transition-transform z-50 flex items-center justify-center"
                  title="Arraste para redimensionar pelo topo"
                >
                  <div className="w-1 h-1 bg-white rounded-full" />
                </div>

                {/* Bottom Resize Handle */}
                <div
                  onPointerDown={(e) => startResize(e, item, 'bottom')}
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-teal-500 border-2 border-white rounded-full cursor-ns-resize shadow-md hover:scale-125 transition-transform z-50 flex items-center justify-center"
                  title="Arraste para redimensionar pela base"
                >
                  <div className="w-1 h-1 bg-white rounded-full" />
                </div>

                {/* Floating On-Canvas Quick Typography Toolbar */}
                <div 
                  onClick={(e) => e.stopPropagation()} 
                  onPointerDown={(e) => e.stopPropagation()}
                  className="absolute -top-11 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-slate-900/95 backdrop-blur-md px-2 py-1 rounded-2xl border border-white/20 shadow-2xl text-white z-50 animate-fade-in whitespace-nowrap"
                >
                  {/* Quick Font Family Switcher */}
                  <select
                    value={item.fontFamily}
                    onChange={(e) => updateLine(item.id, { fontFamily: e.target.value as FontFamilyType })}
                    className="bg-white/10 hover:bg-white/20 text-teal-200 text-[9px] font-bold rounded-lg px-1.5 py-0.5 border border-white/20 focus:outline-none cursor-pointer"
                    title="Trocar tipo de fonte"
                  >
                    {FONT_FAMILY_OPTIONS.map(f => (
                      <option key={f.id} value={f.id} className="bg-slate-900 text-white">
                        {f.label}
                      </option>
                    ))}
                  </select>

                  {/* Quick Font Weight Switcher */}
                  <select
                    value={item.fontWeight}
                    onChange={(e) => updateLine(item.id, { fontWeight: e.target.value as FontWeightType })}
                    className="bg-white/10 hover:bg-white/20 text-amber-200 text-[9px] font-bold rounded-lg px-1.5 py-0.5 border border-white/20 focus:outline-none cursor-pointer"
                    title="Trocar peso / espessura da fonte"
                  >
                    {FONT_WEIGHT_OPTIONS.map(w => (
                      <option key={w.id} value={w.id} className="bg-slate-900 text-white">
                        {w.label}
                      </option>
                    ))}
                  </select>

                  {/* Toggle Italic */}
                  <button
                    type="button"
                    onClick={() => updateLine(item.id, { fontStyle: item.fontStyle === 'italic' ? 'normal' : 'italic' })}
                    className={`p-1 rounded hover:bg-white/20 ${item.fontStyle === 'italic' ? 'bg-teal-500/40 text-teal-300' : 'text-slate-300'}`}
                    title="Alternar Itálico"
                  >
                    <Italic className="w-3 h-3" />
                  </button>

                  <div className="w-[1px] h-3.5 bg-white/20 mx-0.5" />

                  {/* Quick Font Size Controls */}
                  <button
                    type="button"
                    onClick={() => updateLine(item.id, { fontSize: Math.max(5, Number((item.fontSize - 0.5).toFixed(1))) })}
                    className="w-5 h-5 rounded hover:bg-white/20 text-slate-300 flex items-center justify-center font-bold"
                    title="Diminuir tamanho da fonte"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-[9px] font-mono font-bold text-teal-300 px-0.5">
                    {item.fontSize}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateLine(item.id, { fontSize: Math.min(24, Number((item.fontSize + 0.5).toFixed(1))) })}
                    className="w-5 h-5 rounded hover:bg-white/20 text-slate-300 flex items-center justify-center font-bold"
                    title="Aumentar tamanho da fonte"
                  >
                    <Plus className="w-3 h-3" />
                  </button>

                  <div className="w-[1px] h-3.5 bg-white/20 mx-0.5" />

                  {/* Invert Direction */}
                  <button
                    type="button"
                    onClick={(e) => toggleDirection(item.id, e)}
                    className="p-1 rounded hover:bg-white/20 text-amber-300"
                    title="Inverter direção (Baixo ⇄ Cima)"
                  >
                    <ArrowUp className={`w-3.5 h-3.5 transition-transform ${isBottomToTop ? '' : 'rotate-180'}`} />
                  </button>

                  {/* Duplicate Line */}
                  <button
                    type="button"
                    onClick={(e) => handleDuplicate(item, e)}
                    className="p-1 rounded hover:bg-white/20 text-blue-300"
                    title="Duplicar linha"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  {/* Full Customizer Modal */}
                  <button
                    type="button"
                    onClick={() => {
                      setInputText(item.text);
                      setModalItem(item);
                      setActiveTab('font');
                    }}
                    className="p-1 rounded bg-teal-700/60 hover:bg-teal-600 text-teal-200"
                    title="Abrir painel completo de Fontes, Estilos e Cores"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                  </button>

                  {/* Delete Line */}
                  <button
                    type="button"
                    onClick={(e) => handleDeleteLine(item.id, e)}
                    className="p-1 rounded hover:bg-rose-500/40 text-rose-300"
                    title="Excluir esta linha"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Done / Deselect */}
                  <button
                    type="button"
                    onClick={() => setSelectedId(null)}
                    className="p-1 rounded bg-teal-500 hover:bg-teal-600 text-white font-bold"
                    title="Concluir seleção"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            )}

            {/* Hover Hint when not selected */}
            {!isSelected && (
              <div 
                onClick={(e) => e.stopPropagation()} 
                className="absolute -top-7 left-1/2 -translate-x-1/2 hidden group-hover/vline:flex items-center gap-1 bg-slate-900/90 backdrop-blur-md px-1.5 py-0.5 rounded-lg border border-white/20 shadow-md text-white text-[8px] font-medium z-40 whitespace-nowrap pointer-events-none"
              >
                <Type className="w-2.5 h-2.5 text-teal-300" />
                <span>Linha {index + 1} ({item.fontFamily})</span>
              </div>
            )}
          </div>
        );
      })}

      {/* Floating Manager Badge on Top Right - ONLY VISIBLE IN EDIT MODE */}
      {isEditMode && (
        <div 
          onClick={(e) => e.stopPropagation()} 
          className="absolute top-11 right-3 z-30 flex items-center gap-1"
        >
          <button
            type="button"
            onClick={handleAddNewLine}
            className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white text-[10px] flex items-center gap-1 backdrop-blur-md border border-white/20 shadow-sm"
            title="Adicionar mais uma linha vertical"
          >
            <Plus className="w-3 h-3 text-teal-300" />
            <span>+ Linha</span>
          </button>

          <button
            type="button"
            onClick={handleResetToDefault}
            className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-slate-300 hover:text-white text-[10px] flex items-center gap-1 backdrop-blur-md border border-white/20 shadow-sm"
            title="Restaurar as 5 linhas originais"
          >
            <RotateCcw className="w-3 h-3 text-slate-300" />
            <span>Restaurar (5)</span>
          </button>
        </div>
      )}

      {/* MODAL / DIALOG FOR DETAILED FONT AND STYLE CUSTOMIZATION */}
      {modalItem && (
        <div 
          onClick={(e) => e.stopPropagation()}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 text-slate-800 space-y-4 animate-fade-in max-h-[92vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#178596]">
                  <Type className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-800">Personalização de Tipografia</h3>
                  <p className="text-[11px] text-slate-500">Tipo de fonte, peso, estilo e efeitos</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalItem(null)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl">
              <button
                type="button"
                onClick={() => setActiveTab('font')}
                className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'font' ? 'bg-white text-[#178596] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Type className="w-3.5 h-3.5" />
                <span>Fonte & Peso</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('position')}
                className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'position' ? 'bg-white text-[#178596] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Move className="w-3.5 h-3.5" />
                <span>Posição</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('color')}
                className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'color' ? 'bg-white text-[#178596] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Cores</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('presets')}
                className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'presets' ? 'bg-white text-[#178596] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Modelos</span>
              </button>
            </div>

            {/* Live Preview Box */}
            <div className="p-3 bg-slate-900 text-white rounded-2xl flex flex-col items-center justify-center overflow-hidden border border-slate-700 min-h-[60px]">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                Prévia da Fonte
              </span>
              <div 
                style={{
                  fontFamily: getCssFontFamily(modalItem.fontFamily),
                  fontWeight: getFontWeightValue(modalItem.fontWeight),
                  fontStyle: modalItem.fontStyle || 'normal',
                  textTransform: modalItem.textTransform || 'uppercase',
                  textDecoration: modalItem.textDecoration || 'none',
                  textShadow: getCssTextShadow(modalItem.textShadow, modalItem.color),
                  opacity: modalItem.opacity ?? 1,
                  color: modalItem.color,
                  letterSpacing: `${modalItem.letterSpacing}px`,
                  fontSize: `${Math.max(10, modalItem.fontSize * 1.3)}px`,
                }}
                className="whitespace-nowrap transition-all"
              >
                {inputText || modalItem.text || 'TEXTO DE EXEMPLO'}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleApplyModalText} className="space-y-3">
              {/* Text Input always available */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Texto da linha:
                </label>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ex: VALIDADE: 03/2026"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#178596]"
                />
              </div>

              {/* TAB 1: FONT & TYPOGRAPHY */}
              {activeTab === 'font' && (
                <div className="space-y-3 animate-fade-in">
                  {/* Font Family Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Tipo de Fonte (Família):
                    </label>
                    <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto p-1 bg-slate-50 rounded-2xl border border-slate-200">
                      {FONT_FAMILY_OPTIONS.map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setModalItem(prev => prev ? { ...prev, fontFamily: f.id } : null)}
                          style={{ fontFamily: f.cssFont }}
                          className={`p-2 rounded-xl text-left transition-all border ${
                            modalItem.fontFamily === f.id
                              ? 'bg-[#178596] text-white border-[#178596] shadow-xs'
                              : 'bg-white text-slate-800 border-slate-200 hover:border-teal-300'
                          }`}
                        >
                          <div className="text-xs font-bold leading-tight">{f.label}</div>
                          <div className={`text-[9px] truncate ${modalItem.fontFamily === f.id ? 'text-teal-100' : 'text-slate-500'}`}>
                            {f.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Font Weight Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Peso da Fonte (Espessura):
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {FONT_WEIGHT_OPTIONS.map((w) => (
                        <button
                          key={w.id}
                          type="button"
                          onClick={() => setModalItem(prev => prev ? { ...prev, fontWeight: w.id } : null)}
                          style={{ fontWeight: w.numeric }}
                          className={`px-2.5 py-1.5 rounded-xl text-xs transition-all border ${
                            modalItem.fontWeight === w.id
                              ? 'bg-[#178596] text-white border-[#178596] shadow-xs font-bold'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {w.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Styles: Italic, Transform, Shadow */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Estilo & Itálico:
                      </label>
                      <button
                        type="button"
                        onClick={() => setModalItem(prev => prev ? {
                          ...prev,
                          fontStyle: prev.fontStyle === 'italic' ? 'normal' : 'italic'
                        } : null)}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                          modalItem.fontStyle === 'italic'
                            ? 'bg-teal-50 border-teal-400 text-[#178596]'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <Italic className="w-3.5 h-3.5" />
                        <span>{modalItem.fontStyle === 'italic' ? 'Itálico Ativo' : 'Texto Normal'}</span>
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Caixa do Texto:
                      </label>
                      <select
                        value={modalItem.textTransform || 'uppercase'}
                        onChange={(e) => setModalItem(prev => prev ? { ...prev, textTransform: e.target.value as TextTransformType } : null)}
                        className="w-full px-2.5 py-2 text-xs font-bold rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                      >
                        <option value="uppercase">MAIÚSCULAS</option>
                        <option value="lowercase">minúsculas</option>
                        <option value="capitalize">Primeira Maiúscula</option>
                        <option value="none">Normal (Como digitado)</option>
                      </select>
                    </div>
                  </div>

                  {/* Text Shadow / Outline & Opacity */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Efeito / Sombra:
                      </label>
                      <select
                        value={modalItem.textShadow || 'none'}
                        onChange={(e) => setModalItem(prev => prev ? { ...prev, textShadow: e.target.value as TextShadowType } : null)}
                        className="w-full px-2.5 py-2 text-xs font-bold rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                      >
                        <option value="none">Nenhum efeito</option>
                        <option value="subtle">Sombra Suave</option>
                        <option value="outline">Contorno Branco</option>
                        <option value="glow">Brilho (Glow)</option>
                        <option value="strong">Sombra Marcada</option>
                      </select>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                        <span>Opacidade:</span>
                        <span className="font-mono text-[#178596]">{Math.round((modalItem.opacity ?? 1) * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.2"
                        max="1"
                        step="0.05"
                        value={modalItem.opacity ?? 1}
                        onChange={(e) => setModalItem(prev => prev ? { ...prev, opacity: Number(e.target.value) } : null)}
                        className="w-full accent-[#178596]"
                      />
                    </div>
                  </div>

                  {/* Apply to all lines shortcut */}
                  <div className="pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => applyFontToAllLines(modalItem)}
                      className="w-full py-2 px-3 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-200 text-[#178596] text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
                    >
                      <CheckCheck className="w-4 h-4" />
                      <span>Aplicar este estilo de fonte a TODAS as 5 linhas</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: POSITION & DIMENSIONS */}
              {activeTab === 'position' && (
                <div className="space-y-3 animate-fade-in">
                  {/* Direção: Baixo pra Cima vs Cima pra Baixo */}
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">Direção da Leitura</span>
                      <span className="text-[10px] font-bold text-[#178596] bg-teal-50 px-2 py-0.5 rounded">
                        {modalItem.direction === 'bottom-to-top' ? 'De Baixo para Cima' : 'De Cima para Baixo'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setModalItem(prev => prev ? { ...prev, direction: 'bottom-to-top' } : null)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                          modalItem.direction === 'bottom-to-top'
                            ? 'bg-[#178596] text-white shadow-xs'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                        <span>Baixo p/ Cima</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setModalItem(prev => prev ? { ...prev, direction: 'top-to-bottom' } : null)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                          modalItem.direction === 'top-to-bottom'
                            ? 'bg-[#178596] text-white shadow-xs'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <ArrowUp className="w-3.5 h-3.5 rotate-180" />
                        <span>Cima p/ Baixo</span>
                      </button>
                    </div>
                  </div>

                  {/* Sliders */}
                  <div className="space-y-2.5">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-600">Posição Horizontal (X):</span>
                        <span className="font-mono font-bold text-[#178596]">{modalItem.x}px</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={cardWidth - 20}
                        value={modalItem.x}
                        onChange={(e) => setModalItem(prev => prev ? { ...prev, x: Number(e.target.value) } : null)}
                        className="w-full accent-[#178596]"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-600">Posição Vertical (Y):</span>
                        <span className="font-mono font-bold text-[#178596]">{modalItem.y}px</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={cardHeight - 40}
                        value={modalItem.y}
                        onChange={(e) => setModalItem(prev => prev ? { ...prev, y: Number(e.target.value) } : null)}
                        className="w-full accent-[#178596]"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-600">Altura da Linha:</span>
                        <span className="font-mono font-bold text-[#178596]">{modalItem.height}px</span>
                      </div>
                      <input
                        type="range"
                        min="30"
                        max={cardHeight - 50}
                        value={modalItem.height}
                        onChange={(e) => setModalItem(prev => prev ? { ...prev, height: Number(e.target.value) } : null)}
                        className="w-full accent-[#178596]"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-600">Tamanho da Fonte:</span>
                        <span className="font-mono font-bold text-[#178596]">{modalItem.fontSize}px</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="24"
                        step="0.5"
                        value={modalItem.fontSize}
                        onChange={(e) => setModalItem(prev => prev ? { ...prev, fontSize: Number(e.target.value) } : null)}
                        className="w-full accent-[#178596]"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-600">Espaçamento entre letras:</span>
                        <span className="font-mono font-bold text-[#178596]">{modalItem.letterSpacing}px</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="6"
                        step="0.5"
                        value={modalItem.letterSpacing}
                        onChange={(e) => setModalItem(prev => prev ? { ...prev, letterSpacing: Number(e.target.value) } : null)}
                        className="w-full accent-[#178596]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: COLORS & BACKGROUND */}
              {activeTab === 'color' && (
                <div className="space-y-3 animate-fade-in">
                  {/* Text Color */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      Cor da Fonte:
                    </label>
                    <div className="flex items-center gap-2 flex-wrap">
                      {['#0f172a', '#178596', '#0284c7', '#1e293b', '#b45309', '#047857', '#e11d48', '#ffffff'].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setModalItem(prev => prev ? { ...prev, color: c } : null)}
                          style={{ backgroundColor: c }}
                          className={`w-7 h-7 rounded-full border-2 transition-all ${
                            modalItem.color === c ? 'border-teal-500 scale-110 shadow-md ring-2 ring-teal-500/30' : 'border-slate-300'
                          }`}
                        />
                      ))}
                      <input
                        type="color"
                        value={modalItem.color}
                        onChange={(e) => setModalItem(prev => prev ? { ...prev, color: e.target.value } : null)}
                        className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300 p-0"
                      />
                    </div>
                  </div>

                  {/* Show Background Option */}
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">Fundo Realçado (Tarja)</span>
                      <input
                        type="checkbox"
                        checked={modalItem.showBackground}
                        onChange={(e) => setModalItem(prev => prev ? { ...prev, showBackground: e.target.checked } : null)}
                        className="w-4 h-4 rounded text-[#178596] accent-[#178596]"
                      />
                    </div>
                    {modalItem.showBackground && (
                      <div className="flex items-center gap-2 pt-1">
                        {['rgba(255, 255, 255, 0.9)', 'rgba(0, 0, 0, 0.8)', 'rgba(23, 133, 150, 0.85)', 'rgba(254, 240, 138, 0.9)'].map((bg) => (
                          <button
                            key={bg}
                            type="button"
                            onClick={() => setModalItem(prev => prev ? { ...prev, backgroundColor: bg } : null)}
                            style={{ backgroundColor: bg }}
                            className="w-7 h-7 rounded-lg border border-slate-300 shadow-xs"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: PRESETS */}
              {activeTab === 'presets' && (
                <div className="space-y-2 animate-fade-in">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Sugestões Oficiais DNE / CIE
                  </span>
                  <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto">
                    {presets.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => {
                          setInputText(preset);
                          setModalItem(prev => prev ? { ...prev, text: preset } : null);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-slate-700 text-xs font-mono font-medium transition-colors flex items-center justify-between"
                      >
                        <span>{preset}</span>
                        <span className="text-[10px] text-teal-600 font-sans font-bold">Usar</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    handleDeleteLine(modalItem.id);
                    setModalItem(null);
                  }}
                  className="text-xs text-rose-600 hover:text-rose-700 font-semibold"
                >
                  Excluir Linha
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setModalItem(null)}
                    className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#178596] hover:bg-[#126b79] text-white text-xs font-bold shadow-sm"
                  >
                    Salvar Alterações
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
