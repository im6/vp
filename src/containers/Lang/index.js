import { connect } from 'react-redux';
import LanguageProvider from 'components/LanguageContext/Provider';

const mapStateToProps = ({ user }) => ({
  lang: user.get('lang'),
});

export default connect(mapStateToProps)(LanguageProvider);
