'use strict';
var express = require('express'),
    router = express.Router(),
    authMd = require('../../middlewares/auth'),
    ctr = require("./ctr");

router.get('/', authMd.checkAuth, ctr.main);
router.get('/logout',ctr.logout);

module.exports = router;