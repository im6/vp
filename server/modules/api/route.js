'use strict';
var express = require('express'),
  router = express.Router(),
  globalConfig = require('../../config/env'),
  authMd = require('../../middlewares/auth'),

  ctr = require("./ctr"),
  mongoCtr = require("./mongoCtr"),
  weiboCtr = require('./weiboCtr');

//=============================================================================

router.post.apply(router, ['/test', ctr.test]);

//=============================================================================
router.post.apply(router, ['/status', weiboCtr.getSessionStatus]);
router.post.apply(router, ['/loginInfo', weiboCtr.getLoginInfo]);
router.get.apply(router, ['/weibologin', weiboCtr.auth]);
//=============================================================================

router.post.apply(router, ['/initColorList', mongoCtr.initColorList]);


//=============================================================================
module.exports = router;