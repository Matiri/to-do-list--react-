import React from 'react';

// Función que establece la cabecera de la aplicación
// El nombre de usuario y número de tareas por hacer que va a indicar será establecido en App.js
// Este último es la lóngitud del array taskItem
export const Banner = props => (
  <h4 className = 'bg-primary text-white text-center p-4'>
    {props.userName}'s Task App ({props.taskItem.filter(t => !t.done).length} task to do)'
  </h4>
)

