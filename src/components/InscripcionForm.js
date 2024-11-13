// src/components/InscripcionForm.js
import React, { useState } from 'react';
import axios from 'axios';

const InscripcionForm = ({ tallerId, talleres, onInscribir }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [taller, setTaller] = useState(talleres.find(t => t.id === tallerId));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !apellido || !tallerId) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      //const response = await axios.post('https://inscripcion-talleres.vercel.app/api/inscribir-alumno', {
        const response = await axios.post('http://localhost:3000/api/inscribir-alumno', {
        nombre,
        apellido,
        taller_id: tallerId,
      });
      alert(`Alumno inscrito: ${response.data.nombre}`);
      onInscribir(); // Llamar a la función que deselecciona el taller
    } catch (error) {
      alert('Error al inscribir al alumno');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Inscripción a {taller?.nombre}</h3>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="text"
        placeholder="Apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
      />
      <button type="submit">Inscribir</button>
    </form>
  );
};

export default InscripcionForm;
