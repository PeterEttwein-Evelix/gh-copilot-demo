export function validateDate(dateString: string): Date {
  if (!dateString) {
    throw new Error(`Invalid date string: ${dateString}`);
  }
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date string: ${dateString}`);
  }
  // Reject overflow dates like 2023-02-29 that JS silently rolls over
  const isoMatch = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) {
    const [, y, m, d] = isoMatch.map(Number);
    if (date.getFullYear() !== y || date.getMonth() + 1 !== m || date.getDate() !== d) {
      throw new Error(`Invalid date string: ${dateString}`);
    }
  }
  return date;
}
