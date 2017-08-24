
export function getBoxPercWidth() {
  const w = window.innerWidth;
  let result = 0;
  if(w >= 1600){
    result = 71;
  } else if(w >= 1440){
    result = 75;
  } else if(w >= 1280){
    result = 85;
  }else if(w >= 1024){
    result = 78;
  }else if(w >= 768){
    result = 80;
  }else {
    result = 92;
  }

  return result;
}

export function bannerStartLocation(){
  const w = window.innerWidth,
    p = mobileDetect() ? 0 : 0.04,
    RATION = getBoxPercWidth()/100,
    NUM = w > 1199 ? 4 : w > 991 ? 3 : 2;
  let v0 = (1 - 2 * p) * (1 - RATION) / (2 * NUM);
  let v1 = w * (p + v0);
  v1 += -1.5;
  return v1;
}

export function mobileDetect() {
  let isMobile = false;
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    isMobile = true;
  }
  return isMobile;
}

export function scrollTop() {
  if(window.scrollY > 220){
    window.scrollTo(0, 0);
  }
}

export function downloadCanvas(color) {
  const HEIGHT = 420,
    WIDTH = 340,
    MARGIN = 13,
    CANVASRATIO = 0.65;

  const colors = color.split('#').map(v => '#'+v);
  const myCanvas = document.createElement('canvas');
  const ctx = myCanvas.getContext('2d');

  myCanvas.width = WIDTH;
  myCanvas.height = HEIGHT;
  myCanvas.style = 'border: 1px solid #c1c1c1';

  const boxHts = [
    HEIGHT * CANVASRATIO * 0.4,
    HEIGHT * CANVASRATIO * 0.25,
    HEIGHT * CANVASRATIO * 0.175,
    HEIGHT * CANVASRATIO * 0.175,
  ];

  ctx.fillStyle = '#fff';
  ctx.fillRect(0,0, WIDTH, HEIGHT * CANVASRATIO + MARGIN * 4);
  
  ctx.fillStyle = colors[0];
  ctx.fillRect(MARGIN,MARGIN,WIDTH - (MARGIN * 2), boxHts[0]);
  ctx.fillStyle = colors[1];
  ctx.fillRect(MARGIN,MARGIN + boxHts[0],WIDTH - (MARGIN * 2), boxHts[1]);
  ctx.fillStyle = colors[2];
  ctx.fillRect(MARGIN,MARGIN + boxHts[0] + boxHts[1],WIDTH - (MARGIN * 2), boxHts[2]);
  ctx.fillStyle = colors[3];
  ctx.fillRect(MARGIN,MARGIN + boxHts[0] + boxHts[1] + boxHts[2],WIDTH - (MARGIN * 2), boxHts[3]);

  const colorTxtPosition = CANVASRATIO * HEIGHT + 80,
    space = 17;
  
  ctx.font = '13px Arial';
  ctx.fillStyle = "#a3a3a3";
  ctx.fillText('ColorPK.com', WIDTH - MARGIN - 78, HEIGHT * 0.74);
  
  ctx.font = '15px Arial';
  ctx.fillStyle = '#909090';
  ctx.fillText(colors[0], MARGIN, colorTxtPosition);  
  ctx.fillText(colors[1], MARGIN, colorTxtPosition + space);
  ctx.fillText(colors[2], MARGIN, colorTxtPosition + space * 2);
  ctx.fillText(colors[3], MARGIN, colorTxtPosition + space * 3);

  const url = myCanvas.toDataURL();
  if('remove' in myCanvas){
    myCanvas.remove();
  }

  return url;

}
