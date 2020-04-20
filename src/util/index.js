// eslint-disable-next-line import/prefer-default-export
export const isColorHex = (str) => {
  return /^(#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})){4}$/.test(str);
};
