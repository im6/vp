import { Fragment } from 'react';

const ogTitle = 'ColorPK v1';
const ogSiteName = 'colorpk';
const ogDescription =
  'Your Best Color Picker | 全球最大色彩搭配网站 | 颜色搭配 | 艺术设计';
const ogImgHeight = 640;
const ogImgWidth = 1280;
const ogImage =
  'https://repository-images.githubusercontent.com/75897824/b1278e80-8704-11ea-9acf-ac166e4ad4fd';

const OgMeta = () => (
  <Fragment>
    <meta property="og:title" content={ogTitle} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://react.colorpk.com" />
    <meta property="og:description" content={ogDescription} />
    <meta property="og:site_name" content={ogSiteName} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:image:secure_url" content={ogImage} />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content={ogImgWidth} />
    <meta property="og:image:height" content={ogImgHeight} />
    <meta property="og:image:alt" content={ogSiteName} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content={ogSiteName} />
    {/* <meta name="twitter:creator" content="ZJ Guo" /> */}
    <meta name="twitter:title" content={ogTitle} />
    <meta name="twitter:description" content={ogDescription} />
    <meta name="twitter:image" content={ogImage} />
    <meta name="twitter:image:width" content={ogImgWidth} />
    <meta name="twitter:image:height" content={ogImgHeight} />
    <meta name="twitter:image:alt" content={ogSiteName} />
  </Fragment>
);

export default OgMeta;
