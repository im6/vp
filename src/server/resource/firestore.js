import { Firestore } from '@google-cloud/firestore';
import redis from './redis';

const cacheColorKey = 'cacheColorKey';
const firestore = new Firestore();

const set = (key, value, ttl) =>
  new Promise((resolve, reject) => {
    redis.set(
      key,
      {
        EX: ttl,
        NX: true,
      },
      (err) => {
        err ? reject() : resolve();
      }
    );
  });

const get = (key) =>
  new Promise((resolve, reject) => {
    redis.get(key, (err, res) => {
      if (err) {
        reject();
      } else {
        resolve(res);
      }
    });
  });

export const getAllColors = async () => {
  // const snapshot = await firestore.collection('colors').get();
  await set('test', 'value', 10);
  const b = await get('test');
  return b;
};
