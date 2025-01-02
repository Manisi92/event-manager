// RegisterParticipant.js (Front-end)
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Per reindirizzare dopo la registrazione
import '../styles/App.css';

function RegisterParticipant({ eventId }) {
  const [name, setName] = useState(''); // Stato per il nome
  const [email, setEmail] = useState(''); // Stato per l'email
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Preveniamo il comportamento predefinito di submit

    try {
      const participant = { name, email };

      // Invia la richiesta POST al back-end per registrare il partecipante
      await axios.post(`http://localhost:5000/api/events/${eventId}/participants`, participant);

      // Dopo la registrazione, reindirizza alla pagina degli eventi
      navigate('/search-events');
    } catch (error) {
      console.error('Error registering participant:', error);
    }
  };

  return (
    <div>
      <h2>Register for Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)} // Gestisce il cambiamento del nome
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Gestisce il cambiamento dell'email
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterParticipant;
