export const capitalizeFirst = (str: string) => {
  const formatted = str.replace(/_/g, " ");
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};
