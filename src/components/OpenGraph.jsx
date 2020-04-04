import React, { Fragment } from 'react';
import { cdnUrl } from '../constant';

const OgMeta = () => (
  <Fragment>
    <meta property="og:url" content="https://react.colorpk.com" />
    <meta property="og:site_name" content="ColorPK v1" />
    <meta property="og:title" content="Your Best Color Picker" />
    <meta
      property="og:description"
      content="ColorPK - Faster lighter and nicer color palette | 全球最大色彩搭配网站 | 颜色搭配 | 艺术设计"
    />
    <meta property="og:image" content={`${cdnUrl}/icon.png`} />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="620" />

    <meta property="twitter:site" content="colorpk" />
    <meta property="twitter:creator" content="colorpk" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:title" content="ColorPK" />
    <meta
      property="twitter:description"
      content="ColorPK - Faster lighter and nicer color palette | 全球最大色彩搭配网站 | 颜色搭配 | 艺术设计"
    />
    <meta property="twitter:image:src" content={`${cdnUrl}/icon.png`} />
    <meta property="twitter:image:width" content="1200" />
    <meta property="twitter:image:height" content="1200" />
  </Fragment>
);

export default OgMeta;
