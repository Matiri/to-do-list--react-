import React, { useState, useEffect } from 'react';
import {TaskRow} from './components/TaskRow';
import {Banner} from './components/Banner';
import {TaskCreator} from './components/TaskCreator';
import {VisibilityControl} from './components/VisibilityControl';


function App() {
  // Estados
  // Estado para nombre de usuario
  const [userName, setUserName] = useState('an actual dumpster fire');
  // Estado para items, tareas
  const [taskItem, setTaskItem] = useState([
    {name: 'Task One', done: false},
    {name: 'Task Two', done: false},
    {name: 'Task Three', done: true},
    {name: 'Task Four', done: false},
  ])
  // 
  const [showCompleted, setShowCompleted] = useState(true);

  // Cuando se ejecuta el programa, revisar almacenamiento local por datos de nombre de usuario y tareas
  // Si no hay datos, despliega los datos establecidos aquí
  useEffect(() => {
    let data = localStorage.getItem('tasks');
    if (data != null){
      setTaskItem(JSON.parse(data));
    } else {
      setUserName('The Trash Man');
      setTaskItem([
        {name: 'Task One Example', done: false},
        {name: 'Task Two Example', done: false},
        {name: 'Task Three Example', done: true},
        {name: 'Task Four Example', done: false},
      ])
      setShowCompleted(true)
    }
  }, []);

  // Cada vez que cambie taskItems, guardarlo en almacenamiento local
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskItem));
  }, [taskItem])

  // Función que renderiza tareas ingresadas por el input
  // Compara la tarea recibida con las que ya están el la lista
  // Si no hay coincidencia, la tarea recibida se renderiza
  // De este modo se impide el ingreso de tareas repetidas  
  const createNewTask = taskName => {
      if(!taskItem.find(t => t.name === taskName)) {
        setTaskItem([...taskItem, {name: taskName, done: false}])
      }
    
  }

  /* Función que recorre la lista de tareas cuando se clickea un checkbox y
  cambia el valor del done de la tarea con la que coincide el check box */
  const toggleTask = (task) => {
    setTaskItem(taskItem.map(t => (t.name === task.name ? {...t, done: !t.done} : t)))
  } 

  /* Función que que recorre la lista de items establecida arriba 
    y la retorna en pantalla */
  const taskTableRows = (doneValue) => (
    taskItem
    .filter(task => task.done === doneValue)
    .map(task => (
      <TaskRow 
        task = {task}
        key = {task.name} 
        toggleTask = {toggleTask} 
      />
    ))
  )

  return (
    <div>
      <Banner
        userName = {userName}
        taskItem = {taskItem}
      />

      <TaskCreator 
        callback = {createNewTask}
      />

      <table className = 'table table-striped table-border'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          {taskTableRows(false)}
        </tbody>
      </table>

      <div className = 'bg-secondary-text-white text-center p-2'>
        <VisibilityControl 
          description = 'Completed Task'
          isChecked = {showCompleted}
          callback = {checked => setShowCompleted(checked)}
        />
      </div>

      {
        // Lista de tareas marcadas como completadas
        showCompleted && (
          <table className = 'table table-sriped table.bordered'>
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
              {taskTableRows(true)}
            </tbody>
          </table>
        )
      }
    </div>
  );
}

export default App;
