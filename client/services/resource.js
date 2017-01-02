import requester from './requester';
import qs from 'qs';

export async function getUserInfo() {
  let result = await requester('/api/getUserInfo');
  return result;
}

export async function getInitAuth() {
  let result = await requester('/api/getInitAuth');
  return result;
}