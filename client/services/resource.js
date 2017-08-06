import requester from './requester';

export async function getUserInfo() {
  let result = await requester('/api/getUserInfo');
  return result;
}

export async function getInitAuth() {
  let result = await requester('/api/getInitAuth');
  return result;
}