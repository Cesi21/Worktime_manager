import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from './firebaseConfig';

const DopustiGrafView = () => {
  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState({ labels: [], datasets: [] });
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "calendarData"));
      const dataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(dataList);
    };

    fetchData();
  }, [db]);

  useEffect(() => {
    const processData = () => {
      const filteredData = data.filter(item => 
        new Date(item.id).getMonth() + 1 === selectedMonth
      );

      const employeeVacationDays = {};
      filteredData.forEach(item => {
        const date = new Date(item.id);
        const employee = item.text; // Predpostavimo, da je 'text' ime zaposlenega

        if (!employeeVacationDays[employee]) {
          employeeVacationDays[employee] = 0;
        }
        employeeVacationDays[employee]++;
      });

      setGraphData({
        labels: Object.keys(employeeVacationDays),
        datasets: [{
          label: 'Število dni dopusta',
          data: Object.values(employeeVacationDays),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        }],
      });
    };

    processData();
  }, [data, selectedMonth]);

  const months = [
    'Januar', 'Februar', 'Marec', 'April', 'Maj', 'Junij',
    'Julij', 'Avgust', 'September', 'Oktober', 'November', 'December'
  ];

  return (
    <div>
      <h2>Statistika dopustov</h2>
      <select value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value))}>
        {months.map((month, index) => (
          <option key={index} value={index + 1}>{month}</option>
        ))}
      </select>
      <Bar data={graphData} />
    </div>
  );
};

export default DopustiGrafView;
