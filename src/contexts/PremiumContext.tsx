import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface PremiumContextType {
  operationsCount: number;
  isLimitReached: boolean;
  isPremium: boolean;
  showUpgradeModal: boolean;
  setShowUpgradeModal: (show: boolean) => void;
  canPerformOperation: () => boolean;
  recordOperation: () => void;
  resetOperationsCount: () => void;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

export const usePremium = () => {
  const context = useContext(PremiumContext);
  if (context === undefined) {
    throw new Error('usePremium must be used within a PremiumProvider');
  }
  return context;
};

export const PremiumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [operationsCount, setOperationsCount] = useState(0);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  
  // Emails dos donos que têm acesso completo
  const ownerEmails = ["gabriellucas.s2209@gmail.com", "fabiohenrique.m67@gmail.com"];
  const isPremium = user?.email && ownerEmails.includes(user.email);
  const isLimitReached = !isPremium && operationsCount >= 4;

  // Load operations count from localStorage on mount
  useEffect(() => {
    if (user?.email) {
      const saved = localStorage.getItem(`operations-count-${user.email}`);
      if (saved) {
        setOperationsCount(parseInt(saved, 10));
      }
    }
  }, [user?.email]);

  // Save to localStorage whenever count changes
  useEffect(() => {
    if (user?.email) {
      localStorage.setItem(`operations-count-${user.email}`, operationsCount.toString());
    }
  }, [operationsCount, user?.email]);

  const canPerformOperation = () => {
    if (isPremium) return true;
    return operationsCount < 4;
  };

  const recordOperation = () => {
    if (isPremium) return;
    
    const newCount = operationsCount + 1;
    setOperationsCount(newCount);
    
    if (newCount >= 4) {
      setShowUpgradeModal(true);
    }
  };

  const resetOperationsCount = () => {
    setOperationsCount(0);
    if (user?.email) {
      localStorage.removeItem(`operations-count-${user.email}`);
    }
  };

  const value: PremiumContextType = {
    operationsCount,
    isLimitReached,
    isPremium,
    showUpgradeModal,
    setShowUpgradeModal,
    canPerformOperation,
    recordOperation,
    resetOperationsCount,
  };

  return (
    <PremiumContext.Provider value={value}>
      {children}
    </PremiumContext.Provider>
  );
};