// src/pages/TodoPage.js
import { useState, useEffect } from 'react';
import api from '../services/api'; // Importamos la instancia de axios con autenticación

function TodoPage() {
  const [tasks, setTasks] = useState([]); // Lista de tareas
  const [newTask, setNewTask] = useState(''); // Nueva tarea que el usuario desea añadir
  const [editingTask, setEditingTask] = useState(null); // Tarea que está siendo editada
  const [editingText, setEditingText] = useState(''); // Texto de la tarea en edición

  // Cargar las tareas al montar el componente
  useEffect(() => {
    fetchTasks();
  }, []);

  // Función para obtener las tareas desde el backend
  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error al cargar las tareas:', error);
    }
  };

  // Función para añadir una nueva tarea
  const handleAddTask = async () => {
    if (!newTask.trim()) return;

    try {
      const response = await api.post('/tasks', { text: newTask });
      setTasks([...tasks, response.data]); // Agregar la nueva tarea a la lista
      setNewTask(''); // Limpiar el campo de entrada
    } catch (error) {
      console.error('Error al añadir la tarea:', error);
    }
  };

  // Función para eliminar una tarea
  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id)); // Filtrar la tarea eliminada de la lista
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  // Función para habilitar el modo de edición para una tarea
  const handleEditTask = (task) => {
    setEditingTask(task);
    setEditingText(task.text);
  };

  // Función para guardar los cambios en una tarea editada
  const handleSaveTask = async () => {
    try {
      const response = await api.put(`/tasks/${editingTask._id}`, { text: editingText });
      setTasks(tasks.map((task) => (task._id === editingTask._id ? response.data : task)));
      setEditingTask(null);
      setEditingText('');
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
    }
  };

  return (
    <div>
      <h1>Lista de Tareas</h1>
      <div>
        <input
          type="text"
          placeholder="Nueva tarea"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Añadir</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {editingTask && editingTask._id === task._id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={handleSaveTask}>Guardar</button>
                <button onClick={() => setEditingTask(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <span>{task.text}</span>
                <button onClick={() => handleEditTask(task)}>Editar</button>
                <button onClick={() => handleDeleteTask(task._id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoPage;
