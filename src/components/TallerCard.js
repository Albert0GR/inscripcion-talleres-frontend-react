// src/components/TallerCard.js
import React from 'react';

const TallerCard = ({ taller, onSelect }) => {
  return (
    <div className="taller-card" onClick={() => onSelect(taller.id)}>
      <h2>{taller.nombre}</h2>
      <p>Inscritos: {taller.inscritos}/{taller.cupo_maximo}</p>
    </div>
  );
};

export default TallerCard;
