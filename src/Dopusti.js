import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, setDoc, query, where, getDocs } from 'firebase/firestore';
import './Calendar.css'; // Import your CSS file for calendar styling

function Calendar({ app }) {
  const [calendarData, setCalendarData] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const db = getFirestore(app);

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const calendarRef = collection(db, 'calendarData');
        const calendarSnapshot = await getDocs(calendarRef);
        let data = {};

        calendarSnapshot.forEach((doc) => {
          data = { ...data, [doc.id]: doc.data() };
        });

        setCalendarData(data);
      } catch (error) {
        console.error('Error fetching calendar data: ', error);
      }
    };

    fetchCalendarData();
  }, [db]);

  const handleInputChange = (date, event) => {
    const newData = { ...calendarData };
    newData[date] = event.target.value;
    setCalendarData(newData);
  };

  const saveDataToFirestore = async (date) => {
    try {
      const calendarRef = doc(db, 'calendarData', date);
      await setDoc(calendarRef, { text: calendarData[date] });
      console.log(`Text for ${date} saved successfully!`);
    } catch (error) {
      console.error('Error saving data: ', error);
    }
  };

  const generateCalendar = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const firstDayIndex = new Date(selectedYear, selectedMonth - 1, 1).getDay();
    const calendarDays = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const date = `${selectedYear}-${selectedMonth}-${i}`;
      const savedText = calendarData[date] || '';

      calendarDays.push(
        <div key={i} className="calendar-day">
          <span className="date">{i}</span>
          <textarea
            className="text-input"
            value={savedText}
            onChange={(e) => handleInputChange(date, e)}
            onBlur={() => saveDataToFirestore(date)}
            placeholder="Enter text..."
          />
        </div>
      );
    }

    const rows = [];
    let row1 = [], row2 = [], row3 = [];

    for (let i = 0; i < calendarDays.length; i++) {
      if (i < 10) {
        row1.push(calendarDays[i]);
      } else if (i >= 10 && i < 20) {
        row2.push(calendarDays[i]);
      } else {
        row3.push(calendarDays[i]);
      }
    }

    rows.push(row1, row2, row3);

    return rows.map((row, index) => (
      <div key={index} className="calendar-row">{row}</div>
    ));
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = [];
  for (let year = 1970; year <= 2050; year++) {
    years.push(year);
  }

  return (
    <div className="calendar-container">
      <h2>Dopusti</h2>
      <div className="calendar-options">
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value))}>
          {months.map((month, index) => (
            <option key={index} value={index + 1}>{month}</option>
          ))}
        </select>
        <select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
          {years.map((year, index) => (
            <option key={index} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div className="calendar-grid">{generateCalendar()}</div>
    </div>
  );
}

export default Calendar;
