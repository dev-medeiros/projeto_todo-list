import React from 'react';
import { FaGithub, FaTasks, FaTrashAlt } from 'react-icons/fa';

interface FooterProps {
  clearTasks: () => void;
  pendingTasks: number;
  totalTasks: number;
  clearDeletedTasks: () => void;
}

const Footer: React.FC<FooterProps> = ({ clearTasks, pendingTasks, totalTasks, clearDeletedTasks }) => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <a href="https://github.com/dev-medeiros/projeto_todo-list" target="_blank" rel="noopener noreferrer">
          <FaGithub /> Código no GitHub
        </a>
      </div>
      <div className="footer-section task-summary">
        <span><FaTasks /> Pendentes: {pendingTasks}</span>
        <span><FaTasks /> Total: {totalTasks}</span>
      </div>
      <div className="footer-section">
        <button onClick={clearTasks}><FaTrashAlt /> Limpar Lista</button>
        <button onClick={clearDeletedTasks}><FaTrashAlt /> Limpar Excluídas</button>
      </div>
    </footer>
  );
};

export default Footer;