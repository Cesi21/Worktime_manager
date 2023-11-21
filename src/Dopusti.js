import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, setDoc, getDocs } from 'firebase/firestore';
import app from './firebaseConfig';
import './Calendar.css';

function Calendar() {
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
          data[doc.id] = doc.data().text; // Assume 'text' is the key for the data
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
    const calendarDays = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const paddedMonth = selectedMonth.toString().padStart(2, '0');
      const paddedDay = i.toString().padStart(2, '0');
      const dateKey = `${selectedYear}-${paddedMonth}-${paddedDay}`;
      const savedText = calendarData[dateKey] || '';

      calendarDays.push(
        <div key={i} className="calendar-day">
          <div className="date">{i}</div> {/* Datum prikazan na vrhu */}
          <textarea
            className="text-input"
            value={savedText}
            onChange={(e) => handleInputChange(dateKey, e)}
            onBlur={() => saveDataToFirestore(dateKey)}
            placeholder=""
          />
        </div>
      );
    }

    return (
      <div className="calendar-grid">
        {calendarDays}
      </div>
    );
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
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      {generateCalendar()}
    </div>
  );
}

export default Calendar;
