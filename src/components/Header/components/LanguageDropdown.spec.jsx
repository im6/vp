import React from 'react';
import { render, fireEvent } from 'test-utils';
import LangDropdown from './LanguageDropdown';

describe('render properly', () => {
  const languages = [
    {
      code: 'eng',
      name: 'English',
    },
    {
      code: 'chn',
      name: 'Chinese',
    },
  ];
  test('render LangDropdown correct', () => {
    const onChange = jest.fn();
    const selectedLang = languages[0];
    const { getByText } = render(
      <LangDropdown languages={languages} onChange={onChange} />
    );
    fireEvent.click(getByText(selectedLang.name));
    expect(onChange).toBeCalledWith(selectedLang.code);
  });
});
