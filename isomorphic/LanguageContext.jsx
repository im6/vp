import React from 'react';
import { translation } from './translation';

export const LanguageContext = React.createContext();
export class LanguageContextProvider extends React.Component {
  render() {
    const lang = translation[this.props.lang] || translation.en;
    return (
      <LanguageContext.Provider value={lang}>
        {this.props.children}
      </LanguageContext.Provider>
    );
  }
}
