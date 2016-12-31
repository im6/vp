import requester from './requester';
import qs from 'qs';

export async function getUserStatus() {
  let result = await requester('/api/getUserInfo');
  return result;
}

//export async function getInitialLogin() {
//  let result = await requester('/api/getUserInfo', {
//    method: "POST"
//  });
//  return result;
//}
