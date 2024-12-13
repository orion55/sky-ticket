import { parse, format } from 'date-fns';
import { ru } from 'date-fns/locale';

export function formatDate(dateString: string): string {
  try {
    const date = parse(dateString, 'dd.MM.yy', new Date());

    let formattedDate = format(date, "d MMMM yyyy', 'EEEEEE", { locale: ru });

    formattedDate = formattedDate.replace(
      /,\s([а-я])/,
      (_match, letter) => `, ${letter.toUpperCase()}`,
    );

    return formattedDate;
  } catch (error) {
    console.error('Ошибка при форматировании даты:', error);
    return 'Неверный формат даты';
  }
}
