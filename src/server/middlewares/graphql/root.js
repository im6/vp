import get from 'lodash.get';
import { GraphQLError } from 'graphql';

import {
  fetchFacebookProfile,
  fetchWeiboProfile,
  fetchGithubProfile,
} from '../../resource/oauth';
import { isAuth, isAdmin, getTokenInfo } from '../../helper';
import { isValidColorStr } from '../../../util';
import {
  getColorList,
  createColorDocument,
  flipColorVisibility,
  deleteColor,
  incrementColorStar,
  getColorsByUser,
  checkUser,
  createUser,
  updateUserLoginDate,
  getUserSaveColorList,
  upsertUserSaveColor,
  deleteUserSaveColor,
  deleteColorFromUserSave,
} from '../../resource/mongodb/crud';

const root = {
  async user(_, req) {
    const tokenInfo = getTokenInfo(req);
    if (isAuth(req, true) && tokenInfo) {
      const oauthType = req.session.app.oauth;
      try {
        let oauthData = null;
        if (oauthType === 'fb') {
          oauthData = await fetchFacebookProfile(tokenInfo);
        } else if (oauthType === 'wb') {
          oauthData = await fetchWeiboProfile(tokenInfo);
        } else if (oauthType === 'gh') {
          oauthData = await fetchGithubProfile(tokenInfo);
        }

        const { name, oauthId } = oauthData;
        const optionalUser = await checkUser(oauthType, oauthId);

        if (optionalUser) {
          // existing user.
          const { isAdmin: hasAdminFlag, userId } = optionalUser;

          req.session.app.dbInfo = {
            id: userId,
            name, // grab name from oauth
            isAdmin: hasAdminFlag,
          };

          const ownDataArr = await getColorsByUser(userId);
          const saveDataArr = await getUserSaveColorList(userId);

          await updateUserLoginDate(userId);
          return {
            name,
            isAdmin: hasAdminFlag,
            img: oauthData.img || null,
            likes: saveDataArr,
            owns: ownDataArr,
          };
        }

        // user first time login, save it.
        const newUserId = await createUser({
          oAuthId: oauthId,
          oAuthType: oauthType,
          name,
          isAdmin: false,
          lastLogin: new Date(),
        });

        req.session.app.dbInfo = {
          id: newUserId,
          name,
          isAdmin: false,
        };
        return {
          name,
          isAdmin: false,
          img: get(oauthData, 'picture.data.url', null),
          likes: [],
          owns: [],
        };
      } catch (err) {
        return new GraphQLError(err.toString());
      }
    } else {
      return null;
    }
  },

  async color({ category }, req) {
    if (!isAdmin(req) && category === 'ANONYMOUS') {
      return new GraphQLError('color error: no admin access');
    }

    try {
      const colors = await getColorList(category);
      return colors;
    } catch (err) {
      return new GraphQLError(err.toString());
    }
  },

  async likeColor({ input }, req) {
    const { id, willLike } = input;
    try {
      if (isAuth(req)) {
        const userId = get(req, 'session.app.dbInfo.id', null);
        if (willLike) {
          await upsertUserSaveColor(userId, id);
        } else {
          await deleteUserSaveColor(userId, id);
        }
      }

      if (willLike) {
        const status = await incrementColorStar(id);
        return {
          status,
        };
      }
      return {
        status: 0,
      };
    } catch (err) {
      return new GraphQLError(err.toString());
    }
  },

  async createColor({ input }, req) {
    const { color } = input;
    if (!isValidColorStr(`#${color}`)) {
      return new GraphQLError('create error: invalid color input');
    }

    const sessionUserid = get(req, 'session.app.dbInfo.id', null);
    const userId = isAuth(req) ? sessionUserid : null;

    try {
      const newId = await createColorDocument(
        {
          star: (Math.random() * 20).toFixed(),
          color,
          createdBy: undefined, // define later
          hidden: !userId,
          createdDate: new Date(),
        },
        userId
      );
      return {
        status: 0,
        data: newId,
      };
    } catch (err) {
      return new GraphQLError(err.toString());
    }
  },

  async adjudicateColor({ input }, req) {
    if (!isAdmin(req)) {
      return new GraphQLError('adjudicate error: no admin access');
    }
    const { id, willLike } = input;
    try {
      if (willLike) {
        const status = await flipColorVisibility(id);
        return {
          status,
        };
      }
      // will unlike operation
      const status = await deleteColor(id);
      await deleteColorFromUserSave(id);
      return {
        status,
      };
    } catch (err) {
      return new GraphQLError(err.toString());
    }
  },
};

export default root;
