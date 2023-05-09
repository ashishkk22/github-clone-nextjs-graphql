export function timeAgo(value: string) {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(value).getTime()) / 1000
  );
  let interval = seconds / 31536000;
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  if (interval > 1) {
    return rtf.format(-Math.floor(interval), "year");
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return rtf.format(-Math.floor(interval), "month");
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return rtf.format(-Math.floor(interval), "day");
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return rtf.format(-Math.floor(interval), "hour");
  }
  interval = seconds / 60;
  if (interval > 1) {
    return rtf.format(-Math.floor(interval), "minute");
  }
  return rtf.format(-Math.floor(interval), "second");
}
