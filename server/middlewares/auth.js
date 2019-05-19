import {
  redirect_uri_fb,
  fbAppSecret,
  fbAppKey,
} from '../config';
import {
  accessToken
} from '../resource/oauth';

const getOauthQsObj = (_, qs) => {
  const result = {
    client_id: fbAppKey,
    client_secret: fbAppSecret,
    code: qs.code,
    redirect_uri: redirect_uri_fb
  };
  return result;
}

export const isAuth = (req, res, next) => {
  try{
    if(req.session.app.isAuth){
      next();
    } else{
      next(401);
    }
  }
  catch(err){
    next(401);
  }
};

export const isAdmin = (req, res, next) => {
  try{
    if(req.session.app.dbInfo.isAdmin){
      next();
    } else{
      next(403);
    }
  }
  catch(err){
    next(403);
  }
}

export const oauthLogin = (req, res) => {
  const qs = req.query,
    oauthName = req.params.oauth;
  if(qs.code &&
    qs.state &&
    req.session.app &&
    qs.state === req.session.app.oauthState){
    console.log(`redirected by ${oauthName} auth...`);
    const qsObj = getOauthQsObj(oauthName, qs);
    accessToken(qsObj).then((data) => {
      data = data.data;
      if(data.access_token){
        req.session.app = {
          oauth: oauthName,
          isAuth: true,
          tokenInfo: data
        };
      }
      res.redirect("/");
    });
  } else {
    console.log('inconsistant session, error msg in session');
    req.session.app = {
      isAuth: false,
      alert: {
        type: 0,
        detail: 'Sorry, something error, please try again.'
      }
    };
    res.redirect("/");
  }
}
