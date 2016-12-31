'use strict';
var express = require('express'),
  router = express.Router(),
  globalConfig = require('../../config/env'),
  authMd = require('../../middlewares/auth'),

  ctr = require("./ctr"),
  dbCtr = require("./dbCtr"),
  weiboCtr = require('./weiboCtr');

//=============================================================================

router.post.apply(router, ['/test', ctr.test]);

//=============================================================================
router.post.apply(router, ['/getUserInfo', weiboCtr.getUserInfo]);
router.get.apply(router, ['/weibologin', weiboCtr.weibologin]);
//=============================================================================

router.post.apply(router, ['/initColorList', dbCtr.initColorList]);
router.post.apply(router, ['/getColorType', dbCtr.getColorType]);
router.post.apply(router, ['/toggleLike', dbCtr.toggleLike]);


//=============================================================================
module.exports = router;