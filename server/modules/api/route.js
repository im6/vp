'use strict';
const express = require('express'),
  router = express.Router(),
  globalConfig = require('../../config/env'),
  authMd = require('../../middlewares/auth'),
  md = require('../../middlewares/auth'),
  ctr = require("./ctr"),
  adminCtr = require("./adminCtr");

router.get('/login/:oauth', ctr.oauthLogin);
router.post('/getUserInfo', ctr.getUserInfo);
router.post('/getInitAuth', ctr.getInitAuth);
router.post('/logoff', ctr.logoff);
router.post('/initColorList', ctr.initColorList);
router.post('/initColorPortfolio', md.isAuth, ctr.initColorPortfolio);
router.post('/initColorLike', md.isAuth, ctr.initColorLike);
router.post('/getColorType', ctr.getColorType);
router.post('/toggleLike', ctr.toggleLike);
router.post('/addNewColor', ctr.addNewColor);
router.post('/getAnonymousColor', md.isAuth, md.isAdmin, adminCtr.getAnonymousColor);
router.post('/postDecideColor', md.isAuth, md.isAdmin, adminCtr.postDecideColor);

export default router