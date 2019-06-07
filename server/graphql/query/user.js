import UserType from '../type/user';

const query = {
  type: UserType,
  resolve(a) {
    console.log(a)
    return {
      id: 1,
      name: 'usertype'
    }
  }
};

export default query;