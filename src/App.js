// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TallerCard from './components/TallerCard';
import InscripcionForm from './components/InscripcionForm';

import './styles.css';


const App = () => {
  const [talleres, setTalleres] = useState([]);
  const [tallerSeleccionado, setTallerSeleccionado] = useState(null);

  useEffect(() => {
    // Obtener los talleres del backend
    axios.get('https://inscripcion-talleres.vercel.app/api/talleres')
      .then((response) => setTalleres(response.data))
      .catch((error) => console.error('Error al obtener talleres:', error));
  }, []);

  const handleSeleccionarTaller = (tallerId) => {
    setTallerSeleccionado(tallerId);
  };

  const handleInscripcionExitosa = () => {
    // Resetear la selección después de la inscripción exitosa
    setTallerSeleccionado(null);
  };

  return (
    <div className="App">
      <h1>Inscripción a Talleres</h1>
      
      {tallerSeleccionado ? (
        // Si hay un taller seleccionado, mostrar el formulario de inscripción
        <InscripcionForm 
          tallerId={tallerSeleccionado} 
          talleres={talleres} 
          onInscribir={handleInscripcionExitosa}
        />
      ) : (
        // Si no hay un taller seleccionado, mostrar las tarjetas de los talleres
        <div className="talleres-list">
          {talleres.map((taller) => (
            <TallerCard 
              key={taller.id} 
              taller={taller} 
              onSelect={handleSeleccionarTaller} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
