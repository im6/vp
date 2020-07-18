// eslint-disable-next-line import/prefer-default-export
export const isColorHex = (str) => {
  return /^(#[a-f0-9]{6}){4}$/.test(str);
};
