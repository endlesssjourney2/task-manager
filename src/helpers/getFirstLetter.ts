export const getFirstLetter = (str: string | null) => {
  return str ? str.charAt(0).toUpperCase() : "?";
};
