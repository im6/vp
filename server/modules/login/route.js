'use strict';
var express = require('express'),
    router = express.Router(),
    ctr = require("./ctr");

router.get('/',ctr.main);
router.post('/test',ctr.test);


module.exports = router;