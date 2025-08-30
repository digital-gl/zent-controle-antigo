import { useState } from 'react';
import { Plus, CreditCard, Calendar, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { format, addMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFinancial } from '@/contexts/FinancialContext';
import { usePremium } from '@/contexts/PremiumContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ColorPicker } from '@/components/ui/color-picker';
import { Checkbox } from '@/components/ui/checkbox';
import { MonthSelector } from '@/components/MonthSelector';
import { CurrencyInput } from '@/components/ui/currency-input';
import { getTodayString, toDateString } from '@/utils/dateSystem';

const formSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  amount: z.number().min(0.01, 'Valor deve ser maior que 0'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  frequency: z.enum(['monthly', 'yearly']),
  color: z.string().optional(),
  isRecurring: z.boolean().optional(),
});

const subscriptionCategories = [
  'Streaming',
  'Software',
  'Saúde',
  'Academia',
  'Educação',
  'Transporte',
  'Seguros',
  'Outros'
];

export default function Assinaturas() {
  const { subscriptions, addSubscription, deleteSubscription, selectedDate, setSelectedDate } = useFinancial();
  const { canPerformOperation, setShowUpgradeModal } = usePremium();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      amount: 0,
      category: '',
      frequency: 'monthly',
      color: '#3b82f6',
      isRecurring: false,
    },
  });

  // Filtrar assinaturas pelo mês selecionado
  const getMonthKey = (date: Date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
  };

  const currentMonthKey = getMonthKey(selectedDate);
  const filteredSubscriptions = subscriptions.filter(sub => {
    if (!sub.isRecurring) return true;
    return sub.nextPayment.startsWith(currentMonthKey);
  });

  const activeSubscriptions = filteredSubscriptions.filter(s => s.isActive);
  const inactiveSubscriptions = filteredSubscriptions.filter(s => !s.isActive);

  const totalMonthlyAmount = activeSubscriptions
    .reduce((total, sub) => total + (sub.frequency === 'monthly' ? sub.amount : sub.amount / 12), 0);

  const totalYearlyAmount = totalMonthlyAmount * 12;

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Use toDateString para próximo pagamento
    const nextMonth = addMonths(new Date(), 1);
    const nextPayment = toDateString(nextMonth);
    
    const subscription = {
      name: values.name,
      amount: values.amount,
      category: values.category,
      frequency: values.frequency,
      nextPayment,
      isActive: true,
      color: values.color,
      isRecurring: values.isRecurring,
    };

    // Se for recorrente, adiciona para todos os meses do ano
    if (values.isRecurring) {
      for (let month = 0; month < 12; month++) {
        const recurringDate = new Date();
        recurringDate.setMonth(month);
        const nextRecurringPayment = addMonths(recurringDate, 1);
        const recurringSubscription = {
          ...subscription,
          nextPayment: toDateString(nextRecurringPayment),
        };
        addSubscription(recurringSubscription);
      }
    } else {
      addSubscription(subscription);
    }

    toast({
      title: 'Assinatura adicionada!',
      description: `${values.name} foi adicionado às suas assinaturas.`,
    });

    form.reset();
    setOpen(false);
  }

  const handleDelete = (id: string, name: string) => {
    deleteSubscription(id);
    toast({
      title: 'Assinatura removida',
      description: `${name} foi removido das suas assinaturas.`,
      variant: 'destructive'
    });
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-foreground neon-text-accent">Assinaturas</h1>
            <p className="text-sm sm:text-base text-muted-foreground neon-text">Gerencie seus gastos recorrentes e assinaturas</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <MonthSelector currentDate={selectedDate} onDateChange={setSelectedDate} />
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto"
                  onClick={(e) => {
                    if (!canPerformOperation()) {
                      e.preventDefault();
                      setShowUpgradeModal(true);
                      return;
                    }
                  }}
                >
                  <Plus className="h-4 w-4" />
                  Nova Assinatura
                </Button>
              </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] mx-4 max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Nova Assinatura</DialogTitle>
                <DialogDescription>
                  Adicione uma nova assinatura ou gasto recorrente.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome da Assinatura</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Netflix, Spotify, Academia..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor (R$)</FormLabel>
                        <FormControl>
                          <CurrencyInput
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="frequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Frequência</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="monthly">Mensal</SelectItem>
                            <SelectItem value="yearly">Anual</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categoria</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma categoria" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {subscriptionCategories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cor</FormLabel>
                        <FormControl>
                          <ColorPicker
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isRecurring"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Recorrente
                          </FormLabel>
                          <p className="text-sm text-muted-foreground">
                            Adicionar esta assinatura todos os meses do ano
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button type="submit" className="w-full">
                      Adicionar Assinatura
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <StatCard
          title="Gasto Mensal Total"
          value={`R$ ${totalMonthlyAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          icon={CreditCard}
          variant="expense"
        />
        <StatCard
          title="Gasto Anual Estimado"
          value={`R$ ${totalYearlyAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          icon={Calendar}
          variant="expense"
        />
        <StatCard
          title="Assinaturas Ativas"
          value={activeSubscriptions.length.toString()}
          icon={CreditCard}
          variant="default"
        />
      </div>

      {/* Active Subscriptions */}
      <Card>
        <CardHeader>
          <CardTitle>Assinaturas Ativas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeSubscriptions.length > 0 ? (
              activeSubscriptions.map((subscription) => (
                <div
                  key={subscription.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3 sm:gap-4 flex-1">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0"
                      style={{ backgroundColor: subscription.color || '#3b82f6' }}
                    >
                      {subscription.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium truncate">{subscription.name}</h4>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-muted-foreground">
                        <span className="truncate">{subscription.category}</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="truncate">{subscription.frequency === 'monthly' ? 'Mensal' : 'Anual'}</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="truncate">Próximo: {format(new Date(subscription.nextPayment), 'dd/MM/yyyy', { locale: ptBR })}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                    <div className="text-left sm:text-right">
                      <p className="font-medium text-accent">
                        R$ {subscription.amount.toFixed(2)}/{subscription.frequency === 'monthly' ? 'mês' : 'ano'}
                      </p>
                      {subscription.frequency === 'yearly' && (
                        <p className="text-sm text-muted-foreground">
                          R$ {(subscription.amount / 12).toFixed(2)}/mês
                        </p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(subscription.id, subscription.name)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhuma assinatura ativa</h3>
                <p className="text-muted-foreground mb-4">
                  Adicione suas assinaturas para ter um controle completo dos seus gastos recorrentes.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
                      onClick={(e) => {
                        if (!canPerformOperation()) {
                          e.preventDefault();
                          setShowUpgradeModal(true);
                          return;
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                      Adicionar Primeira Assinatura
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Nova Assinatura</DialogTitle>
                      <DialogDescription>
                        Adicione uma nova assinatura ou gasto recorrente.
                      </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Form content same as above */}
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}