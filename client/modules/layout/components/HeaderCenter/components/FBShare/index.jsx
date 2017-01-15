import React, { PropTypes } from 'react';
import style from './style.less';

const iframeSrc = "https://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.colorpk.com&width=78&layout=button&action=like&size=small&show_faces=false&share=true&height=65&appId=104200920090730";

const FBShare = () => {
  return <iframe src={iframeSrc}
                 width="146"
                 height="46"
                 className={style.container}
                 scrolling="no"
                 frameBorder="0"
                 allowTransparency="true" />;
};

export default FBShare;
