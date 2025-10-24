'use client';
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { createNote } from '@/lib/api';
import type { NoteFormValues } from '../../types/note';
import { useNoteDraftStore } from '@/lib/store/noteStore';
import TagsMenu from '../TagsMenu/TagsMenu';
import css from './NoteForm.module.css';

const tagOptions: string[] = [
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

const NoteForm = () => {
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  // локальний стан форми — не оновлює Zustand на кожному введенні
  const [formValues, setFormValues] = useState<NoteFormValues>(draft);

  // коли користувач друкує — змінюємо тільки локальний стан
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // 🕐 debounce — оновлюємо Zustand тільки якщо користувач не друкує 0.5 с
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDraft(formValues);
    }, 500);

    return () => clearTimeout(timeout);
  }, [formValues, setDraft]);

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
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
          type="text"
          name="title"
          defaultValue={draft?.title}
          onChange={handleChange}
          className={css.input}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          defaultValue={draft?.content}
          onChange={handleChange}
          className={css.textarea}
          required
        ></textarea>
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>

        <TagsMenu
          id="tag"
          options={tagOptions}
          value={formValues.tag}
          onChange={(tag) => setFormValues((prev) => ({ ...prev, tag }))}
          placeholder="Select tag"
        />
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
