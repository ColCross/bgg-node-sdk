export const enforceArray = <T>(value: T | Array<T> | undefined): Array<T> => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return [value];
};
