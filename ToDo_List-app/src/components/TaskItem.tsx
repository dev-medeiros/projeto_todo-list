import React, { useState } from 'react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggleComplete?: (id: string) => void;
  onEdit?: (id: string, newText: string, newQuantity: number) => void;
  onIncrement?: (id: string) => void;
  onDecrement?: (id: string) => void;
  onRestore?: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onToggleComplete, onEdit, onIncrement, onDecrement, onRestore }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);
  const [newQuantity, setNewQuantity] = useState(task.quantity);

  const handleEdit = () => {
    if (onEdit) {
      onEdit(task.id, newText, newQuantity);
    }
    setIsEditing(false);
  };

  return (
    <li className={`task-item ${task.completed ? 'completed-task' : ''}`}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <input
            type="number"
            value={newQuantity}
            onChange={(e) => setNewQuantity(Number(e.target.value))}
            min="1"
          />
          <button onClick={handleEdit}>Salvar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      ) : (
        <span>
          {task.text} - {task.quantity}
        </span>
      )}
      <div>
        {isEditing ? null : (
          <>
            {onEdit && <button onClick={() => setIsEditing(true)}>✏️ Editar</button>}
            {onToggleComplete && <button onClick={() => onToggleComplete(task.id)}>
              {task.completed ? '↩️ Mover para Pendentes' : '✅ Mover para Concluídas'}
            </button>}
            {onRestore && <button onClick={() => onRestore(task.id)}>♻️ Restaurar</button>}
            <button onClick={() => onDelete(task.id)}>🗑️ Excluir</button>
          </>
        )}
      </div>
    </li>
  );
};

export default TaskItem;