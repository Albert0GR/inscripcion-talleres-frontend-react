import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TallerCard = ({ taller, onSelect }) => {
  const [mostrarAlumnos, setMostrarAlumnos] = useState(false);
  const [alumnos, setAlumnos] = useState([]); // Todos los alumnos
  const [alumnosFiltrados, setAlumnosFiltrados] = useState([]); // Alumnos filtrados por el taller seleccionado

  useEffect(() => {
    // Obtener todos los alumnos cuando el componente se monta
    const fetchAlumnos = async () => {
      try {
        const response = await axios.get('https://inscripcion-talleres.vercel.app/api/alumnos');
        //const response = await axios.get('http://localhost:3000/api/alumnos'); // Suponiendo que tienes un endpoint para obtener todos los alumnos
        setAlumnos(response.data);
      } catch (error) {
        console.error('Error al obtener alumnos:', error);
        alert('No se pudieron cargar los alumnos.');
      }
    };

    fetchAlumnos();
  }, []); // Se ejecuta solo una vez al montar el componente

// Función para manejar el clic en "Ver Alumnos Inscritos"
  const manejarClickAlumnos = async () => {
    const password = prompt("Introduce la contraseña para ver los alumnos inscritos:");

    if (password === 'FK2024') {
       // Filtrar los alumnos para el taller actual (filtrado solo en el frontend)
      const alumnosFiltrados = alumnos.filter(alumno => alumno.taller === taller.nombre);
      setAlumnosFiltrados(alumnosFiltrados);
      setMostrarAlumnos(true);
    } else {
      alert("Contraseña incorrecta.");
    }
  };

  // Divide el texto de descripción en una lista por cada guion '-'
  const descripcionFormateada = taller.descripcion.split('-').map((item, index) => item.trim()).filter(Boolean);

  return (
    <div className="taller-card" onClick={() => onSelect(taller.id)}>
      <h2>{taller.nombre}</h2>
      <h3>Materiales:</h3>
      <ul>
        {descripcionFormateada.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h3>Responsable: {taller.encargado}</h3>
      <img src={taller.imagen} alt={`Imagen de ${taller.nombre}`} className="taller-imagen" />
      <p>Inscritos: {taller.inscritos}/{taller.cupo_maximo}</p>
      <button onClick={(e) => { e.stopPropagation(); manejarClickAlumnos(); }}>
        Ver Alumnos Inscritos
      </button>

      {mostrarAlumnos && (
        <div className="lista-alumnos">
          <h4>Alumnos Inscritos:</h4>
          <ul>
            {alumnosFiltrados.length > 0 ? (
              alumnosFiltrados.map(alumno => (
                <li key={alumno.id}>{alumno.nombre} {alumno.apellido} [{alumno.grado}]</li>
              ))
            ) : (
              <p>No hay alumnos inscritos en este taller.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TallerCard;
