export const formatTime = (time) => {
  const date = new Date(time * 1000);
  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();
  const second = ('0' + date.getUTCSeconds()).slice(-2);
  if (hour) {
    return `${hour}:${('0' + minute).slice(-2)}:${second}`;
  }
  return `${minute}:${second}`;
}