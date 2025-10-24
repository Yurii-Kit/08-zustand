'use client';

import Modal from './Modal';

import css from './Modal.module.css';

interface ModalClientProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function ModalClient({ children, onClose }: ModalClientProps) {
  return (
    <Modal onClose={onClose}>
      <button className={css.modalBtn} onClick={onClose}>
        Close
      </button>
      {children}
    </Modal>
  );
}
