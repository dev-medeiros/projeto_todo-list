import React from 'react';

interface FilterProps {
  setFilter: (filter: string) => void;
}

const Filter: React.FC<FilterProps> = ({ setFilter }) => {
  return (
    <div className="filter-buttons">
      <button onClick={() => setFilter('all')}>Todas as Tarefas</button>
      <button onClick={() => setFilter('pending')}>Pendentes</button>
      <button onClick={() => setFilter('completed')}>Concluídas</button>
    </div>
  );
};

export default Filter;