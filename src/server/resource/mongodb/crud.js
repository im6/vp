/* eslint-disable no-underscore-dangle */
import { ObjectId } from 'mongodb';
import { clientConn } from './connection';

// color collection
export const getColorList = async (category) => {
  const colorCollection = clientConn.db('colorpk').collection('colors');
  let res = [];
  switch (category) {
    case 'PUBLIC':
      res = await colorCollection
        .find({
          hidden: false,
        })
        .sort({ createdDate: -1 })
        .toArray();
      break;
    case 'ANONYMOUS':
      res = await await colorCollection
        .find({
          hidden: true,
        })
        .toArray();
      break;
    default:
      break;
  }

  return res.map((v) => ({
    id: v._id,
    star: v.star,
    color: v.color,
    userId: v.createdBy,
    createdDate: v.createdDate,
  }));
};

export const getColorsByUser = async (userId) => {
  const colorCollection = clientConn.db('colorpk').collection('colors');
  const res = await colorCollection
    .find({ createdBy: new ObjectId(userId) })
    .toArray();
  return res.map((v) => v._id);
};

export const createColorDocument = async (newObj, userId) => {
  const colorCollection = clientConn.db('colorpk').collection('colors');
  const payload = { ...newObj };
  if (userId) {
    payload.createdBy = new ObjectId(userId);
  }
  const createRes = await colorCollection.insertOne(payload);
  return createRes.insertedId;
};

export const flipColorVisibility = async (id) => {
  const colorCollection = clientConn.db('colorpk').collection('colors');
  const res = await colorCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { hidden: false } }
  );
  return res.modifiedCount === 1 ? 0 : 1;
};

export const incrementColorStar = async (id) => {
  const colorCollection = clientConn.db('colorpk').collection('colors');
  const updateRes = await colorCollection.updateOne(
    { _id: new ObjectId(id) },
    { $inc: { star: 1 } }
  );
  return updateRes.modifiedCount === 1 ? 0 : 1;
};

export const deleteColor = async (id) => {
  const colorCollection = clientConn.db('colorpk').collection('colors');
  const res = await colorCollection.deleteOne({ _id: new ObjectId(id) });
  return res.deletedCount === 1 ? 0 : 1;
};

// user collection
export const checkUser = async (oAuthType, oAuthId) => {
  const userCollection = clientConn.db('colorpk').collection('users');
  const optionalUser = await userCollection.findOne({
    oAuthId,
    oAuthType,
  });
  return optionalUser
    ? {
        isAdmin: optionalUser.isAdmin,
        userId: optionalUser._id.toString(),
      }
    : null;
};
export const createUser = async (newObject) => {
  const userCollection = clientConn.db('colorpk').collection('users');
  const res = await userCollection.insertOne(newObject);
  return res.insertedId;
};
export const updateUserLoginDate = async (userId) => {
  const userCollection = clientConn.db('colorpk').collection('users');
  await userCollection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { lastLogin: new Date() } }
  );
};

// userSave collection
export const getUserSaveColorList = async (userId) => {
  const userSaveCollection = clientConn.db('colorpk').collection('userSave');
  const res = await userSaveCollection
    .find({ user: new ObjectId(userId) })
    .toArray();
  return res.map((v) => v.color);
};
export const upsertUserSaveColor = async (userId, colorId) => {
  const userSaveCollection = clientConn.db('colorpk').collection('userSave');
  const filterObj = {
    user: new ObjectId(userId),
    color: new ObjectId(colorId),
  };
  const res = await userSaveCollection.updateOne(
    filterObj,
    {
      $setOnInsert: filterObj,
    },
    { upsert: true }
  );
  return res;
};

export const deleteUserSaveColor = async (userId, colorId) => {
  const userSaveCollection = clientConn.db('colorpk').collection('userSave');
  const filterObj = {
    user: new ObjectId(userId),
    color: new ObjectId(colorId),
  };
  const res = await userSaveCollection.deleteOne(filterObj);
  return res;
};

export const deleteColorFromUserSave = async (colorId) => {
  const userSaveCollection = clientConn.db('colorpk').collection('userSave');
  const filterObj = {
    color: new ObjectId(colorId),
  };
  const res = await userSaveCollection.deleteMany(filterObj);
  return res;
};
