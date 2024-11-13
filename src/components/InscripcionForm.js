// src/components/InscripcionForm.js
import React, { useState } from 'react';
import axios from 'axios';

const InscripcionForm = ({ tallerId, talleres, onInscribir }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [grado, setGrado] = useState(''); // Estado para el grado
  const [taller, setTaller] = useState(talleres.find(t => t.id === tallerId));

  // Función para filtrar solo letras mayúsculas
  const handleNombreChange = (e) => {
    const valor = e.target.value.toUpperCase().replace(/[^A-ZÁÉÍÓÚÑ\s]/g, ''); // Solo letras y espacios
    setNombre(valor);
  };

  const handleApellidoChange = (e) => {
    const valor = e.target.value.toUpperCase().replace(/[^A-ZÁÉÍÓÚÑ\s]/g, ''); // Solo letras y espacios
    setApellido(valor);
  };

  // Función para manejar el cambio de grado
  const handleGradoChange = (e) => {
    setGrado(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !apellido || !grado || !tallerId) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      // Enviar los datos, incluyendo el grado
      const response = await axios.post('https://inscripcion-talleres.vercel.app/api/inscribir-alumno', {
      //const response = await axios.post('http://localhost:3000/api/inscribir-alumno', {
        nombre,
        apellido,
        taller_id: tallerId,
        grado,
      });
      alert(`Alumno inscrito: ${response.data.nombre}`);
      onInscribir(); // Llamar a la función que deselecciona el taller
    }catch (error) {
      if (error.response) {
          // Muestra el mensaje de error enviado por la API
          alert(`Error al inscribir al alumno: ${error.response.data.message || 'Error desconocido'}`); // MUESTRA MENSAJE DE LA API
      } else {
          // Muestra un mensaje de error genérico
          alert('Error al inscribir al alumno');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}  className="inscripcion-form">
      <h3>Inscripción a {taller?.nombre}</h3>
      
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={handleNombreChange}
      />
      
      <input
        type="text"
        placeholder="Apellido"
        value={apellido}
        onChange={handleApellidoChange}
      />
      
      {/* Lista seleccionable para el grado */}
      <select value={grado} onChange={handleGradoChange}>
        <option value="">Selecciona el grado</option>
        <option value="Preescolar">Preescolar</option>
        <option value="Primaria">Primaria</option>
        <option value="Secundaria">Secundaria</option>
      </select>

      <button type="submit">Inscribir</button>
    </form>
  );
};

export default InscripcionForm;
