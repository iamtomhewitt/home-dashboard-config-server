import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child, update } from 'firebase/database';

const app = initializeApp({
  databaseURL: process.env.REACT_APP_FIREBASE,
});

const db = ref(getDatabase(app));

export const getData = async () => {
  const json = await get(child(db, '/')).then((x) => x.val());
  return json;
};

export const updateData = async ({ index, data }) => {
  update(child(db, `/${index}`), data);
};
