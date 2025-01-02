const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  languages: { type: [String], default: ['en'] }, // Lingue supportate per la descrizione
  participants: [{ name: String, email: String }], // Aggiungi partecipanti come array
});

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;