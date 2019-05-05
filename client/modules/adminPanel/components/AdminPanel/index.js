import React from 'react';
import ColorBar from '../ColorBar';
import style from './style.sass';

class AdminPanel extends React.PureComponent {
  componentDidMount(){
    this.props.onInitLoad();
  }

  onApprove(record){
    this.props.onApprove(record.id);
  };

  onDelete(record){
    this.props.onDelete(record.id);
  }

  render() {
    return <div>
      <br />
      <br />
      <br />
      {
        this.props.list.toJS().map(v => {
          return <div key={v.id}>
            <ColorBar value={v.color} />
            <button className="button is-success is-small" onClick={this.onApprove.bind(this, v)}>Approve</button>
            <button className="button is-danger is-small" onClick={this.onDelete.bind(this, v)}>Delete</button>
            <br />
          </div>
        }) 
      }
    </div>
    // return (<Card
    //   className={style.container}
    //   style={{minHeight: window.innerHeight * 0.85}}
    //   title={<span><Icon type="info-circle" />&nbsp;&nbsp;&nbsp;Color Management</span>}>

    //   <Table
    //     columns={me.getColumns()}
    //     rowKey="id"
    //     dataSource={me.props.list.toJS()}
    //     pagination={false}
    //     />
    //   <Modal title="Color Preview" visible={me.state.showModal}
    //          onOk={me.onModalClose.bind(me)} onCancel={me.onModalClose.bind(me)}>
    //     <ColorCanvas colorValue={me.state.modalContent}/>
    //   </Modal>
    // </Card>);
  }
}

export default AdminPanel;