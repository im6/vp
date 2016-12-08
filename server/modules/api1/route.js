'use strict';
var express = require('express'),
    router = express.Router(),
    globalConfig = require('../../../env/config'),
    authMd = require('../../middlewares/auth'),
    ctr = require("./ctr");

//router.get('/getUserById', authMd.checkAuth, ctr.getUserById);
router.get.apply(router, ['/test', ctr.test]);
router.get.apply(router, ['/getUserById', ctr.getUserById]);



module.exports = router;