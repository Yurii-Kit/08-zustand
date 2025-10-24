import axios, { type AxiosResponse } from 'axios';
import type { Note } from '@/types/note';
import type { NoteFormValues, FetchNoteResponse } from '@/types/note';

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

axios.defaults.baseURL = 'https://notehub-public.goit.study/api/';
axios.defaults.headers.common['Authorization'] = `Bearer ${myKey}`;

export const fetchNotes = async (
  keyword?: string,
  page?: number,
  perPage: number = 12,
  tag?: string, // ← додано
): Promise<FetchNoteResponse> => {
  const params: Record<string, string | number | undefined> = {
    search: keyword,
    page,
    perPage,
  };
  // important: бекенд не очікує 'all'
  if (tag && tag !== 'all') {
    params.tag = tag;
  }
  const response: AxiosResponse<FetchNoteResponse> = await axios.get('notes', {
    params,
  });
  return response.data;
};

export const createNote = async (newNote: NoteFormValues): Promise<Note> => {
  const response: AxiosResponse<Note> = await axios.post('notes', newNote);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await axios.delete(`notes/${id}`);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await axios.get(`notes/${id}`);
  return response.data;
};
