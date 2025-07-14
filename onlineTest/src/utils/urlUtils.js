export const generateShortcode = () => Math.random().toString(36).substring(2, 8);

export const calculateExpiry = (minutes) => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + parseInt(minutes));
  return now.toISOString();
};
