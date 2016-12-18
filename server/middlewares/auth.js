var weiboApi = require('../resource/weibo/list'),
    globalConfig = require('../config/env'),
    url = require('url');
    _ = require('lodash');

module.exports = {
    checkAuth: function(req, res, next){
      debugger;
        var qs = req.query; // code and state
        if(qs.code && qs.state){
            // redirected by weibo
            console.log('redirected by weibo...');

            if(!req.session.app || req.session.app.weiboState != qs.state){
                res.redirect('/login');
                return null;
            }

            var qsObj = {
                client_id: globalConfig.weiboAppKey,
                client_secret: globalConfig.weiboAppSecret,
                grant_type: 'authorization_code',
                code: qs.code,
                redirect_uri: globalConfig.weiboRedirectUrl
            };

            weiboApi.accessToken({
                qs: qsObj
            }).then(function(data){
                if(data.access_token){
                    req.session.app = {
                        isAuth: true,
                        info: data
                    };
                    //var redir = url.parse(req.url).pathname;
                    res.redirect("/");
                }
            });
        } else if (!req.session.app || !req.session.app.isAuth){
            console.log('unAuth..');
            res.redirect('/auth');
        } else if(req.session.app.isAuth){
            console.log('auth check pass success.');
            next();
        } else {
            res.redirect('/login');
        }
    }
};