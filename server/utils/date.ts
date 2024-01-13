export function human(seconds: number | Date) {
  if (seconds instanceof Date)
    seconds = Math.round((Number(Date.now()) - seconds.getTime()) / 1000);
  const suffix = seconds < 0 ? 'from now' : 'ago';
  seconds = Math.abs(seconds);

  const times = [
    seconds / 60 / 60 / 24 / 365, // years
    seconds / 60 / 60 / 24 / 30, // months
    seconds / 60 / 60 / 24 / 7, // weeks
    seconds / 60 / 60 / 24, // days
    seconds / 60 / 60, // hours
    seconds / 60, // minutes
    seconds, // seconds
  ];
  const names = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second'];

  for (let i = 0; i < names.length; i++) {
    const time = Math.floor(times[i]);
    let name = names[i];
    if (time > 1)
      name += 's';

    if (time >= 1)
      return `${time} ${name} ${suffix}`;
  }
  return `0 seconds ${suffix}`;
}
