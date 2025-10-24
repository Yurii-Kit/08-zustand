'use client';
import { useState } from 'react';
import css from './TagsMenu.module.css';

interface TagsMenuProps {
  id?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const TagsMenu = ({
  id,
  options,
  value,
  onChange,
  placeholder = 'Select tag',
}: TagsMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={`${css.menuContainer} ${isOpen ? css.open : ''}`}>
      <button
        id={id}
        type="button"
        className={css.menuButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        {value || placeholder}
      </button>

      {isOpen && (
        <ul className={css.menuList}>
          {options.map((option) => (
            <li key={option} className={css.menuItem}>
              <button
                type="button"
                className={css.menuLink}
                onClick={() => handleSelect(option)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
