export function formatDateTime(timestamp: number): string {
  const date = new Date(timestamp);
  const dayNames: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = date.getDate();
  const dayName = dayNames[date.getDay()];
  const getDaySuffix = (day: number): string => {
    if (day >= 11 && day <= 13) return 'th'; 
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  const suffix = getDaySuffix(day);
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  return `${dayName}, ${day}${suffix} ${month} ${year}`;
}


export function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes} ${period}`;
}