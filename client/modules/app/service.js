const privateFn = {
  getWhoteRoute(r) {
    let a = r.reduce((accumulator, currentValue, currentIndex, array) => {
      return accumulator + (currentValue.path || '');
    }, '');
    return a;
  }
};

const output = {
  compareRoutes(r1, r2){
    let r1str = privateFn.getWhoteRoute(r1);
    let r2str = privateFn.getWhoteRoute(r2);
    return r1str === r2str;
  }
};

export default output;
