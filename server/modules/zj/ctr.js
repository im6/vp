'use strict';
var path = require('path'),
    appDir = path.dirname(require.main.filename);

module.exports = {
    main: function(req, res, next){
        res.sendFile('/public/zj/index.html',{ root: appDir });
    }
};