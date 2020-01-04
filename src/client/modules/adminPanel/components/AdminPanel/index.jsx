import React from 'react';
import PropTypes from 'prop-types';
import style from './style.sass';
import ColorBar from '../ColorBar';

class AdminPanel extends React.PureComponent {
  componentDidMount() {
    this.props.onInit();
  }

  onApprove(record) {
    this.props.onApprove(record.id);
  }

  onDelete(record) {
    this.props.onDelete(record.id);
  }

  render() {
    const { loading } = this.props;
    const colors = this.props.list.toJS();
    return (
      <div className={style.container}>
        <br />
        <br />
        <br />
        {!loading && colors.length === 0 && <h1>No colors to decide.</h1>}
        {colors.map(v => {
          return (
            <div key={v.id} className={style.oneRow}>
              <ColorBar value={v.color} />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <button
                className="button is-success is-small"
                onClick={this.onApprove.bind(this, v)}
              >
                Approve
              </button>
              &nbsp;&nbsp;
              <button
                className="button is-danger is-small"
                onClick={this.onDelete.bind(this, v)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

AdminPanel.propTypes = {
  list: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  onInit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onApprove: PropTypes.func.isRequired,
};

export default AdminPanel;
