const firebase = require('firebase');

const firebaseConfig = {
  apiKey: 'AIzaSyDnLYTzmVjY79Xb1krSAq_ihruPOLCXMjc',
  authDomain: 'whatsapp-a0777.firebaseapp.com',
  databaseURL: 'https://whatsapp-a0777.firebaseio.com',
  projectId: 'whatsapp-a0777',
  storageBucket: 'whatsapp-a0777.appspot.com',
  messagingSenderId: '230516594534',
  appId: '1:230516594534:web:558d4312040d2e21455aa7',
  measurementId: 'G-MD707KG8JZ',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
