import React, { Fragment } from 'react';
import Box from '../Box';
import OneColor from '../OneColor';
import style from './style.sass';

class Color extends React.Component {
  constructor(props) {
    super(props);
    this.onEnterClick = this.onEnterClick.bind(this);
    this.onLikeClick = this.onLikeClick.bind(this);
    this.onDownloadClick = this.onDownloadClick.bind(this);
  }
  componentDidMount(){
    const { url } = this.props.match;
    if(url === '/portfolio') {
      this.props.onEnterProfile('myPortfolio');
    } else if(url === '/like') {
      this.props.onEnterProfile('myLiked');
    }
  }

  onLikeClick(newState){
    const { id, willLike } = newState;
    this.props.onLike(id, willLike);
  }

  onEnterClick(color) {
    this.props.onEnter(color);
  }

  onDownloadClick(color) {
    this.props.onDownload(color);
  }

  render() {
    const { selectedId } = this.props;
    return <Fragment>
      {
        selectedId &&
        <OneColor
          selected={this.props.colorDef.get(selectedId)}
          liked={this.props.liked.get(selectedId)}
          onLike={this.onLikeClick}
          onDownload={this.onDownloadClick}
        />
      }
      <div className={style.container}>
        <div className={style.list}>
            {
              this.props.list.map((v) => {
                return <Box key={v}
                  liked={this.props.liked.get(v)}
                  boxInfo={this.props.colorDef.get(v)}
                  onLikeClick={this.onLikeClick}
                  onCanvasClick={this.onEnterClick}
                />;
              })
            }
        </div>
      </div>
    </Fragment>;
  }
}

export default Color;
