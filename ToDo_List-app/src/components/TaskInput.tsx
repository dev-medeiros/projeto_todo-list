import React, { useState } from 'react';
import { Task } from '../types';

interface TaskInputProps {
  addTask: (task: Task) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ addTask }) => {
  const [taskText, setTaskText] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleAddTask = () => {
    if (taskText.trim() && quantity > 0) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: taskText,
        quantity,
        completed: false,
        category: 'General'
      };
      addTask(newTask);
      setTaskText('');
      setQuantity(1);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Nome do item"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantidade"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        min="1"
      />
      <button onClick={handleAddTask}>Adicionar</button>
    </div>
  );
};

export default TaskInput;