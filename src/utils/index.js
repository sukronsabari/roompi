function postedAt(date) {
  const now = new Date();
  const posted = new Date(date);
  const diff = now - posted;
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffSeconds = Math.floor(diff / 1000);

  return { diffDays, diffHours, diffMinutes, diffSeconds };
}

function postedAtShortDate(date) {
  const { diffDays, diffHours, diffMinutes, diffSeconds } = postedAt(date);

  if (diffDays > 0) return `${diffDays}d`;
  if (diffHours > 0) return `${diffHours}h`;
  if (diffMinutes > 0) return `${diffMinutes}m`;
  if (diffSeconds > 0) return `${diffSeconds}s`;

  return 'just now';
}

function postedAtLongDate(date) {
  const { diffDays, diffHours, diffMinutes, diffSeconds } = postedAt(date);

  if (diffDays > 0) return `${diffDays} days`;
  if (diffHours > 0) return `${diffHours} hours`;
  if (diffMinutes > 0) return `${diffMinutes} minutes`;
  if (diffSeconds > 0) return `${diffSeconds} seconds`;

  return 'now';
}

const getTags = (tags) => {
  const tagSplitted = tags.split(',');

  return tagSplitted;
};

export { getTags, postedAtLongDate, postedAtShortDate };
export default postedAt;
