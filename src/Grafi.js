import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from './firebaseConfig'; // Predpostavimo, da imate ta konfiguracijski file

const GrafView = () => {
  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState({ labels: [], datasets: [] });
  const [selectedDay, setSelectedDay] = useState('');
  const db = getFirestore(app);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "test"));
      const dataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(dataList);
    };

    fetchData();
  }, [db]); // Dodajte db v odvisnosti, če se spreminja

  const prepareGraphData = (data, day) => {
    const filteredData = data.filter(item => {
      const itemDay = item.datum.split('-')[0]; // Format 'dan-mesec-leto'
      return itemDay === day;
    });

    let labels = filteredData.map(item => item.uporabnik);
    let workHours = [];
    let overtimeHours = [];

    filteredData.forEach(item => {
      const prihodHours = parseFloat(item.prihod.split(':')[0]);
      const odhodHours = parseFloat(item.odhod.split(':')[0]);
      const delovneUre = odhodHours - prihodHours;
      const nadure = delovneUre > 8 ? delovneUre - 8 : 0;

      workHours.push(delovneUre);
      overtimeHours.push(nadure);
    });

    setGraphData({
      labels,
      datasets: [
        {
          label: 'Delovne ure',
          data: workHours,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
        {
          label: 'Nadure',
          data: overtimeHours,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        }
      ]
    });
  };

  return (
    <div>
      <input 
        type="number" 
        value={selectedDay} 
        min="1" 
        max="31" 
        onChange={(e) => setSelectedDay(e.target.value)} 
        placeholder="Dan v mesecu" 
      />
      <button onClick={() => prepareGraphData(data, selectedDay)}>Izračunaj ure</button>
      <Line data={graphData} />
    </div>
  );
};

export default GrafView;