export function convertToTimeZone(dateInput: Date | string, timeZone: string) {
  return new Date(new Date(dateInput).toLocaleString('en-US', { timeZone }));
}
