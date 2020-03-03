import { localStorageEnabled } from './util';

const LSLIKEKEY = 'userLike';

class LikeManagement {
  constructor() {
    this.hasLocalStorage = localStorageEnabled;
    if (this.hasLocalStorage) {
      // todo: clean up in the near future
      LikeManagement.cleanUpType();
    }
    this.initLikes = this.getInitLike();
  }

  static cleanUpType() {
    const userLike = JSON.parse(window.localStorage.getItem(LSLIKEKEY));
    if (Array.isArray(userLike)) {
      const strIds = userLike.filter(v => typeof v === 'string');
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
      const a = null;
      a.filter(v => v);
    }
  }

  removeLike(id) {
    if (this.hasLocalStorage) {
      let userLike = JSON.parse(window.localStorage.getItem(LSLIKEKEY));
      userLike = userLike.filter(v => v != id); // eslint-disable-line eqeqeq
      window.localStorage.setItem(LSLIKEKEY, JSON.stringify(userLike));
    }
  }
}

const likeManager = new LikeManagement(); // always singleton

export default likeManager;
