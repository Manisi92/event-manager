// SearchEvents.js (Front-end)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Link per il routing
import '../styles/App.css';

function SearchEvents() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [events, setEvents] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:5000/api/events', {
        params: { title, date, location }
      });
      setEvents(response.data);
    } catch (error) {
      console.error('Error searching events:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      setEvents(events.filter(event => event._id !== id)); // Rimuove l'evento dalla lista
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div>
      <h1>Search Events</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
        <button type="submit">Search</button>
      </form>

      <div>
        <h2>Results:</h2>
        {events.length > 0 ? (
          <ul>
            {events.map((event) => (
              <li key={event._id}>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p>{event.location}</p>
                <p>{new Date(event.date).toLocaleDateString()}</p>

                <Link to={`/edit-event/${event._id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(event._id)}>Delete</button>
                
                {/* Link per la registrazione */}
                <Link to={`/register/${event._id}`}>
                  <button>Register</button>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No events found</p>
        )}
      </div>
    </div>
  );
}

export default SearchEvents;