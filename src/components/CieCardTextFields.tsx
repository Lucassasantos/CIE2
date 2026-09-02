import React, { useState, useEffect, useRef } from 'react';
import { useEditMode } from '../context/EditModeContext';
import { Check, Edit2, Move, RotateCcw, Grid } from 'lucide-react';

export interface CieFieldData {
  nome: string;
  cpfCin: string;
  nasc: string;
  curso: string;
  instituicao: string;
  ano: string;
  validade: string;
}

export interface CieFieldPositions {
  nome: { top: number; left: number };
  cpfCin: { top: number; left: number };
  nasc: { top: number; left: number };
  curso: { top: number; left: number };
  instituicao: { top: number; left: number };
  ano: { top: number; left: number };
  validade: { top: number; left: number };
}

const DEFAULT_CIE_FIELDS: CieFieldData = {
  nome: 'Nome do Estudante',
  cpfCin: 'CPF/CIN: 000.000.000-00',
  nasc: 'Nasc.: 17/11/1993',
  curso: 'OUTROS - ASSISTENTE DE CONTABILIDADE',
  instituicao: 'IFRS',
  ano: '2026',
  validade: 'Validade: 31/03/2027',
};

const DEFAULT_POSITIONS: CieFieldPositions = {
  nome: { top: 36, left: 168 },
  cpfCin: { top: 290, left: 172 },
  nasc: { top: 290, left: 150 },
  curso: { top: 290, left: 128 },
  instituicao: { top: 290, left: 106 },
  ano: { top: 430, left: 148 },
  validade: { top: 418, left: 176 },
};

const STORAGE_KEY_TEXTS = 'app_carteira_cie_fixed_fields_v3';
const STORAGE_KEY_POSITIONS = 'app_carteira_cie_field_positions_v3';

// Step size in pixels for snapping movement
const GRID_STEP = 4;

const snapToGrid = (val: number, step = GRID_STEP): number => {
  return Math.round(val / step) * step;
};

interface CieCardTextFieldsProps {
  cardWidth?: number;
  cardHeight?: number;
}

interface DraggableFieldProps {
  id: string;
  fieldKey: keyof CieFieldData;
  text: string;
  position: { top: number; left: number };
  fontSize: string;
  fontWeight: string;
  textColor?: string;
  isEditMode: boolean;
  isEditing: boolean;
  onStartEdit: () => void;
  onSaveText: (val: string) => void;
  onCancelEdit: () => void;
  onUpdatePosition: (newPos: { top: number; left: number }) => void;
  onDragStart: (key: keyof CieFieldData) => void;
  onDragEnd: () => void;
}

const DraggableField: React.FC<DraggableFieldProps> = ({
  id,
  fieldKey,
  text,
  position,
  fontSize,
  fontWeight,
  textColor = 'text-[#0f172a]',
  isEditMode,
  isEditing,
  onStartEdit,
  onSaveText,
  onCancelEdit,
  onUpdatePosition,
  onDragStart,
  onDragEnd,
}) => {
  const [tempText, setTempText] = useState(text);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Drag tracking state
  const dragRef = useRef<{
    startX: number;
    startY: number;
    startTop: number;
    startLeft: number;
    hasMoved: boolean;
  }>({
    startX: 0,
    startY: 0,
    startTop: position.top,
    startLeft: position.left,
    hasMoved: false,
  });

  useEffect(() => {
    setTempText(text);
  }, [text]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isEditMode || isEditing) return;

    e.stopPropagation();
    
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}

    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startTop: position.top,
      startLeft: position.left,
      hasMoved: false,
    };
    setIsDragging(true);
    onDragStart(fieldKey);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !isEditMode || isEditing) return;
    e.stopPropagation();

    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;

    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
      dragRef.current.hasMoved = true;
    }

    // Step-by-step movement snapped to grid (ponto em ponto)
    const rawTop = dragRef.current.startTop + dy;
    const rawLeft = dragRef.current.startLeft + dx;

    const nextTop = snapToGrid(rawTop, GRID_STEP);
    const nextLeft = snapToGrid(rawLeft, GRID_STEP);

    if (nextTop !== position.top || nextLeft !== position.left) {
      onUpdatePosition({ top: nextTop, left: nextLeft });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.stopPropagation();

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    setIsDragging(false);
    onDragEnd();

    if (!dragRef.current.hasMoved) {
      onStartEdit();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSaveText(tempText);
    } else if (e.key === 'Escape') {
      onCancelEdit();
    }
  };

  return (
    <div
      id={id}
      style={{
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: 'rotate(90deg)',
        transformOrigin: 'left top',
        pointerEvents: isEditMode ? 'auto' : 'none',
        touchAction: 'none',
      }}
      className={`group/field select-none ${isDragging ? 'z-40' : 'z-20'}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {isEditing ? (
        <div 
          onClick={(e) => e.stopPropagation()} 
          onPointerDown={(e) => e.stopPropagation()}
          className="flex items-center gap-1 bg-white/95 p-1 rounded-lg border-2 border-[#178596] shadow-xl backdrop-blur-md z-50 cursor-default"
        >
          <input
            ref={inputRef}
            type="text"
            value={tempText}
            onChange={(e) => setTempText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => onSaveText(tempText)}
            style={{ fontSize }}
            className={`font-sans bg-transparent outline-none px-1.5 py-0.5 ${fontWeight} ${textColor}`}
            placeholder="Digite o texto..."
          />
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              onSaveText(tempText);
            }}
            className="p-1 rounded-md bg-[#178596] text-white hover:bg-teal-600 transition-colors"
          >
            <Check className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div
          className={`flex items-center gap-1.5 transition-all rounded px-1.5 py-0.5 ${
            isEditMode
              ? isDragging
                ? 'cursor-grabbing bg-teal-500/30 ring-2 ring-[#178596] shadow-lg scale-105'
                : 'cursor-grab hover:bg-teal-500/20 hover:ring-1 hover:ring-teal-400 bg-white/50 border border-dashed border-teal-500/70 shadow-xs'
              : ''
          }`}
          title={isEditMode ? 'Arraste para mover (passo a passo) ou clique para editar' : undefined}
        >
          {isEditMode && (
            <Move className="w-2.5 h-2.5 text-[#178596] opacity-60 group-hover/field:opacity-100" />
          )}
          <span 
            style={{ fontSize }} 
            className={`font-sans leading-none whitespace-nowrap tracking-tight ${fontWeight} ${textColor}`}
          >
            {text}
          </span>
          {isEditMode && (
            <Edit2 className="w-2.5 h-2.5 text-[#178596] opacity-60 group-hover/field:opacity-100" />
          )}
        </div>
      )}
    </div>
  );
};

export const CieCardTextFields: React.FC<CieCardTextFieldsProps> = () => {
  const { isEditMode } = useEditMode();
  
  // Field values
  const [fields, setFields] = useState<CieFieldData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TEXTS);
      if (saved) {
        return { ...DEFAULT_CIE_FIELDS, ...JSON.parse(saved) };
      }
    } catch {}
    return DEFAULT_CIE_FIELDS;
  });

  // Field positions (top, left)
  const [positions, setPositions] = useState<CieFieldPositions>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_POSITIONS);
      if (saved) {
        return { ...DEFAULT_POSITIONS, ...JSON.parse(saved) };
      }
    } catch {}
    return DEFAULT_POSITIONS;
  });

  const [activeEditingField, setActiveEditingField] = useState<keyof CieFieldData | null>(null);
  const [draggingField, setDraggingField] = useState<keyof CieFieldData | null>(null);

  // Save texts to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TEXTS, JSON.stringify(fields));
  }, [fields]);

  // Save positions to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_POSITIONS, JSON.stringify(positions));
  }, [positions]);

  // Reset positions to default
  const handleResetPositions = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPositions(DEFAULT_POSITIONS);
  };

  const handleUpdatePosition = (key: keyof CieFieldData, newPos: { top: number; left: number }) => {
    setPositions(prev => ({
      ...prev,
      [key]: newPos,
    }));
  };

  const handleSaveText = (key: keyof CieFieldData, newText: string) => {
    setFields(prev => ({
      ...prev,
      [key]: newText.trim() || DEFAULT_CIE_FIELDS[key],
    }));
    setActiveEditingField(null);
  };

  const activeDragPos = draggingField ? positions[draggingField] : null;

  return (
    <div 
      id="cie-fixed-fields-overlay"
      className="absolute inset-0 pointer-events-none z-20 select-none font-sans"
    >
      {/* Visual Alignment Grid (Grade de Alinhamento ao Movimentar) */}
      {isEditMode && draggingField && (
        <div 
          id="alignment-grid-overlay"
          className="absolute inset-0 pointer-events-none z-10 animate-fade-in"
        >
          {/* Subtle Grid Background Pattern */}
          <svg className="w-full h-full opacity-60" width="100%" height="100%">
            <defs>
              {/* Minor 4px dot pattern */}
              <pattern id="minorGrid" width="8" height="8" patternUnits="userSpaceOnUse">
                <circle cx="4" cy="4" r="0.8" fill="#178596" opacity="0.35" />
              </pattern>
              {/* Major 24px grid lines */}
              <pattern id="majorGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#178596" strokeWidth="0.5" opacity="0.25" strokeDasharray="2,2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#minorGrid)" />
            <rect width="100%" height="100%" fill="url(#majorGrid)" />
          </svg>

          {/* Active Crosshair Guide Lines Passing Through the Dragged Field */}
          {activeDragPos && (
            <>
              {/* Horizontal Guide Line across card */}
              <div 
                style={{ top: `${activeDragPos.top}px` }}
                className="absolute left-0 right-0 h-[1px] bg-[#178596]/70 border-t border-dashed border-[#178596] shadow-xs"
              />
              {/* Vertical Guide Line across card */}
              <div 
                style={{ left: `${activeDragPos.left}px` }}
                className="absolute top-0 bottom-0 w-[1px] bg-[#178596]/70 border-l border-dashed border-[#178596] shadow-xs"
              />
            </>
          )}

          {/* Floating HUD info indicator */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-lg border border-teal-500/40 flex items-center gap-1.5 z-30">
            <Grid className="w-3 h-3 text-teal-400" />
            <span>Grade Ativa (Passo: {GRID_STEP}px)</span>
            {activeDragPos && (
              <span className="text-teal-300 font-mono pl-1 border-l border-white/20">
                X: {activeDragPos.left}px • Y: {activeDragPos.top}px
              </span>
            )}
          </div>
        </div>
      )}

      {/* 1. NOME DO ESTUDANTE (Em cima da foto - Tamanho 15px) */}
      <DraggableField
        id="field-nome-container"
        fieldKey="nome"
        text={fields.nome}
        position={positions.nome}
        fontSize="15px"
        fontWeight="font-bold"
        textColor="text-[#0f172a]"
        isEditMode={isEditMode}
        isEditing={activeEditingField === 'nome'}
        onStartEdit={() => setActiveEditingField('nome')}
        onSaveText={(val) => handleSaveText('nome', val)}
        onCancelEdit={() => setActiveEditingField(null)}
        onUpdatePosition={(pos) => handleUpdatePosition('nome', pos)}
        onDragStart={(k) => setDraggingField(k)}
        onDragEnd={() => setDraggingField(null)}
      />

      {/* 2. LINHA 1: CPF / CIN */}
      <DraggableField
        id="field-cpf-container"
        fieldKey="cpfCin"
        text={fields.cpfCin}
        position={positions.cpfCin}
        fontSize="11px"
        fontWeight="font-bold"
        textColor="text-[#0f172a]"
        isEditMode={isEditMode}
        isEditing={activeEditingField === 'cpfCin'}
        onStartEdit={() => setActiveEditingField('cpfCin')}
        onSaveText={(val) => handleSaveText('cpfCin', val)}
        onCancelEdit={() => setActiveEditingField(null)}
        onUpdatePosition={(pos) => handleUpdatePosition('cpfCin', pos)}
        onDragStart={(k) => setDraggingField(k)}
        onDragEnd={() => setDraggingField(null)}
      />

      {/* 3. LINHA 2: DATA DE NASCIMENTO */}
      <DraggableField
        id="field-nasc-container"
        fieldKey="nasc"
        text={fields.nasc}
        position={positions.nasc}
        fontSize="11px"
        fontWeight="font-medium"
        textColor="text-[#0f172a]"
        isEditMode={isEditMode}
        isEditing={activeEditingField === 'nasc'}
        onStartEdit={() => setActiveEditingField('nasc')}
        onSaveText={(val) => handleSaveText('nasc', val)}
        onCancelEdit={() => setActiveEditingField(null)}
        onUpdatePosition={(pos) => handleUpdatePosition('nasc', pos)}
        onDragStart={(k) => setDraggingField(k)}
        onDragEnd={() => setDraggingField(null)}
      />

      {/* 4. LINHA 3: NOME DO CURSO */}
      <DraggableField
        id="field-curso-container"
        fieldKey="curso"
        text={fields.curso}
        position={positions.curso}
        fontSize="10.5px"
        fontWeight="font-semibold"
        textColor="text-[#0f172a]"
        isEditMode={isEditMode}
        isEditing={activeEditingField === 'curso'}
        onStartEdit={() => setActiveEditingField('curso')}
        onSaveText={(val) => handleSaveText('curso', val)}
        onCancelEdit={() => setActiveEditingField(null)}
        onUpdatePosition={(pos) => handleUpdatePosition('curso', pos)}
        onDragStart={(k) => setDraggingField(k)}
        onDragEnd={() => setDraggingField(null)}
      />

      {/* 5. LINHA 4: NOME DA INSTITUIÇÃO */}
      <DraggableField
        id="field-instituicao-container"
        fieldKey="instituicao"
        text={fields.instituicao}
        position={positions.instituicao}
        fontSize="12px"
        fontWeight="font-bold"
        textColor="text-[#0f172a]"
        isEditMode={isEditMode}
        isEditing={activeEditingField === 'instituicao'}
        onStartEdit={() => setActiveEditingField('instituicao')}
        onSaveText={(val) => handleSaveText('instituicao', val)}
        onCancelEdit={() => setActiveEditingField(null)}
        onUpdatePosition={(pos) => handleUpdatePosition('instituicao', pos)}
        onDragStart={(k) => setDraggingField(k)}
        onDragEnd={() => setDraggingField(null)}
      />

      {/* 6. ANO (ex: 2026 - Em verde/teal estilizado, abaixo do QR Code) */}
      <DraggableField
        id="field-ano-container"
        fieldKey="ano"
        text={fields.ano}
        position={positions.ano}
        fontSize="24px"
        fontWeight="font-black tracking-tight"
        textColor="text-[#178596]"
        isEditMode={isEditMode}
        isEditing={activeEditingField === 'ano'}
        onStartEdit={() => setActiveEditingField('ano')}
        onSaveText={(val) => handleSaveText('ano', val)}
        onCancelEdit={() => setActiveEditingField(null)}
        onUpdatePosition={(pos) => handleUpdatePosition('ano', pos)}
        onDragStart={(k) => setDraggingField(k)}
        onDragEnd={() => setDraggingField(null)}
      />

      {/* 7. VALIDADE (ex: Validade: 31/03/2027) */}
      <DraggableField
        id="field-validade-container"
        fieldKey="validade"
        text={fields.validade}
        position={positions.validade}
        fontSize="8.5px"
        fontWeight="font-bold tracking-tight"
        textColor="text-slate-700"
        isEditMode={isEditMode}
        isEditing={activeEditingField === 'validade'}
        onStartEdit={() => setActiveEditingField('validade')}
        onSaveText={(val) => handleSaveText('validade', val)}
        onCancelEdit={() => setActiveEditingField(null)}
        onUpdatePosition={(pos) => handleUpdatePosition('validade', pos)}
        onDragStart={(k) => setDraggingField(k)}
        onDragEnd={() => setDraggingField(null)}
      />

      {/* Quick Reset Positions Button (Only visible in Edit Mode) */}
      {isEditMode && (
        <div className="absolute bottom-2 left-2 z-30 pointer-events-auto">
          <button
            type="button"
            onClick={handleResetPositions}
            className="flex items-center gap-1 text-[9px] font-semibold bg-white/90 hover:bg-white text-slate-700 px-2 py-1 rounded-md shadow-xs border border-slate-300 transition-colors"
            title="Redefinir posições padrão dos textos"
          >
            <RotateCcw className="w-2.5 h-2.5 text-[#178596]" />
            <span>Resetar Posições</span>
          </button>
        </div>
      )}
    </div>
  );
};
