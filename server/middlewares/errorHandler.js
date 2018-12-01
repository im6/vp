var path = require('path');

module.exports = {
  notFound: function(req, res, next) {
    console.error('NOT FOUND! url: ', req.url);
    res.status(404).sendFile(path.resolve(__dirname,'../view/404.html'));
  },
  onError: function(err, req, res, next){
    console.error('=====  Internal Error  =====');
    console.error(err);
    res.status(500).json(500);
  }
};