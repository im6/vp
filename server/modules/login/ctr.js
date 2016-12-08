'use strict';
var path = require('path'),
    appDir = path.dirname(require.main.filename),
    globalConfig = require('../../../env/config'),
    uuid = require('uuid'),
    weiboRsc = require('../../resource/weibo/list');

var client_id = globalConfig.weiboAppKey,
    redirect_uri = globalConfig.weiboRedirectUrl,
    scope = "all";

var privateFn = {
    createWeiboLink: function(state){
        var url = "https://api.weibo.com/oauth2/authorize?" +
            "client_id=" + client_id +
            "&scope=" + scope +
            "&state=" + state +
            "&redirect_uri=" + redirect_uri;
        return url;
    }
};


module.exports = {
    main: function(req, res, next){

        var csrfStr = "123";
        if(req.csrfToken){
            csrfStr = req.csrfToken();
        }

        console.log('auth main');
        if(req.session.app && req.session.app.isAuth){
            res.redirect('/');
        }else{
            var stateId = uuid.v1();
            req.session.app = {
                weiboState : stateId
            };
            var obj = {
                title: 'Welcome to zjgallo.com',
                weiboState: stateId,
                url: privateFn.createWeiboLink(stateId),
                csrf: csrfStr
            };

            res.render('login', obj);
        }
    },
    test: function(req, res, next){
        res.json({
            test:213
        });
    }
};