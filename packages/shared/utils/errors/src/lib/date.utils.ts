export function convertToTimeZone(dateInput: Date | string, timeZone: string) {
  return new Date(new Date(dateInput).toLocaleString('en-US', { timeZone }));
}

export function calculateTimeDifference(diffInMs: number): string {
  const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
