'use strict';
var express = require('express'),
    router = express.Router(),
    ctr = require("./ctr");

router.get('/',ctr.main);

module.exports = router;