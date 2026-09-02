import React, { createContext, useContext, useState, useEffect } from 'react';

interface EditModeContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  setEditMode: (enabled: boolean) => void;
}

const EditModeContext = createContext<EditModeContextType>({
  isEditMode: true,
  toggleEditMode: () => {},
  setEditMode: () => {},
});

export const EditModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('app_edit_mode_enabled');
    if (saved !== null) {
      return saved === 'true';
    }
    return true; // Default to true (editing enabled)
  });

  useEffect(() => {
    localStorage.setItem('app_edit_mode_enabled', String(isEditMode));
  }, [isEditMode]);

  const toggleEditMode = () => {
    setIsEditMode(prev => !prev);
  };

  const setEditMode = (enabled: boolean) => {
    setIsEditMode(enabled);
  };

  return (
    <EditModeContext.Provider value={{ isEditMode, toggleEditMode, setEditMode }}>
      {children}
    </EditModeContext.Provider>
  );
};

export const useEditMode = () => useContext(EditModeContext);
