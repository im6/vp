import React from 'react';
import { createAction } from 'redux-actions';
import { connect } from 'react-redux';
import Color from './components/Color';

const mapStateToProps = ({color, user, routing}) => {
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
      return v.get('id');
    }, (a,b) => b-a);
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
    view,
    boxWidth: color.get('boxWidth')
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLike(id, btnStatus) {
      const ac = createAction('color/toggleLike');
      dispatch(ac({
        ...btnStatus,
        id
      }));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Color);
