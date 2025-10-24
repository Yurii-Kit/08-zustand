import { create } from 'zustand';
import { NoteFormValues } from '@/types/note';
import { persist } from 'zustand/middleware';

type NoteDraftStore = {
  draft: NoteFormValues;
  setDraft: (note: NoteFormValues) => void;
  clearDraft: () => void;
};

const initialDraft: NoteFormValues = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  // 2. Обгортаємо функцію створення стора
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      // Ключ у localStorage
      name: 'note-draft',
      // Зберігаємо лише властивість draft
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
