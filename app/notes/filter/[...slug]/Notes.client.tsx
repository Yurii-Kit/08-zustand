// app/notes/Notes.client.tsx

'use client';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import type { FetchNoteResponse } from '@/types/note';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './Notes.client.module.css';
import SearchBox from '@/components/SearchBox/SearchBox';

const NotesClient = ({ tagName }: { tagName?: string }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [query, setQuery] = useState<string>('');

  const debouncedSetQuery = useDebouncedCallback((newQuery: string) => {
    setQuery(newQuery);
    setCurrentPage(1);
  }, 800);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // ✅ React Query підхоплює гідратований кеш
  const tagKey = tagName ?? 'all';
  const { data, isLoading, isError } = useQuery<FetchNoteResponse>({
    queryKey: ['notes', query, currentPage, tagKey],
    queryFn: () => fetchNotes(query, currentPage, 12, tagName),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes

    placeholderData: keepPreviousData, //  залишає старі дані поки нові завантажуються
  });

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox text={query} onSearch={debouncedSetQuery} />
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
        {isLoading && <p className={css.loading}>Loading notes...</p>}
        {isError && <p className={css.error}>Failed to load notes.</p>}
      </div>
      {data?.notes?.length ? (
        <NoteList notes={data.notes} />
      ) : (
        !isLoading && <p>No notes found</p>
      )}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default NotesClient;
