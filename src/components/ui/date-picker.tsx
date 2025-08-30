import * as React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toDateString, fromDateString, isValidDateString } from "@/utils/dateSystem";

export interface DatePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ value, onChange, placeholder = "Selecione uma data", disabled, className, id, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    
    // Convert string value to Date object for the calendar
    const dateValue = React.useMemo(() => {
      if (!value || !isValidDateString(value)) return undefined;
      return fromDateString(value);
    }, [value]);

    const handleSelect = (selectedDate: Date | undefined) => {
      if (selectedDate && onChange) {
        const dateString = toDateString(selectedDate);
        onChange(dateString);
      }
      setOpen(false);
    };

    const displayValue = React.useMemo(() => {
      if (!dateValue) return placeholder;
      return format(dateValue, "dd/MM/yyyy", { locale: ptBR });
    }, [dateValue, placeholder]);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            id={id}
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !dateValue && "text-muted-foreground",
              className
            )}
            disabled={disabled}
            {...props}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {displayValue}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={dateValue}
            onSelect={handleSelect}
            initialFocus
            className="p-3 pointer-events-auto"
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    );
  }
);

DatePicker.displayName = "DatePicker";

export { DatePicker as default };