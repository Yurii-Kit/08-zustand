// app/notes/[id]/page.tsx
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from '@/app/notes/[id]/NoteDetails.client';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

// Генерація метаданих для сторінки нотатки
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  // Отримуємо дані нотатки
  const note = await fetchNoteById(id);

  const title = note?.title
    ? `${note.title} | NoteHub`
    : 'Note Details | NoteHub';
  const description = note?.content
    ? note.content.slice(0, 30)
    : 'Деталі нотатки NoteHub.';

  const url = `https://08-zustand-eight-sigma.vercel.app/notes/${id}`;

  return {
    title,
    description: note.content.slice(0, 100),
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: note?.title ? `Note - ${note.title}` : 'NoteHub Note',
        },
      ],
    },
  };
}

//  Компонент повертає проміс, який резолвиться в JSX.Element
const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
