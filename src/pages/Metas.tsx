import { useState } from 'react';
import { Plus, Target, Calendar, Trash2, DollarSign } from 'lucide-react';
import { format, parseISO } from 'date-fns';
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
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import { useFinancial } from '@/contexts/FinancialContext';
import { usePremium } from '@/contexts/PremiumContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { CurrencyInput } from '@/components/ui/currency-input';
import { DatePicker } from '@/components/ui/date-picker';
import { getTodayString } from '@/utils/dateSystem';

const formSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  targetAmount: z.number().min(0.01, 'Valor deve ser maior que 0'),
  currentAmount: z.number().min(0, 'Valor atual não pode ser negativo').default(0),
  category: z.string().min(1, 'Categoria é obrigatória'),
  deadline: z.string().min(1, 'Data é obrigatória'),
});

const goalCategories = [
  'Reserva de Emergência',
  'Viagem',
  'Casa Própria',
  'Carro',
  'Educação',
  'Aposentadoria',
  'Investimentos',
  'Outros'
];

export default function Metas() {
  const { goals, addGoal, deleteGoal, updateGoal } = useFinancial();
  const { canPerformOperation, setShowUpgradeModal } = usePremium();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [contributionOpen, setContributionOpen] = useState<string | null>(null);
  const [contributionAmount, setContributionAmount] = useState<number | undefined>(undefined);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      targetAmount: undefined,
      currentAmount: undefined,
      category: '',
      deadline: getTodayString(),
    },
  });

  const totalGoals = goals.length;
  const completedGoals = goals.filter(g => g.currentAmount >= g.targetAmount).length;
  const totalTargetAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalCurrentAmount = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const goal = {
      name: values.name,
      targetAmount: values.targetAmount,
      currentAmount: values.currentAmount,
      category: values.category,
      deadline: values.deadline, // Use the YYYY-MM-DD string directly
    };

    addGoal(goal);

    toast({
      title: 'Meta adicionada!',
      description: `A meta "${values.name}" foi criada com sucesso.`,
    });

    form.reset();
    setOpen(false);
  }

  const handleDelete = (id: string, name: string) => {
    deleteGoal(id);
    toast({
      title: 'Meta removida',
      description: `A meta "${name}" foi removida com sucesso.`,
      variant: 'destructive'
    });
  };

  const handleContribution = (goalId: string, goalName: string) => {
    if (contributionAmount && contributionAmount > 0) {
      updateGoal(goalId, contributionAmount);
      toast({
        title: 'Contribuição adicionada!',
        description: `R$ ${contributionAmount.toFixed(2)} foi adicionado à meta "${goalName}".`,
      });
      setContributionAmount(undefined);
      setContributionOpen(null);
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return 'bg-income';
    if (progress >= 75) return 'bg-primary';
    if (progress >= 50) return 'bg-accent';
    return 'bg-muted-foreground';
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-foreground neon-text-success">Metas</h1>
            <p className="text-sm sm:text-base text-muted-foreground neon-text-accent">Defina e acompanhe suas metas financeiras</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button 
                className="gap-2 w-full sm:w-auto"
                onClick={(e) => {
                  if (!canPerformOperation()) {
                    e.preventDefault();
                    setShowUpgradeModal(true);
                    return;
                  }
                }}
              >
                <Plus className="h-4 w-4" />
                Nova Meta
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] mx-4 max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Nova Meta</DialogTitle>
                <DialogDescription>
                  Crie uma nova meta financeira para alcançar seus objetivos.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome da Meta</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Reserva de emergência, Viagem..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="targetAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor da Meta (R$)</FormLabel>
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
                    name="currentAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor Atual (R$)</FormLabel>
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
                            {goalCategories.map((category) => (
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
                    name="deadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data Limite</FormLabel>
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

                  <DialogFooter>
                    <Button type="submit" className="w-full">
                      Criar Meta
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          title="Total de Metas"
          value={totalGoals.toString()}
          icon={Target}
          variant="default"
        />
        <StatCard
          title="Metas Concluídas"
          value={completedGoals.toString()}
          icon={Target}
          variant="income"
        />
        <StatCard
          title="Valor Total das Metas"
          value={`R$ ${totalTargetAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          icon={DollarSign}
          variant="balance"
        />
        <StatCard
          title="Valor Poupado"
          value={`R$ ${totalCurrentAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          icon={DollarSign}
          variant="income"
        />
      </div>

      {/* Goals List */}
      <Card>
        <CardHeader>
          <CardTitle>Suas Metas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {goals.length > 0 ? (
              goals.map((goal) => {
                const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
                const isCompleted = goal.currentAmount >= goal.targetAmount;
                const remainingAmount = Math.max(goal.targetAmount - goal.currentAmount, 0);

                return (
                  <div
                    key={goal.id}
                    className={cn(
                      "p-6 rounded-lg border transition-colors",
                      isCompleted 
                        ? "border-income bg-income/5" 
                        : "border-border hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={cn(
                            "p-2 rounded-lg",
                            isCompleted ? "bg-income text-income-foreground" : "bg-primary/10 text-primary"
                          )}>
                            <Target className="h-4 w-4" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{goal.name}</h3>
                            <p className="text-sm text-muted-foreground">{goal.category}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span>Progresso: {progress.toFixed(1)}%</span>
                            <span>
                              R$ {goal.currentAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} / 
                              R$ {goal.targetAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                          
                          <Progress value={progress} className="h-2" />
                          
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>
                              Prazo: {format(parseISO(goal.deadline), 'dd/MM/yyyy', { locale: ptBR })}
                            </span>
                            {!isCompleted && (
                              <span>Faltam: R$ {remainingAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        {!isCompleted && (
                          <Dialog 
                            open={contributionOpen === goal.id} 
                            onOpenChange={(open) => setContributionOpen(open ? goal.id : null)}
                          >
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" className="gap-2">
                                <Plus className="h-4 w-4" />
                                Contribuir
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Adicionar Contribuição</DialogTitle>
                                <DialogDescription>
                                  Adicione dinheiro à sua meta "{goal.name}".
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm font-medium">Valor da Contribuição (R$)</label>
                                  <CurrencyInput
                                    value={contributionAmount}
                                    onChange={setContributionAmount}
                                    className="mt-1"
                                  />
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  <p>Meta atual: R$ {goal.currentAmount.toFixed(2)}</p>
                                  <p>Meta final: R$ {goal.targetAmount.toFixed(2)}</p>
                                  <p>Restante: R$ {remainingAmount.toFixed(2)}</p>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button 
                                  onClick={() => handleContribution(goal.id, goal.name)}
                                  disabled={!contributionAmount || contributionAmount <= 0}
                                  className="w-full"
                                >
                                  Adicionar {contributionAmount ? `R$ ${contributionAmount.toFixed(2)}` : 'Contribuição'}
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        )}
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(goal.id, goal.name)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhuma meta definida</h3>
                <p className="text-muted-foreground mb-4">
                  Crie sua primeira meta financeira e comece a trabalhar em direção aos seus objetivos.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="gap-2"
                      onClick={(e) => {
                        if (!canPerformOperation()) {
                          e.preventDefault();
                          setShowUpgradeModal(true);
                          return;
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                      Criar Primeira Meta
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Nova Meta</DialogTitle>
                      <DialogDescription>
                        Crie uma nova meta financeira para alcançar seus objetivos.
                      </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Same form as above */}
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