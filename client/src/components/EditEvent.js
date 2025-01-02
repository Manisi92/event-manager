import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';
import { useParams } from 'react-router-dom';

function EditEvent() {
  const { id } = useParams(); // Ottieni l'ID dell'evento dalla URL
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    // Ottieni i dettagli dell'evento per l'ID dato
    axios.get(`http://localhost:5000/api/events/${id}`)
      .then((response) => {
        const event = response.data;
        setTitle(event.title);
        setDescription(event.description);
        setDate(event.date);
        setLocation(event.location);
      })
      .catch((error) => console.error('Error fetching event:', error));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Invia i dati aggiornati al server
      const updatedEvent = {
        title,
        description,
        date,
        location,
      };

      const response = await axios.put(`http://localhost:5000/api/events/${id}`, updatedEvent);
      navigate('/search-events'); // Reindirizza alla pagina di ricerca dopo la modifica
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <div>
      <h1>Edit Event</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Update Event</button>
      </form>
    </div>
  );
}

export default EditEvent;