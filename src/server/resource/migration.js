import { Firestore } from '@google-cloud/firestore';
import sqlExecOne from './mysqlConnection';

const firestore = new Firestore();

async function copyUsers() {
  const userData = await sqlExecOne(`SELECT * FROM colorpk_user`);
  const userCollection = firestore.collection('users');
  const writeBatch = firestore.batch();
  userData.forEach((v) => {
    const newObj = {
      oAuth: v.oauth,
      oAuthId: v.oauth_id,
      name: v.name,
      lastLogin: v.last_login,
    };
    if (v.is_admin) {
      newObj.admin = true;
    }
    writeBatch.create(userCollection.doc(), newObj);
  });

  writeBatch.commit().then(() => {
    console.log('Successfully copy users');
  });
}

async function copyColors() {
  const userData = await sqlExecOne(`SELECT * FROM colorpk_color`);
  const colorCollection = firestore.collection('colors');
  const writeBatch = firestore.batch();
  userData.forEach((v) => {
    const newObj = {
      star: v.star,
      v: v.color.split('#'),
      created: v.created_date,
    };
    if (v.display === 1) {
      newObj.hidden = true;
    }

    writeBatch.create(colorCollection.doc(), newObj);
  });

  writeBatch.commit().then(() => {
    console.log('Successfully copy colors');
  });
}

copyUsers();
copyColors();
