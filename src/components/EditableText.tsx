import React, { useState, useEffect, useRef } from 'react';
import { useEditMode } from '../context/EditModeContext';
import { Edit3 } from 'lucide-react';

interface EditableTextProps {
  id: string;
  defaultText: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div' | 'label' | 'strong' | 'em';
  className?: string;
  style?: React.CSSProperties;
  multiline?: boolean;
  placeholder?: string;
  title?: string;
  children?: React.ReactNode;
}

export const EditableText: React.FC<EditableTextProps> = ({
  id,
  defaultText,
  as: Component = 'span',
  className = '',
  style,
  multiline = false,
  placeholder,
  title,
}) => {
  const { isEditMode } = useEditMode();
  const storageKey = `app_custom_text_${id}`;

  const [text, setText] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved !== null ? saved : defaultText;
    } catch {
      return defaultText;
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  // Sync if defaultText changes and no custom text exists
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === null) {
        setText(defaultText);
      }
    } catch {}
  }, [defaultText, storageKey]);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = (newValue: string) => {
    const finalValue = newValue.trim() || defaultText;
    setText(finalValue);
    setIsEditing(false);
    try {
      localStorage.setItem(storageKey, finalValue);
    } catch (err) {
      console.error('Error saving custom text:', err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave((e.target as HTMLInputElement).value);
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  if (!isEditMode) {
    return (
      <Component className={className} style={style} title={title}>
        {text}
      </Component>
    );
  }

  // EDIT MODE ACTIVE
  if (isEditing) {
    if (multiline) {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          defaultValue={text}
          onBlur={(e) => handleSave(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || defaultText}
          className={`bg-amber-50/95 text-slate-900 border-2 border-amber-400 rounded px-1.5 py-0.5 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-lg text-inherit font-inherit resize-y min-w-[80px] z-50 ${className}`}
          style={style}
          onClick={(e) => e.stopPropagation()}
          rows={2}
        />
      );
    }

    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        defaultValue={text}
        onBlur={(e) => handleSave(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || defaultText}
        className={`bg-amber-50/95 text-slate-900 border-2 border-amber-400 rounded px-1.5 py-0.5 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-lg text-inherit font-inherit min-w-[60px] z-50 ${className}`}
        style={style}
        onClick={(e) => e.stopPropagation()}
      />
    );
  }

  return (
    <Component
      ref={contentRef as any}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        setIsEditing(true);
      }}
      className={`group/editable cursor-text relative transition-all rounded px-0.5 outline-dashed outline-1 outline-amber-400/50 hover:outline-amber-400 hover:bg-amber-400/20 active:bg-amber-400/30 ${className}`}
      style={style}
      title={title || 'Clique para editar este texto'}
    >
      <span>{text}</span>
      <span className="inline-block ml-1 opacity-0 group-hover/editable:opacity-100 transition-opacity text-amber-500 align-middle">
        <Edit3 className="w-2.5 h-2.5 inline" />
      </span>
    </Component>
  );
};
