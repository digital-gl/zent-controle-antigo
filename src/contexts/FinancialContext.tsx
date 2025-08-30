import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePremium } from './PremiumContext';
import { useAuth } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { toDateString } from '@/utils/dateSystem';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: string;
  isRecurring?: boolean;
}

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  category: string;
  frequency: 'monthly' | 'yearly';
  nextPayment: string;
  isActive: boolean;
  color?: string;
  isRecurring?: boolean;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
}

export interface Investment {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
  type: 'stocks' | 'bonds' | 'crypto' | 'real_estate' | 'other';
  color?: string;
  isRecurring?: boolean;
}

interface FinancialContextType {
  transactions: Transaction[];
  subscriptions: Subscription[];
  goals: Goal[];
  investments: Investment[];
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
  addSubscription: (subscription: Omit<Subscription, 'id'>) => Promise<void>;
  addGoal: (goal: Omit<Goal, 'id'>) => Promise<void>;
  addInvestment: (investment: Omit<Investment, 'id'>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  deleteSubscription: (id: string) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
  deleteInvestment: (id: string) => Promise<void>;
  updateGoal: (id: string, amount: number) => Promise<void>;
  getTotalIncome: () => number;
  getTotalExpenses: () => number;
  getMonthlyIncome: (date?: Date) => number;
  getMonthlyExpenses: (date?: Date) => number;
  getYearlyIncome: (year?: number) => number;
  getYearlyExpenses: (year?: number) => number;
  getBalance: () => number;
  getMonthlyBalance: (date?: Date) => number;
  getTotalInvestments: () => number;
  getMonthlyInvestments: (date?: Date) => number;
}

const FinancialContext = createContext<FinancialContextType | undefined>(undefined);

export const useFinancial = () => {
  const context = useContext(FinancialContext);
  if (context === undefined) {
    throw new Error('useFinancial must be used within a FinancialProvider');
  }
  return context;
};

export const FinancialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(true);
  
  const { canPerformOperation, recordOperation, isLimitReached } = usePremium();
  const { user } = useAuth();

  // Load data from Supabase on mount
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    loadFinancialData();
  }, [user]);

  const loadFinancialData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Load data from Supabase
      const [transactionsRes, subscriptionsRes, goalsRes, investmentsRes] = await Promise.all([
        supabase.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('subscriptions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('goals').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('investments').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
      ]);

      if (transactionsRes.data) {
        const mappedTransactions = transactionsRes.data.map(t => ({
          id: t.id,
          type: t.type as 'income' | 'expense',
          amount: Number(t.amount),
          description: t.description,
          category: t.category,
          date: toDateString(t.date), // Normaliza dados antigos
          isRecurring: t.is_recurring
        }));
        setTransactions(mappedTransactions);
      }

      if (subscriptionsRes.data) {
        const mappedSubscriptions = subscriptionsRes.data.map(s => ({
          id: s.id,
          name: s.name,
          amount: Number(s.amount),
          category: s.category,
          frequency: s.frequency as 'monthly' | 'yearly',
          nextPayment: toDateString(s.next_payment), // Normaliza dados antigos
          isActive: s.is_active,
          color: s.color,
          isRecurring: s.is_recurring
        }));
        setSubscriptions(mappedSubscriptions);
      }

      if (goalsRes.data) {
        const mappedGoals = goalsRes.data.map(g => ({
          id: g.id,
          name: g.name,
          targetAmount: Number(g.target_amount),
          currentAmount: Number(g.current_amount),
          deadline: toDateString(g.deadline), // Normaliza dados antigos
          category: g.category
        }));
        setGoals(mappedGoals);
      }

      if (investmentsRes.data) {
        const mappedInvestments = investmentsRes.data.map(i => ({
          id: i.id,
          name: i.name,
          amount: Number(i.amount),
          category: i.category,
          date: toDateString(i.date), // Normaliza dados antigos
          type: i.type as 'stocks' | 'bonds' | 'crypto' | 'real_estate' | 'other',
          color: i.color,
          isRecurring: i.is_recurring
        }));
        setInvestments(mappedInvestments);
      }

    } catch (error) {
      console.error('Error loading financial data:', error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar seus dados financeiros.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };


  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    console.log('addTransaction called with:', transaction);
    console.log('Date value received:', transaction.date, 'Type:', typeof transaction.date);
    
    if (!canPerformOperation() || !user) {
      console.log('Cannot perform operation or user not found:', { canPerform: canPerformOperation(), user: !!user });
      return;
    }
    
    // Normalize the date to ensure it's always YYYY-MM-DD format
    const normalizedDate = toDateString(transaction.date);
    console.log('Normalized date for database:', normalizedDate);
    
    console.log('Attempting to insert transaction to database...');
    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          type: transaction.type,
          amount: transaction.amount,
          description: transaction.description,
          category: transaction.category,
          date: normalizedDate, // Use normalized date
          is_recurring: transaction.isRecurring || false
        })
        .select()
        .single();

      if (error) throw error;

      console.log('Database returned data:', data);

      const newTransaction: Transaction = {
        id: data.id,
        type: data.type as 'income' | 'expense',
        amount: Number(data.amount),
        description: data.description,
        category: data.category,
        date: toDateString(data.date), // Normalize date from database
        isRecurring: data.is_recurring
      };
      
      console.log('Final transaction object:', newTransaction);
      
      setTransactions(prev => [newTransaction, ...prev]);
      recordOperation();
      
      toast({
        title: "Transação adicionada",
        description: "Sua transação foi salva com sucesso.",
      });
    } catch (error) {
      console.error('Error adding transaction:', error);
      console.error('Transaction data that failed:', transaction);
      toast({
        title: "Erro ao adicionar transação",
        description: "Não foi possível salvar a transação. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const addSubscription = async (subscription: Omit<Subscription, 'id'>) => {
    if (!canPerformOperation() || !user) {
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .insert({
          user_id: user.id,
          name: subscription.name,
          amount: subscription.amount,
          category: subscription.category,
          frequency: subscription.frequency,
          next_payment: toDateString(subscription.nextPayment), // Normalize date
          is_active: subscription.isActive,
          color: subscription.color,
          is_recurring: subscription.isRecurring || false
        })
        .select()
        .single();

      if (error) throw error;

      const newSubscription: Subscription = {
        id: data.id,
        name: data.name,
        amount: Number(data.amount),
        category: data.category,
        frequency: data.frequency as 'monthly' | 'yearly',
        nextPayment: toDateString(data.next_payment), // Normalize date from database
        isActive: data.is_active,
        color: data.color,
        isRecurring: data.is_recurring
      };
      
      setSubscriptions(prev => [newSubscription, ...prev]);
      recordOperation();
      
      toast({
        title: "Assinatura adicionada",
        description: "Sua assinatura foi salva com sucesso.",
      });
    } catch (error) {
      console.error('Error adding subscription:', error);
      toast({
        title: "Erro ao adicionar assinatura",
        description: "Não foi possível salvar a assinatura. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const addGoal = async (goal: Omit<Goal, 'id'>) => {
    if (!canPerformOperation() || !user) {
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('goals')
        .insert({
          user_id: user.id,
          name: goal.name,
          target_amount: goal.targetAmount,
          current_amount: goal.currentAmount,
          deadline: toDateString(goal.deadline), // Normalize date
          category: goal.category
        })
        .select()
        .single();

      if (error) throw error;

      const newGoal: Goal = {
        id: data.id,
        name: data.name,
        targetAmount: Number(data.target_amount),
        currentAmount: Number(data.current_amount),
        deadline: toDateString(data.deadline), // Normalize date from database
        category: data.category
      };
      
      setGoals(prev => [newGoal, ...prev]);
      recordOperation();
      
      toast({
        title: "Meta adicionada",
        description: "Sua meta foi salva com sucesso.",
      });
    } catch (error) {
      console.error('Error adding goal:', error);
      toast({
        title: "Erro ao adicionar meta",
        description: "Não foi possível salvar a meta. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const addInvestment = async (investment: Omit<Investment, 'id'>) => {
    if (!canPerformOperation() || !user) {
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('investments')
        .insert({
          user_id: user.id,
          name: investment.name,
          amount: investment.amount,
          category: investment.category,
          date: toDateString(investment.date), // Normalize date
          type: investment.type,
          color: investment.color,
          is_recurring: investment.isRecurring || false
        })
        .select()
        .single();

      if (error) throw error;

      const newInvestment: Investment = {
        id: data.id,
        name: data.name,
        amount: Number(data.amount),
        category: data.category,
        date: toDateString(data.date), // Normalize date from database
        type: data.type as 'stocks' | 'bonds' | 'crypto' | 'real_estate' | 'other',
        color: data.color,
        isRecurring: data.is_recurring
      };
      
      setInvestments(prev => [newInvestment, ...prev]);
      recordOperation();
      
      toast({
        title: "Investimento adicionado",
        description: "Seu investimento foi salvo com sucesso.",
      });
    } catch (error) {
      console.error('Error adding investment:', error);
      toast({
        title: "Erro ao adicionar investimento",
        description: "Não foi possível salvar o investimento. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const deleteTransaction = async (id: string) => {
    if (isLimitReached || !user) {
      return;
    }
    
    try {
      const transactionToDelete = transactions.find(t => t.id === id);
      
      if (!transactionToDelete) {
        throw new Error('Transação não encontrada');
      }
      
      // If it's a recurring transaction, delete all related recurring transactions
      if (transactionToDelete.isRecurring) {
        const { error: recurringError } = await supabase
          .from('transactions')
          .delete()
          .eq('description', transactionToDelete.description)
          .eq('amount', transactionToDelete.amount)
          .eq('category', transactionToDelete.category)
          .eq('type', transactionToDelete.type)
          .eq('is_recurring', true)
          .eq('user_id', user.id);

        if (recurringError) throw recurringError;

        // Update local state to remove all matching recurring transactions
        setTransactions(prev => prev.filter(t => 
          !(t.isRecurring && 
            t.description === transactionToDelete.description &&
            t.amount === transactionToDelete.amount &&
            t.category === transactionToDelete.category &&
            t.type === transactionToDelete.type)
        ));
      } else {
        // Delete single transaction by ID only
        const { error } = await supabase
          .from('transactions')
          .delete()
          .eq('id', id)
          .eq('user_id', user.id);

        if (error) throw error;

        // Update local state to remove only this specific transaction
        setTransactions(prev => prev.filter(t => t.id !== id));
      }
      
      toast({
        title: "Transação excluída",
        description: transactionToDelete.isRecurring 
          ? "Todas as transações recorrentes foram removidas com sucesso."
          : "A transação foi removida com sucesso.",
      });
    } catch (error) {
      console.error('Error deleting transaction:', error);
      toast({
        title: "Erro ao excluir transação",
        description: "Não foi possível remover a transação. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const deleteSubscription = async (id: string) => {
    if (isLimitReached || !user) {
      return;
    }
    
    try {
      const subscriptionToDelete = subscriptions.find(s => s.id === id);
      
      if (!subscriptionToDelete) {
        throw new Error('Assinatura não encontrada');
      }
      
      // If it's a recurring subscription, also delete related transactions
      if (subscriptionToDelete.isRecurring) {
        const { error: transactionsError } = await supabase
          .from('transactions')
          .delete()
          .eq('description', subscriptionToDelete.name)
          .eq('amount', subscriptionToDelete.amount)
          .eq('category', subscriptionToDelete.category)
          .eq('type', 'expense')
          .eq('is_recurring', true)
          .eq('user_id', user.id);

        if (transactionsError) console.warn('Error deleting related transactions:', transactionsError);

        // Update local transactions state
        setTransactions(prev => prev.filter(t => 
          !(t.isRecurring && 
            t.description === subscriptionToDelete.name &&
            t.amount === subscriptionToDelete.amount &&
            t.category === subscriptionToDelete.category &&
            t.type === 'expense')
        ));
      }

      // Delete the subscription
      const { error } = await supabase
        .from('subscriptions')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setSubscriptions(prev => prev.filter(s => s.id !== id));
      
      toast({
        title: "Assinatura excluída",
        description: subscriptionToDelete.isRecurring 
          ? "A assinatura e suas transações recorrentes foram removidas com sucesso."
          : "A assinatura foi removida com sucesso.",
      });
    } catch (error) {
      console.error('Error deleting subscription:', error);
      toast({
        title: "Erro ao excluir assinatura",
        description: "Não foi possível remover a assinatura. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const deleteGoal = async (id: string) => {
    if (isLimitReached || !user) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('goals')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setGoals(prev => prev.filter(g => g.id !== id));
      
      toast({
        title: "Meta excluída",
        description: "A meta foi removida com sucesso.",
      });
    } catch (error) {
      console.error('Error deleting goal:', error);
      toast({
        title: "Erro ao excluir meta",
        description: "Não foi possível remover a meta. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const deleteInvestment = async (id: string) => {
    if (isLimitReached || !user) {
      return;
    }
    
    try {
      const investmentToDelete = investments.find(i => i.id === id);
      
      if (!investmentToDelete) {
        throw new Error('Investimento não encontrado');
      }
      
      // If it's a recurring investment, also delete related transactions
      if (investmentToDelete.isRecurring) {
        const { error: transactionsError } = await supabase
          .from('transactions')
          .delete()
          .eq('description', investmentToDelete.name)
          .eq('amount', investmentToDelete.amount)
          .eq('category', investmentToDelete.category)
          .eq('type', 'expense')
          .eq('is_recurring', true)
          .eq('user_id', user.id);

        if (transactionsError) console.warn('Error deleting related transactions:', transactionsError);

        // Update local transactions state
        setTransactions(prev => prev.filter(t => 
          !(t.isRecurring && 
            t.description === investmentToDelete.name &&
            t.amount === investmentToDelete.amount &&
            t.category === investmentToDelete.category &&
            t.type === 'expense')
        ));
      }

      // Delete the investment
      const { error } = await supabase
        .from('investments')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setInvestments(prev => prev.filter(i => i.id !== id));
      
      toast({
        title: "Investimento excluído",
        description: investmentToDelete.isRecurring 
          ? "O investimento e suas transações recorrentes foram removidas com sucesso."
          : "O investimento foi removido com sucesso.",
      });
    } catch (error) {
      console.error('Error deleting investment:', error);
      toast({
        title: "Erro ao excluir investimento",
        description: "Não foi possível remover o investimento. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const updateGoal = async (id: string, amount: number) => {
    if (!user) return;
    
    try {
      const goal = goals.find(g => g.id === id);
      if (!goal) return;
      
      const newCurrentAmount = Math.min(goal.targetAmount, goal.currentAmount + amount);
      
      const { error } = await supabase
        .from('goals')
        .update({ current_amount: newCurrentAmount })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setGoals(prev =>
        prev.map(goal =>
          goal.id === id
            ? { ...goal, currentAmount: newCurrentAmount }
            : goal
        )
      );
      
      toast({
        title: "Meta atualizada",
        description: "O progresso da meta foi atualizado com sucesso.",
      });
    } catch (error) {
      console.error('Error updating goal:', error);
      toast({
        title: "Erro ao atualizar meta",
        description: "Não foi possível atualizar o progresso da meta. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const getTotalIncome = () => {
    return transactions
      .filter(t => t.type === 'income')
      .reduce((total, t) => total + t.amount, 0);
  };

  const getTotalExpenses = () => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((total, t) => total + t.amount, 0);
  };

  const getMonthKey = (date: Date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
  };

  const getMonthlyIncome = (date?: Date) => {
    const targetDate = date || selectedDate;
    const monthKey = getMonthKey(targetDate);
    return transactions
      .filter(t => t.type === 'income' && t.date.startsWith(monthKey))
      .reduce((total, t) => total + t.amount, 0);
  };

  const getMonthlyExpenses = (date?: Date) => {
    const targetDate = date || selectedDate;
    const monthKey = getMonthKey(targetDate);
    return transactions
      .filter(t => t.type === 'expense' && t.date.startsWith(monthKey))
      .reduce((total, t) => total + t.amount, 0);
  };

  const getYearlyIncome = (year?: number) => {
    const targetYear = year || selectedDate.getFullYear();
    return transactions
      .filter(t => t.type === 'income' && t.date.startsWith(targetYear.toString()))
      .reduce((total, t) => total + t.amount, 0);
  };

  const getYearlyExpenses = (year?: number) => {
    const targetYear = year || selectedDate.getFullYear();
    return transactions
      .filter(t => t.type === 'expense' && t.date.startsWith(targetYear.toString()))
      .reduce((total, t) => total + t.amount, 0);
  };

  const getMonthlyBalance = (date?: Date) => {
    return getMonthlyIncome(date) - getMonthlyExpenses(date);
  };

  const getBalance = () => {
    return getTotalIncome() - getTotalExpenses();
  };

  const getTotalInvestments = () => {
    return investments.reduce((total, i) => total + i.amount, 0);
  };

  const getMonthlyInvestments = (date?: Date) => {
    const targetDate = date || selectedDate;
    const monthKey = getMonthKey(targetDate);
    return investments
      .filter(i => i.date.startsWith(monthKey))
      .reduce((total, i) => total + i.amount, 0);
  };

  const value: FinancialContextType = {
    transactions,
    subscriptions,
    goals,
    investments,
    selectedDate,
    setSelectedDate,
    addTransaction,
    addSubscription,
    addGoal,
    addInvestment,
    deleteTransaction,
    deleteSubscription,
    deleteGoal,
    deleteInvestment,
    updateGoal,
    getTotalIncome,
    getTotalExpenses,
    getMonthlyIncome,
    getMonthlyExpenses,
    getYearlyIncome,
    getYearlyExpenses,
    getBalance,
    getMonthlyBalance,
    getTotalInvestments,
    getMonthlyInvestments,
  };

  return (
    <FinancialContext.Provider value={value}>
      {children}
    </FinancialContext.Provider>
  );
};