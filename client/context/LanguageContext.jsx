import React from 'react';
import { translation } from '../../isomorphic/translation';

export const LanguageContext = React.createContext();
export class LanguageContextProvider extends React.Component {
  render() {
    return (
      <LanguageContext.Provider value={translation[this.props.lang]}>
        {this.props.children}
      </LanguageContext.Provider>
    );
  }
}
