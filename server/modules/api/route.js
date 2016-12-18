'use strict';
var express = require('express'),
  router = express.Router(),
  globalConfig = require('../../config/env'),
  authMd = require('../../middlewares/auth'),

  ctr = require("./ctr"),
  weiboCtr = require('./weiboCtr');


router.post.apply(router, ['/test', ctr.test]);
router.post.apply(router, ['/status', weiboCtr.getSessionStatus]);
router.get.apply(router, ['/weibologin', weiboCtr.auth]);



module.exports = router;