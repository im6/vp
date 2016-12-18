import requester from './requester';
import fetchPromise from './requester';
import qs from 'qs';

export async function getInitialStatus() {
  let result = await fetchPromise('/api/status', {
    method: "POST"
  });

  return result;
}

export async function getTodos(obj) {
  return await fetchPromise('/api/test', {
    method: "POST"
  });
}

export async function getUsers(obj) {
  return requester('/users', {
    method: "POST",
    body: JSON.stringify(obj)
  });
}