import { localStorageEnabled } from './util';

const LSLIKEKEY = 'userLike';

class LikeManagement {
  constructor() {
    this.hasLocalStorage = localStorageEnabled;
    this.initLikes = this.getInitLike();
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
      let userLike = JSON.parse(window.localStorage.getItem(LSLIKEKEY));
      userLike = userLike.filter(v => v != id); // eslint-disable-line eqeqeq
      window.localStorage.setItem(LSLIKEKEY, JSON.stringify(userLike));
    }
  }
}

const likeManager = new LikeManagement(); // always singleton

export default likeManager;
