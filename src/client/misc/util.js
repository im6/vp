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
export const localStorageEnabled = checkLocalStorage();
const downloadCanvas = color => {
  const HEIGHT = 420;
  const WIDTH = 340;
  const MARGIN = 13;
  const CANVASRATIO = 0.65;

  const colors = color.split('#').map(v => `#${v}`);
  const myCanvas = document.createElement('canvas');
  const ctx = myCanvas.getContext('2d');

  myCanvas.width = WIDTH;
  myCanvas.height = HEIGHT;
  myCanvas.style.border = '1px solid #c1c1c1';

  const boxHts = [
    HEIGHT * CANVASRATIO * 0.4,
    HEIGHT * CANVASRATIO * 0.25,
    HEIGHT * CANVASRATIO * 0.175,
    HEIGHT * CANVASRATIO * 0.175,
  ];

  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, WIDTH, HEIGHT * CANVASRATIO + MARGIN * 4);

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

  const colorTxtPosition = CANVASRATIO * HEIGHT + 80;
  const space = 17;

  ctx.font = '13px Arial';
  ctx.fillStyle = '#a3a3a3';
  ctx.fillText('ColorPK.com', WIDTH - MARGIN - 78, HEIGHT * 0.74);

  ctx.font = '15px Arial';
  ctx.fillStyle = '#909090';
  ctx.fillText(colors[0], MARGIN, colorTxtPosition);
  ctx.fillText(colors[1], MARGIN, colorTxtPosition + space);
  ctx.fillText(colors[2], MARGIN, colorTxtPosition + space * 2);
  ctx.fillText(colors[3], MARGIN, colorTxtPosition + space * 3);

  const url = myCanvas.toDataURL();
  if ('remove' in myCanvas) {
    myCanvas.remove();
  }
  return url;
};

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

export const share = type => {
  // eslint-disable-next-line no-prototype-builtins
  if (!window.hasOwnProperty('encodeURIComponent')) {
    return;
  }
  const windowSize = 'left=350,top=250,width=500,height=300';
  const subject = window.encodeURIComponent('Check this ColorPK Palette');
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
