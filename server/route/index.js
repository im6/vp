
import express from 'express';
import {
  isAuth,
  isAdmin,
} from '../middlewares/auth';
import {
  oauthLogin,
  getUserInfo,
  getInitAuth,
  logoff,
  initColorList,
  initColorPortfolio,
  initColorLike,
  toggleLike,
  addNewColor,

  getAnonymousColor,
  postDecideColor,
} from '../middlewares/api';

const router = express.Router();

router.get('/login/:oauth', oauthLogin);
router.post('/getUserInfo', getUserInfo);
router.post('/getInitAuth', getInitAuth);
router.post('/logoff', logoff);
router.post('/initColorList', initColorList);
router.post('/initColorPortfolio', isAuth, initColorPortfolio);
router.post('/initColorLike', isAuth, initColorLike);
router.post('/toggleLike', toggleLike);
router.post('/addNewColor', addNewColor);
router.post('/getAnonymousColor', isAuth, isAdmin, getAnonymousColor);
router.post('/postDecideColor', isAuth, isAdmin, postDecideColor);

export default router