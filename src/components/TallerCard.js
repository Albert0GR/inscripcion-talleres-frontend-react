// src/components/TallerCard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TallerCard = ({ taller, onSelect }) => {
  const [mostrarAlumnos, setMostrarAlumnos] = useState(false);
  const [alumnos, setAlumnos] = useState([]);
  const [alumnosFiltrados, setAlumnosFiltrados] = useState([]);

  useEffect(() => {
    // Obtener todos los alumnos cuando el componente se monta
    const fetchAlumnos = async () => {
      try {
        const response = await axios.get('https://inscripcion-talleres.vercel.app/api/talleres')
        //const response = await axios.get('http://localhost:3000/api/alumnos');
        setAlumnos(response.data);
      } catch (error) {
        console.error('Error al obtener alumnos:', error);
        alert('No se pudieron cargar los alumnos.');
      }
    };

    fetchAlumnos();
  }, []); // Se ejecuta solo una vez al montar el componente

  const manejarClickAlumnos = async () => {
    const password = prompt("Introduce la contraseña para ver los alumnos inscritos:");

    if (password === '1234') {
      // Filtrar los alumnos para el taller actual
      const alumnosFiltrados = alumnos.filter(alumno => alumno.taller === taller.nombre);
      setAlumnosFiltrados(alumnosFiltrados);
      setMostrarAlumnos(true);
    } else {
      alert("Contraseña incorrecta.");
    }
  };

  return (
    <div className="taller-card" onClick={() => onSelect(taller.id)}>
      <h2>{taller.nombre}</h2>
      <h3>{taller.descripcion}</h3>
      <img src={taller.imagen} alt={`Imagen de ${taller.nombre}`} className="taller-imagen" />
      <p>Inscritos: {taller.inscritos}/{taller.cupo_maximo}</p>
      <button onClick={(e) => { e.stopPropagation(); manejarClickAlumnos(); }}>
        Ver Alumnos Inscritos
      </button>

      {mostrarAlumnos && (
        <div className="lista-alumnos">
          <h4>Alumnos Inscritos:</h4>
          <ul>
            {alumnosFiltrados.map(alumno => (
              <li key={alumno.id}>{alumno.nombre} {alumno.apellido}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TallerCard;
