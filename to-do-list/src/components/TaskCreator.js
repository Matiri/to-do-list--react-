import React, { useState } from 'react';

// Función que crea nuevas tareas
export const TaskCreator = props => {
  // Estado para guardar ingresos del usuario al input
  const [newTaskName, setNewTaskName] = useState('');

  // Función que actualiza el nombre de la nueva tarea con cada ingreso del usuario
  const updateNewTaskValue = e => setNewTaskName(e.target.value);

  // Función que recibe tareas ingresadas y luego borra el contenido del input
  // Si el input está vacío, recibirá nada
  const createNewTask = () => {
    if(newTaskName !== ''){
      props.callback(newTaskName);
      setNewTaskName('');
    }
  }

  return(
    <div className = 'my-1'>
      <input 
        required
        type = 'text'
        className = 'form-control'
        value = {newTaskName}
        onChange = {updateNewTaskValue}
      />
      <button className = 'btn btn-primary mt-1' onClick = {createNewTask}>
        Add
      </button>
    </div>
  )
}
