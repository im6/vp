import { isColorHex } from '.';

describe('isColorHex', () => {
  test('test accuracy', () => {
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
});
