import React, { forwardRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value?: number | string;
  onChange?: (value: number) => void;
}

const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ className, onChange, value, ...props }, ref) => {
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    // Converte valor numérico para string de entrada
    React.useEffect(() => {
      if (!isFocused && value !== undefined && value !== null && value !== '') {
        setInputValue(value.toString());
      }
    }, [value, isFocused]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const entrada = e.target.value.replace(',', '.'); // troca vírgula por ponto
      
      // Permite apenas números e um ponto decimal
      if (/^\d*\.?\d*$/.test(entrada)) {
        setInputValue(entrada);
        // Converte para número e chama onChange
        const numericValue = entrada === '' ? 0 : parseFloat(entrada) || 0;
        onChange?.(numericValue);
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      // Ao focar, mostra o valor numérico sem formatação
      if (value !== undefined && value !== null && value !== '') {
        setInputValue(value.toString());
      }
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    // Durante o foco, mostra o valor sem formatação
    // Fora do foco, pode mostrar formatado se necessário
    const displayValue = isFocused ? inputValue : inputValue;

    return (
      <Input
        {...props}
        ref={ref}
        type="text"
        inputMode="decimal"
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Digite o valor"
        className={cn(className)}
      />
    );
  }
);

CurrencyInput.displayName = 'CurrencyInput';

export { CurrencyInput };