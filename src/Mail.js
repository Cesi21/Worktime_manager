import React, { useState } from 'react';

import './App.css';

const MailView = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Tukaj bi implementirali logiko za pošiljanje e-pošte
    console.log('Sending email:', { email, subject, body });
    
    // Resetiranje obrazca
    setEmail('');
    setSubject('');
    setBody('');
  };

  return (
    <div>
      <h2>Pošlji e-pošto vodstvu</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-pošta vodstva:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="subject">Zadeva:</label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="body">Telo Sporočila:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <button type="submit">Pošlji</button>
      </form>
    </div>
  );
  };
export default MailView;
