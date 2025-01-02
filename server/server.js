const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const Event = require('./models/Event');
const jwt = require('jsonwebtoken');

dotenv.config(); // Carica le variabili d'ambiente da un file .env

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // Middleware per parsare il corpo delle richieste in JSON

app.get('/', (req, res) => {
    res.send('Hello from the back-end server!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Registrazione utente
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = new User({ email, password });
      await user.save();
      res.status(201).send('User registered');
    } catch (err) {
      res.status(400).send('Error registering user');
    }
  });

// Login utente
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });

// Creazione evento
app.post('/api/events', async (req, res) => {
    const { title, description, date, location, languages } = req.body;
    const event = new Event({
      title,
      description,
      date,
      location,
      languages,
      creator: req.user._id, // Assicurati che l'utente sia autenticato
    });
  
    try {
      await event.save();
      res.status(201).json(event);
    } catch (err) {
      res.status(400).json({ message: 'Error creating event', error: err });
    }
  });
  
  // Recupero eventi
  app.get('/api/events', async (req, res) => {
    try {
      const events = await Event.find().populate('creator', 'email');
      res.json(events);
    } catch (err) {
      res.status(400).json({ message: 'Error fetching events', error: err });
    }
  });

  const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Estrarre token dalla richiesta
    if (!token) return res.status(401).send('No token provided');
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).send('Invalid token');
      req.user = decoded; // Aggiunge l'utente al corpo della richiesta
      next();
    });
  };
  
  // Applicare l'autenticazione per creare eventi
  app.post('/api/events', authenticate, async (req, res) => {
    // La logica di creazione evento va qui
  });

// Rotta per la ricerca degli eventi
app.get('/api/events', async (req, res) => {
    try {
      const { title, date, location } = req.query;  // Estraiamo i parametri di ricerca dalla query string
      
      // Costruiamo il filtro dinamicamente in base ai parametri passati
      const filter = {};
      if (title) filter.title = { $regex: title, $options: 'i' };  // Cerca il titolo
      if (date) filter.date = { $gte: new Date(date) };  // Filtra per data (maggiore o uguale alla data specificata)
      if (location) filter.location = { $regex: location, $options: 'i' };  // Cerca la posizione
  
      const events = await Event.find(filter).populate('creator', 'email');
      res.json(events);
    } catch (err) {
      res.status(400).json({ message: 'Error fetching events', error: err });
    }
  });

// Modifica evento
app.put('/api/events/:id', async (req, res) => {
    try {
      const eventId = req.params.id;
      const { title, description, date, location } = req.body; // Estrai i dati dal corpo della richiesta
  
      // Trova e aggiorna l'evento nel database
      const updatedEvent = await Event.findByIdAndUpdate(eventId, {
        title,
        description,
        date,
        location
      }, { new: true });
  
      res.json(updatedEvent); // Restituisci l'evento aggiornato
    } catch (err) {
      res.status(400).json({ message: 'Error updating event', error: err });
    }
  });

// Cancellazione evento
app.delete('/api/events/:id', async (req, res) => {
    try {
      const eventId = req.params.id;
      const deletedEvent = await Event.findByIdAndDelete(eventId);
      if (!deletedEvent) {
        return res.status(404).json({ message: 'Event not found' });
      }
      res.json({ message: 'Event deleted successfully' });
    } catch (err) {
      res.status(400).json({ message: 'Error deleting event', error: err });
    }
  });

// routes.js o eventRoutes.js
app.post('/api/events/:id/participants', async (req, res) => {
    try {
      const eventId = req.params.id; // Ottieni l'ID dell'evento
      const { name, email } = req.body; // Ottieni i dati del partecipante
  
      // Trova l'evento nel database
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      // Aggiungi il partecipante all'evento
      event.participants.push({ name, email });
      await event.save(); // Salva l'evento aggiornato
  
      res.json(event); // Rispondi con l'evento aggiornato
    } catch (err) {
      res.status(400).json({ message: 'Error registering participant', error: err });
    }
  });