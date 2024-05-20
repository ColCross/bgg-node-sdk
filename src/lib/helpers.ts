/* 
  The xml-js conversion will return an object if there is only one element, but an array if there are multiple elements.
  This is a problem when we try to iterate over the elements, as the same tag type may sometimes be an object and sometimes an array.
  This function will ensure that the value is always an array.
*/
export const enforceArray = <T>(value: T | Array<T> | undefined): Array<T> => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return [value];
};
