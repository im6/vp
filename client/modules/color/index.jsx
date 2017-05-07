import React from 'react';
import { Card, Icon, Row, Col } from 'antd';
import classnames from 'classnames';
import QueueAnim from 'rc-queue-anim';
import { createAction } from 'redux-actions';
import { connect } from 'react-redux';
import EventListener, {withOptions} from 'react-event-listener';
import debounce from 'debounce';

import Box from './components/Box';
import SpinLoader from './components/SpinLoader';
import HeadBanner from './components/HeadBanner';

import style from './style.less';

const SCROLLTOLERANCE = 150,
  INFINITESCROLL = false;

class Color extends React.Component {
  constructor(props) {
    super(props);
    let me = this;
    me.isAnimating = true;
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps){
    let me = this;
    me.isAnimating = nextProps.list.size != this.props.list.size;
  }
  onLikeClickHandler(index, btnStatus){
    let me = this;
    const ac = createAction('color/toggleLike');
    me.props.dispatch(ac({
      ...btnStatus,
      index
    }));
  }

  scrollHandler(st, ev) {
    let me = this;
    let isloading = me.props.loading;
    if(isloading || me.isAnimating){
      return false;
    }
    let elem = ev.target.body;
    let scrollBtn = elem.scrollHeight - elem.clientHeight - elem.scrollTop;
    if(scrollBtn < st){
      let actcr = createAction('color/loadMore');
      me.props.dispatch(actcr());
    }
  };

  getBoxWidth(){
    let me = this;
    let result = 0;
    let w = window.innerWidth;
    if(w >= 1200){
      result = 72;
    }else if(w >= 992){
      result = 80;
    }else if(w >= 768){
      result = 80;
    }else {
      result = 92;
    }
    return result;
  }

  onAnimEnd(endKey, type){
    let me = this;
    if(endKey === type.key){
      if(type.type === 'enter' &&
        (me.props.view === 'popular' || me.props.view === 'latest')){
        me.isAnimating = false;
      }
    }
  }

  render() {
    let me = this;
    let boxW = me.getBoxWidth();
    let listClass = {},
      im = me.props.isMobile;
    listClass[style.pcPadding] = !im;
    listClass[style.list] = true;
    let clsStr = classnames(listClass);
    let endKey = (me.props.list.size-1).toString();

    return <div style={{minHeight: 800}}>
      {
        (INFINITESCROLL && (me.props.view === 'latest' || me.props.view === 'popular')) ?
          <EventListener
            target="window"
            onScroll={debounce(me.scrollHandler.bind(me, SCROLLTOLERANCE))}
            />:
          null
      }

      <HeadBanner
        colorSize={me.props.list.size}
        colorView={me.props.view}
        />

      {
        me.props.selectedIndex >= 0 ?
          (
            <div className={style.selectedBox}>
              <Box boxInfo={me.props.list.get(me.props.selectedIndex)}
                   boxWidth={im? 70: 30}
                   isMobile={im}
                   onLikeClick={me.onLikeClickHandler.bind(me, me.props.selectedIndex)} />
            </div>
          ) : null

      }

      <QueueAnim type="top"
                 onEnd={me.onAnimEnd.bind(me, endKey)}
                 duration={280}
                 interval={80}
                 className={clsStr}>
        {
          me.props.list.map((v, k) => {
            return (<Col xs={12}
                         sm={12}
                         md={8}
                         lg={6}
                         key={k}
                         className={style.colContainer}>
              <Box boxInfo={v}
                   boxWidth={boxW}
                   isMobile={im}
                   onLikeClick={me.onLikeClickHandler.bind(me, k)} />
            </Col>);
          })
        }
      </QueueAnim>
      { me.props.loading ? <SpinLoader /> : <div style={{height: 60}}/> }
    </div>
  }
}

function mapStateToProps({color, user, routing}){
  let saved = color.get('liked'),
    view = color.get('view'),
    listName = 'list';

  if(view === 'portfolio'){
    listName = 'myPortfolio';
  }else if(view === 'like'){
    listName = 'myLiked';
  }

  let color0 = color.get(listName).map(v => {
    return v.merge({
      liked: saved.get('d' + v.get('id')) || false
    });
  });

  //========== order ==============
  if(view === 'latest'){
    color0 = color0.sortBy(v => {
      return v.get('like');
    });
  }
  //========== order END ==============


  let selectedIndex = -1;
  if(view === 'color'){
    let selectedColorIdStr = routing.locationBeforeTransitions.pathname.replace('/color/',''),
      pttId = parseInt(selectedColorIdStr);
    selectedIndex = color0.findIndex((v,k)=> {
      return v.get('id') === pttId;
    });
  }

  return {
    list: color0,
    loading: color.get('loading'),
    isMobile: user.get('isMobile'),
    selectedIndex,
    view
  }
}

export default connect(mapStateToProps)(Color);
