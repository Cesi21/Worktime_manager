import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from './firebaseConfig';

const DataExView = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const db = getFirestore(app);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "test"));
      const dataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(dataList);
    };

    fetchData();
  }, [db]);

  const filteredData = data.filter(item => item.uporabnik.toLowerCase().includes(searchTerm.toLowerCase()));

  const exportToJson = () => {
    const jsonString = JSON.stringify(filteredData);
    download(jsonString, "data.json", "text/json");
  };

  const exportToCsv = () => {
    let csvString = "Uporabnik,Prihod,Odhod,Datum\n"; // Dodajte glave stolpcev
    filteredData.forEach(item => {
      csvString += `${item.uporabnik},${item.prihod},${item.odhod},${item.datum}\n`;
    });
    download(csvString, "data.csv", "text/csv");
  };

  const download = (content, fileName, contentType) => {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  };

  return (
    <div>
      <h2>Podatki iz Firestore</h2>
      <input 
        type="text" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        placeholder="Išči po uporabniku" 
      />
      <button onClick={exportToCsv}>Izvozi v CSV</button>
      <button onClick={exportToJson}>Izvozi v JSON</button>
      <table>
        <thead>
          <tr>
            <th>Uporabnik</th>
            <th>Prihod</th>
            <th>Odhod</th>
            <th>Datum</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.uporabnik}</td>
              <td>{item.prihod}</td>
              <td>{item.odhod}</td>
              <td>{item.datum}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataExView;
