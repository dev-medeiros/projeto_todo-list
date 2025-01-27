import React from 'react';
import AddTask from '../components/AddTask';
import TaskList from '../components/TaskList';
import useLocalStorage from '../hooks/useLocalStorage';
import { Task } from '../types';

const Home: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const editTask = (id: string, newText: string, newQuantity: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, text: newText, quantity: newQuantity } : task
    ));
  };

  const incrementTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, quantity: task.quantity + 1 } : task
    ));
  };

  const decrementTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id && task.quantity > 1 ? { ...task, quantity: task.quantity - 1 } : task
    ));
  };

  return (
    <div className="home">
      <h1>Professional To-Do List</h1>
      <AddTask addTask={addTask} />
      <TaskList 
        tasks={tasks} 
        deleteTask={deleteTask} 
        toggleTaskCompletion={toggleTaskCompletion} 
        editTask={editTask}
        incrementTask={incrementTask}
        decrementTask={decrementTask}
      />
    </div>
  );
};

export default Home;