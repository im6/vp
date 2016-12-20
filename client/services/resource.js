import requester from './requester';
import qs from 'qs';

export async function getInitialUserStatus() {
  let result = await requester('/api/status', {
    method: "POST"
  });
  return result;
}

export async function getInitialLogin() {
  let result = await requester('/api/loginInfo', {
    method: "POST"
  });
  return result;
}

export async function getTodos(obj) {
  return requester('/api/test', {
    method: "POST"
  });
}

export async function getUsers(obj) {
  return requester('/api/test', {
    method: "POST",
    body: JSON.stringify(obj)
  });
}