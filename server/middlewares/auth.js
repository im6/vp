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