// useFirebaseData.js
import { useState, useEffect } from 'react';
import { ref, getDatabase, query, onValue, orderByKey, limitToFirst } from 'firebase/database';
import app from '../firebase/config';

const useFirebaseData = (path, limit = 50) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase(app);
        const dataRef = ref(db, path);
        const queryRef = query(dataRef, orderByKey(), limitToFirst(limit));

        onValue(queryRef, (snapshot) => {
          const rawData = snapshot.val();
          if (rawData) {
            const dataArray = Object.values(rawData);
            setData(dataArray);
            setFilteredData(dataArray);
          }
        });
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      }
    };

    fetchData();
  }, [path, limit]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = data.filter((item) =>
      item.Name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return { data: filteredData, searchQuery, handleSearch };
};

export default useFirebaseData;
