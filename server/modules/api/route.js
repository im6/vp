'use strict';
var express = require('express'),
  router = express.Router(),
  globalConfig = require('../../config/env'),
  authMd = require('../../middlewares/auth'),

  ctr = require("./ctr");


//=============================================================================
router.get.apply(router, ['/login/:oauth', ctr.oauthLogin]);


router.post.apply(router, ['/getUserInfo', ctr.getUserInfo]);
router.post.apply(router, ['/getInitAuth', ctr.getInitAuth]);
router.post.apply(router, ['/logoff', ctr.logoff]);



router.post.apply(router, ['/initColorList', ctr.initColorList]);
router.post.apply(router, ['/getColorType', ctr.getColorType]);
router.post.apply(router, ['/toggleLike', ctr.toggleLike]);
router.post.apply(router, ['/addNewColor', ctr.addNewColor]);


//=============================================================================
module.exports = router;