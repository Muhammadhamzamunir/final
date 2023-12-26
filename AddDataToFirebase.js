// importData.js
import { getFirestore, collection, addDoc } from '@react-native-firebase/firestore';
import Papa from 'papaparse';
import firebaseConfig from './firebase';

const db = getFirestore(firebaseConfig);

const csvFilePath = 'hamza.csv';

const parseCSVAndAddToFirestore = async () => {
  // Fetch your CSV file and parse it
  const response = await fetch(csvFilePath);
  const text = await response.text();

  Papa.parse(text, {
    header: true,
    complete: async (result) => {
      const records = result.data;

      records.forEach(async (record) => {
        try {
          await addRecordToFirestore(record);
        } catch (error) {
          console.error('Error adding record to Firestore:', error);
        }
      });
    },
  });
};

const addRecordToFirestore = async (record) => {
  const collectionRef = collection(db, 'final');

  // Create a new document from the record
  await addDoc(collectionRef, { ...record });
};

parseCSVAndAddToFirestore();
