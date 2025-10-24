'use client';

import ModalClient from '@/components/Modal/ModalClient';
import { useRouter } from 'next/navigation';
import type { Note } from '@/types/note';
import css from './NotePreview.module.css';

interface Props {
  note: Note;
}

export default function NotePreviewClient({ note }: Props) {
  const router = useRouter();

  const handleClose = () => router.back();

  return (
    <ModalClient onClose={handleClose}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <span className={css.tag}>{note.tag}</span>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>
            {new Date(note.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </ModalClient>
  );
}
