import { connect } from 'react-redux';
import { LanguageContextProvider } from '../../isomorphic/LanguageContext';

const mapStateToProps = ({ user }) => {
  return {
    lang: user.get('lang'),
  };
};

export default connect(mapStateToProps)(LanguageContextProvider);
