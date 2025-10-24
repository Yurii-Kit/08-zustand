'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { createNote } from '@/lib/api';
import type { NoteFormValues } from '../../types/note';
import css from './NoteForm.module.css';
import { log } from 'console';

const tagOptions: string[] = [
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

const NoteForm = () => {
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      router.push('/notes/filter/all');
    },
  });

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as NoteFormValues;
    console.log('Form Values:', values);
    mutate(values);
  };
  const handleCancel = () => router.push('/notes/filter/all');

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          className={css.textarea}
          required
        ></textarea>
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select id="tag" name="tag" className={css.select} required>
          {tagOptions.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
