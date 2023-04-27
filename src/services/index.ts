export const toMinutesAndSeconds = (totalMinutes: number): string => {
  const seconds = totalMinutes % 60;
  const minutes = Math.floor(totalMinutes / 60);

  return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
};

function padTo2Digits(num: number): string {
  return num.toString().padStart(2, "0");
}
