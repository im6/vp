const privateFn = {
  getWhoteRoute(r) {
    let a = r.reduce((accumulator, currentValue, currentIndex, array) => {
      return accumulator + (currentValue.path || '');
    }, '');
    return a;
  }
};

const colorUrls = ['/', '//like', '//portfolio','//latest'];

const output = {
  compareRoutes(r1, r2){
    let r1str = privateFn.getWhoteRoute(r1);
    let r2str = privateFn.getWhoteRoute(r2);

    let same = null;

    if(colorUrls.indexOf(r1str) > -1 && colorUrls.indexOf(r2str) > -1){
      same = true;
    }else{
      same = r1str === r2str;
    }

    return same;
  }
};

export default output;
