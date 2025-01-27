import React from 'react';
import { Task } from '../types';

interface SummaryProps {
  tasks: Task[];
}

const Summary: React.FC<SummaryProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const totalPending = tasks.filter(task => !task.completed).reduce((sum, task) => sum + task.quantity, 0);

  return (
    <div>
      <p>Total de Tarefas: {totalTasks}</p>
      <p>Soma de Quantidades Pendentes: {totalPending}</p>
    </div>
  );
};

export default Summary;