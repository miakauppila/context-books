import firebase from '../config/firebaseConfig';

// the database for all requests
const db = firebase.firestore();

//fetch data from firestore
const getAll = async () => {
  // db call gets a snapshot
  const snapshot = await db.collection('books').get();
  // map and return an array
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(), // use spread to copy key-value pairs
  }));
};

const create = async (newBook) => {
  // add a new document with auto-generated id
  const response = await db.collection('books').add(newBook);
  return response.id;
};

const deleteBook = (id) => {
  const response = db.collection('books').doc(id).delete();
  return response;
};

export default {
  getAll,
  create,
  deleteBook
};