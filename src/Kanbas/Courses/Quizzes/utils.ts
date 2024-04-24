export function formatDate(dateString: string) {
    // Handle invalid or missing date string
    if (!dateString) {
      return 'Invalid date';
    }
    const date = new Date(dateString);
    // Handle invalid dates
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
  
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const day = date.getDate();
  
    const hour = date.getHours();
    const minute = date.getMinutes().toString().padStart(2, '0'); // Pad minutes with 0
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12; // Convert 24-hour format to 12-hour, with '0' becoming '12'
  
    return `${month} ${day} at ${formattedHour}:${minute} ${ampm}`;
  }
  