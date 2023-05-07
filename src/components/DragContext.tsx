import React, { createContext, useState } from "react";
import User from "../User";

type DragContextType = {
  isDraggingIndex: number | null;
  setIsDraggingIndex: (index: number | null) => void;
  onDragStart: (item: User) => void;
  onDragEnd: () => void;
};

const defaultContext: DragContextType = {
  isDraggingIndex: null,
  setIsDraggingIndex: () => {},
  onDragStart: () => {},
  onDragEnd: () => {},
};

export const DragContext = createContext<DragContextType>(defaultContext);

type DragContextProviderProps = {
  items: User[];
  children: React.ReactNode;
};

const DragContextProvider: React.FC<DragContextProviderProps> = ({ items, children }) => {
  const [isDraggingIndex, setIsDraggingIndex] = useState<number | null>(null);

  const handleDragStart = (item: User) => {
    const index = items.findIndex((i) => i.id === item.id);
    setIsDraggingIndex(index);
  };

  const handleDragEnd = () => {
    setIsDraggingIndex(null);
  };

  const value = {
    isDraggingIndex,
    setIsDraggingIndex,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
  };

  return <DragContext.Provider value={value}>{children}</DragContext.Provider>;
};

export default DragContextProvider;
