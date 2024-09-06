export const toRelativeDate = (
  date: Date | string,
  unit: Intl.RelativeTimeFormatUnit = 'day',
  locale = 'fr-FR',
) => {
  const dateInstance = typeof date === 'string' ? new Date(date) : date;
  const diffInDay = Math.round(
    (dateInstance.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );
  const relativeTimeFormat = new Intl.RelativeTimeFormat(locale, {
    style: 'short',
    numeric: 'auto',
    localeMatcher: 'best fit',
  });

  return relativeTimeFormat.format(diffInDay, unit);
};
