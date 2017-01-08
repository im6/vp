import React, { PropTypes } from 'react';
import { createAction } from 'redux-actions';
import { connect } from 'react-redux';
import { Table, Icon, Card, Button, Popconfirm, Tooltip } from 'antd';

import ColorBar from './components/ColorBar';
import style from './style.less';

class AdminPanel extends React.PureComponent {
  constructor(props) {
    super(props);
    let me = this;
  }

  onApprove(record){
    let me = this;
    debugger;
  } //onDelete

  onDelete(record){
    let me = this;
    debugger;
  }

  showInModal(record){
    let me = this;
    debugger;
  }

  getColumns(){
    let me = this;
    const columns = [

      {
        title: 'Create',
        dataIndex: 'createdate',
        key: 'createdate'
      },

      {
        title: 'Color',
        key: 'color',
        render: (text, record, index) => (
          <ColorBar value={record.color} />
        )
      },
      {
        title: 'Like',
        dataIndex: 'like',
        key: 'like'
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record, index) => {
          return (
            <div>
              <Tooltip title="View">
                <Button
                  shape="circle"
                  icon="eye"
                  onClick={me.showInModal.bind(me, record)}
                  />
              </Tooltip>

              <Popconfirm
                title="Sure to approve?"
                okText="Confirm"
                cancelText="Cancel"
                onConfirm={me.onApprove.bind(me,record)}
                >
                <Button
                  shape="circle"
                  icon="check"
                  />
              </Popconfirm>
              <Popconfirm
                title="Sure to delete?"
                okText="Confirm"
                cancelText="Cancel"
                onConfirm={me.onDelete.bind(me,record)}
                >
                <Button
                  shape="circle"
                  icon="delete"
                  />
              </Popconfirm>
            </div>
          );
        }
      }
    ];

    return columns;
  }

  render() {
    const me = this;

    let list = me.props.admin.get('list').toJS();

    return <Card
      className={style.container}
      style={{minHeight: window.innerHeight * 0.85}}
      title={<span><Icon type="info-circle" />&nbsp;&nbsp;&nbsp;Color Management</span>}>

      <Table columns={me.getColumns()} dataSource={list} />
    </Card>
  }
}

function mapStateToProps({admin}){
  return {
    admin
  }
}

export default connect(mapStateToProps)(AdminPanel);