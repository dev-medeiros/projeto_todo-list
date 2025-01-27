import React from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  deleteTask: (id: string) => void;
  toggleTaskCompletion?: (id: string) => void;
  editTask?: (id: string, newText: string, newQuantity: number) => void;
  incrementTask?: (id: string) => void;
  decrementTask?: (id: string) => void;
  restoreTask?: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, deleteTask, toggleTaskCompletion, editTask, incrementTask, decrementTask, restoreTask }) => {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={deleteTask}
          onToggleComplete={toggleTaskCompletion}
          onEdit={editTask}
          onIncrement={incrementTask}
          onDecrement={decrementTask}
          onRestore={restoreTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;