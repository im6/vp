import React, { PropTypes } from 'react';

const FBShare = () => {
  return <iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&width=118&layout=button_count&action=like&size=small&show_faces=true&share=true&height=46&appId=1602309996451051"
                 width="146"
                 height="46"
                 style={{border:"none", overflow:"hidden"}}
                 scrolling="no"
                 frameBorder="0"
                 allowTransparency="true" />;
};

export default FBShare;
