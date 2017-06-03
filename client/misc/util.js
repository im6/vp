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