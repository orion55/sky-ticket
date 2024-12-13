export function formatTransfer(count: number): string {
  if (count < 0) {
    throw new Error('Количество пересадок не может быть отрицательным');
  }

  if (count === 0) {
    return 'нет пересадок';
  } else if (count === 1) {
    return '1 пересадка';
  } else if (count >= 2 && count <= 4) {
    return `${count} пересадки`;
  }

  return `${count} пересадок`;
}
