import React from 'react';

interface HeaderProps {
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme }) => {
  return (
    <header className="header">
      <h1>Lista de Tarefas</h1>
      <button className="theme-toggle" onClick={toggleTheme}>
        <span role="img" aria-label="theme-toggle">🌞/🌜</span>
      </button>
    </header>
  );
};

export default Header;