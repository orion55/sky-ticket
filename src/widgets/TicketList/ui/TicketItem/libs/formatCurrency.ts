const LOCALE_MAP: Record<string, string> = {
  RUB: 'ru-RU',
  USD: 'en-US',
  EUR: 'de-DE',
};

export function formatCurrency(amount: number, currencyCode: string): string {
  const locale = LOCALE_MAP[currencyCode] || 'ru-RU';

  const formattedAmount = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);

  return formattedAmount.endsWith(',00') || formattedAmount.endsWith('.00')
    ? formattedAmount.slice(0, -3)
    : formattedAmount;
}
