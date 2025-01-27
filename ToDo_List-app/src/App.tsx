import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import Filter from './components/Filter';
import Footer from './components/Footer';
import { Task } from './types';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [deletedTasks, setDeletedTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const storedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
    const storedDeletedTasks = JSON.parse(localStorage.getItem('deletedTasks') || '[]');
    setTasks(storedTasks);
    setCompletedTasks(storedCompletedTasks);
    setDeletedTasks(storedDeletedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks));
  }, [tasks, completedTasks, deletedTasks]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (id: string) => {
    const taskToDelete = tasks.find(task => task.id === id) || completedTasks.find(task => task.id === id);
    if (taskToDelete) {
      setDeletedTasks([...deletedTasks, taskToDelete]);
      setTasks(tasks.filter(task => task.id !== id));
      setCompletedTasks(completedTasks.filter(task => task.id !== id));
    }
  };

  const restoreTask = (id: string) => {
    const taskToRestore = deletedTasks.find(task => task.id === id);
    if (taskToRestore) {
      if (taskToRestore.completed) {
        setCompletedTasks([...completedTasks, taskToRestore]);
      } else {
        setTasks([...tasks, taskToRestore]);
      }
      setDeletedTasks(deletedTasks.filter(task => task.id !== id));
    }
  };

  const clearDeletedTasks = () => {
    setDeletedTasks([]);
  };

  const toggleTaskCompletion = (id: string) => {
    const taskToToggle = tasks.find(task => task.id === id);
    if (taskToToggle) {
      setTasks(tasks.filter(task => task.id !== id));
      setCompletedTasks([...completedTasks, { ...taskToToggle, completed: true }]);
    } else {
      const completedTaskToToggle = completedTasks.find(task => task.id === id);
      if (completedTaskToToggle) {
        setCompletedTasks(completedTasks.filter(task => task.id !== id));
        setTasks([...tasks, { ...completedTaskToToggle, completed: false }]);
      }
    }
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

  const clearTasks = () => {
    setTasks([]);
    setCompletedTasks([]);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const pendingTasks = tasks.filter(task => !task.completed).length;
  const totalTasks = tasks.length + completedTasks.length;

  return (
    <div className={`App ${theme}`}>
      <Header toggleTheme={toggleTheme} />
      <main className="main-content">
        <TaskInput addTask={addTask} />
        <Filter setFilter={setFilter} />
        <div className="task-container">
          <div className="task-column">
            <h2>Pendentes</h2>
            <TaskList
              tasks={filteredTasks.filter(task => !task.completed)}
              deleteTask={deleteTask}
              toggleTaskCompletion={toggleTaskCompletion}
              editTask={editTask}
              incrementTask={incrementTask}
              decrementTask={decrementTask}
            />
          </div>
          <div className="task-column">
            <h2>Concluídas</h2>
            <TaskList
              tasks={filteredTasks.filter(task => task.completed)}
              deleteTask={deleteTask}
              toggleTaskCompletion={toggleTaskCompletion}
              editTask={editTask}
              incrementTask={incrementTask}
              decrementTask={decrementTask}
            />
          </div>
          <div className="task-column">
            <h2>Excluídas</h2>
            <TaskList
              tasks={deletedTasks}
              deleteTask={deleteTask}
              restoreTask={restoreTask}
            />
          </div>
        </div>
      </main>
      <Footer clearTasks={clearTasks} pendingTasks={pendingTasks} totalTasks={totalTasks} clearDeletedTasks={clearDeletedTasks} />
    </div>
  );
};

export default App;