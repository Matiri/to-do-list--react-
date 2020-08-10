import React from 'react';

// Función que crea líneas con la tarea y el check box que lo marca como hecho
export const TaskRow = props => (
    <tr key = {props.task.name}>
      <td>{props.task.name}</td>
      <td>
        <input 
          type="checkbox" 
          checked = {props.task.done} 
          onChange = {() => props.toggleTask(props.task)}
        />
      </td>
    </tr>
);

