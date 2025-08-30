import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CalendarIcon, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useFinancial } from '@/contexts/FinancialContext';
import { usePremium } from '@/contexts/PremiumContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { CurrencyInput } from '@/components/ui/currency-input';
import { DatePicker } from '@/components/ui/date-picker';
import { getTodayString } from '@/utils/dateSystem';

const formSchema = z.object({
  type: z.enum(['income', 'expense']),
  description: z.string().min(1, 'Descrição é obrigatória'),
  amount: z.number().min(0.01, 'Valor deve ser maior que 0'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  date: z.string().min(1, 'Data é obrigatória'),
  isRecurring: z.boolean().optional(),
});

const incomeCategories = [
  'Salário',
  'Freelance',
  'Investimentos',
  'Dividendos',
  'Vendas',
  'Outros'
];

const expenseCategories = [
  'Alimentação',
  'Transporte',
  'Moradia',
  'Saúde',
  'Educação',
  'Entretenimento',
  'Roupas',
  'Viagem',
  'Outros'
];

interface TransactionFormProps {
  defaultType?: 'income' | 'expense';
}

export function TransactionForm({ defaultType = 'expense' }: TransactionFormProps) {
  const [open, setOpen] = useState(false);
  const { addTransaction } = useFinancial();
  const { canPerformOperation, setShowUpgradeModal } = usePremium();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: defaultType,
      description: '',
      amount: undefined,
      category: '',
      date: getTodayString(),
      isRecurring: false,
    },
  });

  const watchType = form.watch('type');
  const categories = watchType === 'income' ? incomeCategories : expenseCategories;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!canPerformOperation()) {
      setShowUpgradeModal(true);
      return;
    }

    const transaction = {
      type: values.type,
      description: values.description,
      amount: values.amount,
      category: values.category,
      date: values.date, // Use the YYYY-MM-DD string directly
      isRecurring: values.isRecurring,
    };

    try {
      // Se for recorrente, adiciona para todos os meses do ano
      if (values.isRecurring) {
        const [year, month, day] = values.date.split('-').map(Number);
        for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
          // Create YYYY-MM-DD string for each month
          const recurringDateStr = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const recurringTransaction = {
            ...transaction,
            date: recurringDateStr,
          };
          await addTransaction(recurringTransaction);
        }
      } else {
        await addTransaction(transaction);
      }

      form.reset({
        type: defaultType,
        description: '',
        amount: undefined,
        category: '',
        date: getTodayString(),
        isRecurring: false,
      });
      setOpen(false);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className={cn(
            'gap-2 neon-button w-full sm:w-auto',
            defaultType === 'income' 
              ? 'neon-glow-success' 
              : 'neon-glow-danger'
          )}
          onClick={(e) => {
            if (!canPerformOperation()) {
              e.preventDefault();
              setShowUpgradeModal(true);
              return;
            }
          }}
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Adicionar </span>
          {defaultType === 'income' ? 'Receita' : 'Gasto'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] neon-border mx-4 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="neon-text">Nova Transação</DialogTitle>
          <DialogDescription className="neon-text-accent">
            Adicione uma nova {defaultType === 'income' ? 'receita' : 'despesa'} ao seu controle financeiro.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="income">Receita</SelectItem>
                      <SelectItem value="expense">Gasto</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Salário, Almoço, etc." {...field} />
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
                      {categories.map((category) => (
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
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <DatePicker
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
                      Adicionar esta transação todos os meses do ano
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" className="w-full neon-button">
                Adicionar Transação
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}