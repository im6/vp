export function getBoxPercWidth() {
  let result = 0;
  let w = window.innerWidth;
  if(w >= 1440){
    result = 74;
  } else if(w >= 1280){
    result = 85;
  }else if(w >= 1024){
    result = 78;
  }else if(w >= 768){
    result = 80;
  }else {
    result = 92;
  }

  result += '%';
  return result;
}

export function mobileDetect() {
  var isMobile = false;
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
  const HEIGHT = 340,
    WIDTH = 340,
    MARGIN = 13,
    CANVASRATIO = 0.8,
    BOTTOMRADIO = 5;
  const colors = color.split('#');
  const myCanvas = document.createElement('canvas');
  const ctx = myCanvas.getContext('2d');
  myCanvas.id = "tempCanvas";
  myCanvas.width = WIDTH;
  myCanvas.height = HEIGHT;
  myCanvas.style = 'border: 1px solid #c1c1c1; border-radius: 10px;';
  myCanvas.toDataURL();

  const boxHts = [
    HEIGHT * CANVASRATIO * 0.4,
    HEIGHT * CANVASRATIO * 0.25,
    HEIGHT * CANVASRATIO * 0.175,
    HEIGHT * CANVASRATIO * 0.175,
  ];
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(MARGIN,MARGIN,WIDTH - (MARGIN * 2), boxHts[0]);
  ctx.fillStyle = "#0F0F00";
  ctx.fillRect(MARGIN,MARGIN + boxHts[0],WIDTH - (MARGIN * 2), boxHts[1]);
  ctx.fillStyle = "#0000FF";
  ctx.fillRect(MARGIN,MARGIN + boxHts[0] + boxHts[1],WIDTH - (MARGIN * 2), boxHts[2]);
  ctx.fillStyle = "#00FF00";
  ctx.fillRect(MARGIN,MARGIN + boxHts[0] + boxHts[1] + boxHts[2],WIDTH - (MARGIN * 2), boxHts[3]);

  ctx.font = "28px";
  ctx.fillStyle = "#485f92";
  ctx.fillText("ColorPK.com", MARGIN, MARGIN * 3 + HEIGHT - (MARGIN * BOTTOMRADIO));
  ctx.fillText("ColorPK.com", MARGIN, MARGIN * 3 + HEIGHT - (MARGIN * BOTTOMRADIO));




  document.body.appendChild(myCanvas);
}