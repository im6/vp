import { isColorHex, isFourDiff, isValidColorStr } from '.';

describe('util test cases', () => {
  test('isColorHex', () => {
    expect(isColorHex()).toBe(false);
    expect(isColorHex('')).toBe(false);
    expect(isColorHex(null)).toBe(false);
    expect(isColorHex('###')).toBe(false);
    expect(isColorHex('#1d8696#22646f#2f5a60#ff8193')).toBe(true);
    expect(isColorHex('#1D8696#22646f#2f5a60#ff8193')).toBe(false);
    expect(isColorHex('#1da#22646f#2f5a60#ff8193')).toBe(false);
    expect(isColorHex('#1da#22646f#2f5a60#ff8193#')).toBe(false);
    expect(isColorHex('#1da#22646f#2f5a60#ff8193#ff8193')).toBe(false);
  });
  test('isFourDiff', () => {
    expect(isFourDiff('#1d8696#22646f#2f5a60#ff8193')).toBe(true);
    expect(isFourDiff('#1d8696#22646f#ff8193#ff8193')).toBe(false);
  });
  test('isValidColorStr', () => {
    expect(isValidColorStr('#1D8696#22646f#2f5a60#ff8193')).toBe(false);
    expect(isValidColorStr('#1d8696#22646f#ff8193#ff8193')).toBe(false);
    expect(isValidColorStr('#1d8696#22646f#2f5a60#ff8193')).toBe(true);
  });
});
