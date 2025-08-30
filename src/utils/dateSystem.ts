/**
 * Modern Date System for Financial App
 * Handles all date operations with proper timezone support
 */

export const BRASIL_TIMEZONE = "America/Sao_Paulo";

/**
 * Type guard to check if a string is in YYYY-MM-DD format
 */
export const isValidDateString = (value: any): value is string => {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
};

/**
 * Converts any date input to YYYY-MM-DD string format
 * Handles Date objects, timestamps, ISO strings, and existing YYYY-MM-DD strings
 */
export function toDateString(input: any): string {
  if (input == null || input === "") return "";
  
  // If already in correct format, return as is
  if (isValidDateString(input)) return input;

  let date: Date;

  if (input instanceof Date) {
    date = input;
  } else if (typeof input === "number") {
    date = new Date(input);
  } else if (typeof input === "string") {
    date = new Date(input);
    if (isNaN(date.getTime())) return "";
  } else {
    return "";
  }

  // Use Intl.DateTimeFormat to get the local date in Brazil timezone
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: BRASIL_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = formatter.formatToParts(date);
  const year = parts.find(p => p.type === "year")?.value ?? "";
  const month = parts.find(p => p.type === "month")?.value ?? "";
  const day = parts.find(p => p.type === "day")?.value ?? "";
  
  return `${year}-${month}-${day}`;
}

/**
 * Converts YYYY-MM-DD string to Date object at noon local time
 * This prevents timezone issues when working with date objects
 */
export function fromDateString(dateString: string): Date | null {
  if (!isValidDateString(dateString)) return null;
  
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day, 12, 0, 0); // 12:00 local time
}

/**
 * Gets today's date in YYYY-MM-DD format
 */
export function getTodayString(): string {
  return toDateString(new Date());
}

/**
 * Formats a date string for display (DD/MM/YYYY)
 */
export function formatDateForDisplay(dateString: string): string {
  if (!isValidDateString(dateString)) return "";
  
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

/**
 * Checks if a date string is in the past
 */
export function isDateInPast(dateString: string): boolean {
  if (!isValidDateString(dateString)) return false;
  
  const today = getTodayString();
  return dateString < today;
}

/**
 * Checks if a date string is in the future
 */
export function isDateInFuture(dateString: string): boolean {
  if (!isValidDateString(dateString)) return false;
  
  const today = getTodayString();
  return dateString > today;
}

/**
 * Gets the year from a date string
 */
export function getYearFromDateString(dateString: string): number | null {
  if (!isValidDateString(dateString)) return null;
  
  const [year] = dateString.split("-").map(Number);
  return year;
}

/**
 * Gets the month from a date string (1-12)
 */
export function getMonthFromDateString(dateString: string): number | null {
  if (!isValidDateString(dateString)) return null;
  
  const [, month] = dateString.split("-").map(Number);
  return month;
}

/**
 * Gets the day from a date string
 */
export function getDayFromDateString(dateString: string): number | null {
  if (!isValidDateString(dateString)) return null;
  
  const [, , day] = dateString.split("-").map(Number);
  return day;
}

/**
 * Creates a date string from year, month, and day
 */
export function createDateString(year: number, month: number, day: number): string {
  const yearStr = year.toString();
  const monthStr = String(month).padStart(2, '0');
  const dayStr = String(day).padStart(2, '0');
  
  return `${yearStr}-${monthStr}-${dayStr}`;
}

/**
 * Gets the month key for filtering (YYYY-MM)
 */
export function getMonthKey(dateString: string): string {
  if (!isValidDateString(dateString)) return "";
  
  const [year, month] = dateString.split("-");
  return `${year}-${month}`;
}

/**
 * Gets the year key for filtering (YYYY)
 */
export function getYearKey(dateString: string): string {
  if (!isValidDateString(dateString)) return "";
  
  const [year] = dateString.split("-");
  return year;
}

/**
 * Calculates the number of days between two date strings
 */
export function daysBetween(startDate: string, endDate: string): number {
  if (!isValidDateString(startDate) || !isValidDateString(endDate)) return 0;
  
  const start = fromDateString(startDate);
  const end = fromDateString(endDate);
  
  if (!start || !end) return 0;
  
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}