import { localStorageEnabled } from './util';

const LSLIKEKEY = 'userLike';

class LikeManagement {
  constructor() {
    this.hasLocalStorage = localStorageEnabled;
    if (localStorageEnabled) {
      // todo: clean up in the near future
      LikeManagement.cleanUpType();
    }
    this.initLikes = this.getInitLike();
  }

  static cleanUpType() {
    const userLike = JSON.parse(window.localStorage.getItem(LSLIKEKEY));
    if (Array.isArray(userLike)) {
      const strIds = userLike.filter((v) => typeof v === 'string');
      window.localStorage.setItem(LSLIKEKEY, JSON.stringify(strIds));
    }
  }

  getInitLike() {
    if (this.hasLocalStorage) {
      const currentLocalState = JSON.parse(
        window.localStorage.getItem(LSLIKEKEY)
      );
      if (Array.isArray(currentLocalState)) {
        return currentLocalState;
      }
      window.localStorage.setItem(LSLIKEKEY, JSON.stringify([]));
      return [];
    }
    return [];
  }

  addLike(id) {
    if (this.hasLocalStorage) {
      const userLike = JSON.parse(window.localStorage.getItem(LSLIKEKEY));
      userLike.push(id);
      window.localStorage.setItem(LSLIKEKEY, JSON.stringify(userLike));
    }
  }

  removeLike(id) {
    if (this.hasLocalStorage) {
      const userLike = JSON.parse(window.localStorage.getItem(LSLIKEKEY));
      const newUserLike = userLike.filter((v) => v != id); // eslint-disable-line eqeqeq
      window.localStorage.setItem(LSLIKEKEY, JSON.stringify(newUserLike));
    }
  }
}

const likeManager = new LikeManagement(); // always singleton

export default likeManager;
