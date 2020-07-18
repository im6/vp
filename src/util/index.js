export const isColorHex = (str) => {
  return /^(#[a-f0-9]{6}){4}$/.test(str);
};

export const isFourDiff = (str) => {
  const checkObj = {
    cnt: 0,
  };
  const strArray = [
    str.substring(0, 7),
    str.substring(7, 14),
    str.substring(14, 21),
    str.substring(21),
  ];
  strArray.forEach((v) => {
    if (!Object.prototype.hasOwnProperty.call(checkObj, v)) {
      checkObj[v] = true;
      checkObj.cnt += 1;
    }
  });

  return checkObj.cnt === strArray.length;
};

export const isValidColorStr = (str) => {
  return isColorHex(str) && isFourDiff(str);
};
