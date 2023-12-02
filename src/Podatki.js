import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from './firebaseConfig';

const DataTableView = () => {
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
  }, []);

  const calculateOvertime = () => {
    let totalOvertime = 0;
    filteredData.forEach(item => {
    const prihodHours = parseFloat(item.prihod.replace('.', ':').split(':')[0]);
    const odhodHours = parseFloat(item.odhod.replace('.', ':').split(':')[0]);
    const delovneUre = odhodHours - prihodHours;
    const nadure = delovneUre - 8;
      if (nadure > 0) {
        totalOvertime = totalOvertime+ nadure;
      }
      else if (nadure<0){
        totalOvertime = totalOvertime+ nadure;
      }
    });
    alert(`Skupno število nadur: ${totalOvertime}`);
  };

  const filteredData = data.filter(item => item.uporabnik.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <h2>Podatki iz Firestore</h2>
      <input 
        type="text" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        placeholder="Išči po uporabniku" 
      />
      <button onClick={calculateOvertime}>Nadure</button>
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

export default DataTableView;
