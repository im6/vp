import React from 'react';
import { translation } from '../../isomorphic/translation';

const localStorageKey = 'colorpk1_lang';

export const LanguageContext = React.createContext();
export class LanguageContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.changeLang = this.changeLang.bind(this);
    const localValue =
      window.localStorage && window.localStorage.getItem(localStorageKey);
    const defaultLang = localValue in translation ? localValue : 'en';
    this.state = {
      language: translation[defaultLang],
      changeLang: this.changeLang,
    };
  }
  changeLang(lang) {
    this.setState({
      language: translation[lang],
    });
    try {
      window.localStorage.setItem(localStorageKey, lang);
    } catch (error) {
      // not support
    }
  }
  render() {
    return (
      <LanguageContext.Provider value={this.state}>
        {this.props.children}
      </LanguageContext.Provider>
    );
  }
}
