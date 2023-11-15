import logo from './logo.svg';
import './App.css';
import app from './firebaseConfig.js';
import { getFirestore, collection, addDoc} from "firebase/firestore";
import React, { useState } from 'react';

function App() {
  const [uporabnik, setUporabnik] = useState('');
  const [prihod, setPrihod] = useState('');
  const [odhod, setOdhod] = useState('');
  const db = getFirestore(app);

  const addDataToFirestore = async (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const formattedDate = currentDate.getDate() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getFullYear();
    try {
      await addDoc(collection(db, "test"), {
        uporabnik: uporabnik,
        prihod: prihod,
        odhod: odhod,
        datum: formattedDate 
      });
      console.log("Nov dokument uspešno dodan!");
      setUporabnik('');
      setPrihod('');
      setOdhod('');
    } catch (error) {
      console.error("Napaka pri dodajanju dokumenta: ", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* ... */}
        <form onSubmit={addDataToFirestore}>
          <input 
            type="text" 
            value={uporabnik} 
            onChange={(e) => setUporabnik(e.target.value)} 
            placeholder="Uporabnik" 
          />
          <input 
            type="text" 
            value={prihod} 
            onChange={(e) => setPrihod(e.target.value)} 
            placeholder="Čas prihoda" 
          />
          <input 
            type="text" 
            value={odhod} 
            onChange={(e) => setOdhod(e.target.value)} 
            placeholder="Čas odhoda" 
          />
          <button type="submit">Dodaj podatke</button>
        </form>
        {/* ... */}
      </header>
    </div>
  );
}

export default App;

