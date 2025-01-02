import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchEvents from './components/SearchEvents';
import EditEvent from './components/EditEvent';
import RegisterParticipant from './components/RegisterParticipant';
import { useTranslation } from 'react-i18next';
import './i18n';  // Importa la configurazione di i18next
import './styles/App.css';

function App() {
  const { t, i18n } = useTranslation();

  // Funzione per cambiare lingua
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // Cambia la lingua tra 'en' (inglese) e 'it' (italiano)
  };

  return (
    <Router>
      <div>
        {/* Bottoni per cambiare lingua */}
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('it')}>Italiano</button>

        {/* Titolo della pagina */}
        <h1>{t('home')}</h1> {/* La chiave 'home' verrà tradotta in base alla lingua selezionata */}

        {/* Configurazione del routing */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search-events" element={<SearchEvents />} />
          <Route path="/edit-event/:id" element={<EditEvent />} />
          <Route path="/register/:id" element={<RegisterParticipant />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;