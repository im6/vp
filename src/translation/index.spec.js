const { translation, languages } = require('./index.js');

describe('language list', () => {
  test('total language provided', () => {
    expect(languages).toHaveLength(6);
  });
});

describe('translation correctness', () => {
  test('key value align', () => {
    const engLanguage = translation[languages[0].code];
    const engKeys = Object.keys(engLanguage);
    let allNameCovered = true;
    let noExtraNames = true;

    languages.forEach(lang => {
      const transSet = translation[lang.code];
      if (Object.keys(transSet).length !== engKeys.length) {
        noExtraNames = false;
      }
      engKeys.forEach(name => {
        const res = transSet[name];
        if (!res) {
          allNameCovered = false;
        }
      });
      expect(allNameCovered).toBeTruthy();
      expect(noExtraNames).toBeTruthy();
    });
  });
});
