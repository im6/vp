'use strict';
var express = require('express'),
    router = express.Router(),
    globalConfig = require('../../config/env'),
    authMd = require('../../middlewares/auth'),
    ctr = require("./ctr");

router.get.apply(router, ['/', ctr.test]);
router.get.apply(router, ['/status', ctr.getSessionStatus]);



module.exports = router;