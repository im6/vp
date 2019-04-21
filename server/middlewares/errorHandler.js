var path = require('path');
const appRoot = process.env.PWD;

module.exports = {
  notFound: function(req, res, next) {
    console.error('NOT FOUND! url: ', req.url);
    res.status(404).sendFile(path.resolve(appRoot,'./dist/public/404.html'));
  },
  onError: function(err, req, res, next){
    if(err === 403){
      console.error('=====  Deny Admin  =====');
      res.status(403).json(403);
    } else if(err === 404){
      console.error('=====  Auth Failed  =====');
      res.status(404).json(404);
    } else {
      console.error('=====  Internal Error  =====');
      console.error(err);
      res.status(500).json(500);
    }
  }
};