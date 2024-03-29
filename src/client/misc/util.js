import Cookies from 'js-cookie';
import { tempDomId, cookieExpireTime } from '../../constant';

const checkLocalStorage = () => {
  const textKey = '_tls';
  try {
    window.localStorage.setItem(textKey, '1');
    window.localStorage.getItem(textKey);
    window.localStorage.removeItem(textKey);
    return true;
  } catch (e) {
    return false;
  }
};

const downloadCanvas = (color) => {
  const HEIGHT = 420;
  const WIDTH = 340;
  const MARGIN = 13;
  const CANVASRATIO = 0.65;
  const unitHeight = HEIGHT * CANVASRATIO;

  const colors = color.split('#').map((v) => `#${v}`);
  const myCanvas = document.createElement('canvas');
  const ctx = myCanvas.getContext('2d');

  myCanvas.width = WIDTH;
  myCanvas.height = HEIGHT;
  myCanvas.style.border = '1px solid #c1c1c1';

  const boxHts = [
    unitHeight * 0.4,
    unitHeight * 0.25,
    unitHeight * 0.175,
    unitHeight * 0.175,
  ];

  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, WIDTH, unitHeight + MARGIN * 4);

  [ctx.fillStyle] = colors;
  ctx.fillRect(MARGIN, MARGIN, WIDTH - MARGIN * 2, boxHts[0]);
  [, ctx.fillStyle] = colors;
  ctx.fillRect(MARGIN, MARGIN + boxHts[0], WIDTH - MARGIN * 2, boxHts[1]);
  [, , ctx.fillStyle] = colors;
  ctx.fillRect(
    MARGIN,
    MARGIN + boxHts[0] + boxHts[1],
    WIDTH - MARGIN * 2,
    boxHts[2]
  );
  [, , , ctx.fillStyle] = colors;
  ctx.fillRect(
    MARGIN,
    MARGIN + boxHts[0] + boxHts[1] + boxHts[2],
    WIDTH - MARGIN * 2,
    boxHts[3]
  );

  const colorTxtPosition = unitHeight + 80;
  const space = 17;

  ctx.font = '13px Arial';
  ctx.fillStyle = '#a3a3a3';
  ctx.fillText('ColorBro.com', WIDTH - MARGIN - 78, HEIGHT * 0.74);

  ctx.font = '15px Arial';
  ctx.fillStyle = '#909090';
  for (let i = 0; i < 4; i += 1) {
    ctx.fillText(colors[i], MARGIN, colorTxtPosition + space * i);
  }
  const url = myCanvas.toDataURL();
  if ('remove' in myCanvas) {
    myCanvas.remove();
  }
  return url;
};

export const localStorageEnabled = checkLocalStorage();

export const download = (title, colors) => {
  const downloadUrl = downloadCanvas(colors);
  const aElem = document.createElement('a');
  aElem.href = downloadUrl;
  aElem.download = title;
  aElem.click();
  if (aElem.parentNode) {
    aElem.parentNode.removeChild(aElem);
  }
};

export const customEventPolyFill = () => {
  if (typeof window.CustomEvent === 'function') return false; // If not IE
  function CustomEvent(event, params0) {
    const evt = document.createEvent('CustomEvent');
    const params = params0 || {
      bubbles: false,
      cancelable: false,
      detail: undefined,
    };
    evt.initCustomEvent(
      event,
      params.bubbles,
      params.cancelable,
      params.detail
    );
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
  return false;
};

export const share = (type) => {
  if (!Object.prototype.hasOwnProperty.call(window, 'encodeURIComponent')) {
    return;
  }
  const windowSize = 'left=350,top=250,width=500,height=300';
  const subject = window.encodeURIComponent('Check this ColorBro Palette');
  const pageLink = window.encodeURIComponent(window.location.href);

  let url = null;
  switch (type) {
    case 'twitter':
      url = `https://twitter.com/intent/tweet?url=${pageLink}&text=${subject}`;
      break;
    case 'facebook':
      url = `https://www.facebook.com/sharer/sharer.php?u=${pageLink}&quote=${subject}`;
      break;
    case 'email':
      url = `mailto:?subject=${subject}&body=${pageLink}`;
      break;
    default:
      return;
  }
  window.open(url, '', windowSize);
};

export const copyText = (txt) => {
  const inputElem = document.createElement('INPUT');
  const body = document.getElementById(tempDomId);
  body.appendChild(inputElem);
  inputElem.value = txt;
  inputElem.select();
  inputElem.setSelectionRange(0, 99999); // For mobile devices
  document.execCommand('copy');
  body.removeChild(inputElem);
};

export const setCookie = (key, value) => {
  Cookies.set(key, value, {
    expires: cookieExpireTime,
  });
};
