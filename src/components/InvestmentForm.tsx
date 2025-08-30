import { useState } from 'react';
import { Plus, TrendingUp, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useFinancial } from '@/contexts/FinancialContext';
import { usePremium } from '@/contexts/PremiumContext';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { ColorPicker } from '@/components/ui/color-picker';
import { CurrencyInput } from '@/components/ui/currency-input';
import { DatePicker } from '@/components/ui/date-picker';
import { getTodayString } from '@/utils/dateSystem';
import { cn } from '@/lib/utils';

interface InvestmentFormProps {
  defaultType?: 'stocks' | 'bonds' | 'crypto' | 'real_estate' | 'other';
}

export function InvestmentForm({ defaultType = 'stocks' }: InvestmentFormProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: '',
    type: defaultType,
    date: getTodayString(),
    color: '#3b82f6',
    isRecurring: false,
  });

  const { addInvestment } = useFinancial();
  const { canPerformOperation, setShowUpgradeModal } = usePremium();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.amount || !formData.category) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    if (!canPerformOperation()) {
      setShowUpgradeModal(true);
      return;
    }

    const investment = {
      name: formData.name,
      amount: parseFloat(formData.amount),
      category: formData.category,
      type: formData.type as any,
      date: formData.date, // Use the YYYY-MM-DD string directly
      color: formData.color,
      isRecurring: formData.isRecurring,
    };

    try {
      // Se for recorrente, adiciona para todos os meses do ano
      if (formData.isRecurring) {
        const [year, month, day] = formData.date.split('-').map(Number);
        for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
          // Create YYYY-MM-DD string for each month
          const recurringDateStr = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const recurringInvestment = {
            ...investment,
            date: recurringDateStr,
          };
          await addInvestment(recurringInvestment);
        }
      } else {
        await addInvestment(investment);
      }

      setFormData({
        name: '',
        amount: '',
        category: '',
        type: defaultType,
        date: getTodayString(),
        color: '#3b82f6',
        isRecurring: false,
      });
      setOpen(false);
    } catch (error) {
      console.error('Error adding investment:', error);
    }
  };

  const investmentTypes = [
    { value: 'stocks', label: 'Ações' },
    { value: 'bonds', label: 'Títulos' },
    { value: 'crypto', label: 'Criptomoedas' },
    { value: 'real_estate', label: 'Imóveis' },
    { value: 'other', label: 'Outros' },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="neon-button gap-2 w-full sm:w-auto"
          onClick={(e) => {
            if (!canPerformOperation()) {
              e.preventDefault();
              setShowUpgradeModal(true);
              return;
            }
          }}
        >
          <Plus className="h-4 w-4" />
          <TrendingUp className="h-4 w-4" />
          <span className="hidden sm:inline">Novo </span>Investimento
        </Button>
      </DialogTrigger>
      <DialogContent className="neon-border sm:max-w-[425px] mx-4 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 neon-text">
            <TrendingUp className="h-5 w-5 text-primary" />
            Adicionar Investimento
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Investimento</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: ITUB4, Bitcoin, Tesouro Direto..."
              className="neon-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Valor (R$)</Label>
            <CurrencyInput
              id="amount"
              value={parseFloat(formData.amount) || 0}
              onChange={(value) => setFormData({ ...formData, amount: value.toString() })}
              className="neon-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Ex: Renda Variável, Renda Fixa..."
              className="neon-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Investimento</Label>
            <Select 
              value={formData.type} 
              onValueChange={(value) => setFormData({ ...formData, type: value as any })}
            >
              <SelectTrigger className="neon-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {investmentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Data</Label>
            <DatePicker
              id="date"
              value={formData.date}
              onChange={(value) => setFormData({ ...formData, date: value })}
              className="neon-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="color">Cor do Investimento</Label>
            <ColorPicker
              value={formData.color}
              onChange={(color) => setFormData({ ...formData, color })}
              className="neon-border"
            />
          </div>

          <div className="flex items-center space-x-2 rounded-md border p-4">
            <Checkbox
              id="isRecurring"
              checked={formData.isRecurring}
              onCheckedChange={(checked) => setFormData({ ...formData, isRecurring: checked as boolean })}
            />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="isRecurring" className="font-medium">
                Recorrente
              </Label>
              <p className="text-sm text-muted-foreground">
                Adicionar este investimento todos os meses do ano
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button type="submit" className="flex-1 neon-button">
              Adicionar Investimento
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="neon-border"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}