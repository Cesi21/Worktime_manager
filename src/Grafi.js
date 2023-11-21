import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from './firebaseConfig';

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
  }, [db]);

  const prepareGraphData = (data) => {
    const filteredData = selectedDay 
      ? data.filter(item => item.datum.startsWith(selectedDay.padStart(2, '0')))
      : data;

    let labels = filteredData.map(item => item.uporabnik);
    let workHours = [];
    let overtimeHours = [];

    filteredData.forEach(item => {
      const prihodHours = parseFloat(item.prihod);
      const odhodHours = parseFloat(item.odhod);
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

  const downloadCsv = () => {
    const csvRows = [
      ['Uporabnik', 'Prihod', 'Odhod', 'Datum'], // Header row
    ];

    // Add data rows
    data.forEach(item => {
      csvRows.push([item.uporabnik, item.prihod, item.odhod, item.datum]);
    });

    // Convert to CSV string
    const csvContent = csvRows.map(e => e.join(",")).join("\n");

    // Create a Blob from the CSV String
    const blob = new Blob([csvContent], { type: 'text/csv' });

    // Create a link element
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');

    // Set link's href to point to the Blob URL
    a.href = url;
    a.download = 'podatki.csv';
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <input 
        type="text" 
        value={selectedDay} 
        onChange={(e) => setSelectedDay(e.target.value)} 
        placeholder="Vnesi dan (dd)" 
      />
      <button onClick={() => prepareGraphData(data)}>Izračunaj ure</button>
      <button onClick={downloadCsv}>Prenesi CSV</button>
      <Line data={graphData} />
    </div>
  );
};

export default GrafView;
