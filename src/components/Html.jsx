import React from 'react';
import PropTypes from 'prop-types';
import OpenGraph from './OpenGraph';
import serialize from 'serialize-javascript';
import { tempDomId, reduxName } from '../constant';

const Html = ({
  title,
  style,
  script,
  children,
  csrfToken,
  lastBuildDate,
  initState,
}) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <OpenGraph />
      <title>{title}</title>
      <meta
        name="description"
        content="ColorPK | Faster lighter and nicer than colorhunt | 全球最大色彩搭配网站 | 颜色搭配 | 艺术设计"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      />
      <meta name="robots" content="INDEX,FOLLOW" />
      <meta
        name="keywords"
        content="colorpk, colorpicker, color picker, palette, color combination"
      />
      <link
        rel="shortcut icon"
        href="//dkny.oss-cn-hangzhou.aliyuncs.com/3/fav.ico"
      />
      <link href={style} rel="stylesheet" />
      <script
        dangerouslySetInnerHTML={{
          __html: `if(window.location.hostname.indexOf('colorpk.com') > -1){(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5LX6LV3');} var initLoadTime = Date.now();window.addEventListener('_COLORPK_SCRIPT_READY', function(){window.dataLayer.push({'scriptLoadingTime': Date.now() - initLoadTime});console.log('server last build: ${lastBuildDate}');});
          `,
        }}
      />
    </head>
    <body>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-5LX6LV3"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
      <div id={tempDomId} />
      <div id="csrf" data-token={csrfToken} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.${reduxName}=${serialize(initState)}`,
        }}
      />
      <script src={script} type="text/javascript" />
    </body>
  </html>
);

Html.propTypes = {
  title: PropTypes.string.isRequired,
  lastBuildDate: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  script: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  csrfToken: PropTypes.string.isRequired,
  initState: PropTypes.object.isRequired,
};

export default Html;
