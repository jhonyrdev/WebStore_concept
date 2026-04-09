export type SupportedCurrency = 'PEN' | 'USD' | 'EUR';

const CURRENCY_SYMBOL_MAP: Record<SupportedCurrency, string> = {
  PEN: 'S/',
  USD: '$',
  EUR: '€'
};

export interface CurrencyFormatOptions {
  currency?: SupportedCurrency;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export function getCurrencySymbol(currency: SupportedCurrency = 'PEN'): string {
  return CURRENCY_SYMBOL_MAP[currency];
}

export function formatCurrencyAmount(
  amount: number | null | undefined,
  options: CurrencyFormatOptions = {}
): string {
  const {
    currency = 'PEN',
    locale = 'es-PE',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2
  } = options;

  const safeAmount = Number.isFinite(amount) ? Number(amount) : 0;
  const symbol = getCurrencySymbol(currency);
  const formattedAmount = new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits
  }).format(safeAmount);

  return `${symbol} ${formattedAmount}`;
}