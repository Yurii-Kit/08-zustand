// app/notes/filter/[...slug]/page.tsx
import NotesClient from '@/app/notes/filter/[...slug]/Notes.client';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug?: string[] }>;
};

// Генерація динамічних метаданих
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const tagName =
    slug && slug.length > 0 && slug[0] !== 'all' ? slug[0] : 'all';

  const title =
    tagName !== 'all'
      ? `Notes tagged "${tagName}" | NoteHub`
      : 'All Notes | NoteHub';

  const description =
    tagName !== 'all'
      ? `Перегляд нотаток з фільтром за тегом "${tagName}".`
      : 'Перегляд усіх нотаток без фільтру.';

  const url = `https://http://localhost:3000//notes/filter/${tagName}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Notes page - ${tagName}`,
        },
      ],
    },
  };
}

const FilteredNotesPage = async ({ params }: Props) => {
  const { slug } = await params;

  const tagName =
    slug && slug.length > 0 && slug[0] !== 'all' ? slug[0] : undefined;

  const queryClient = new QueryClient();
  const tagKey = tagName ?? 'all';
  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1, tagKey],
    queryFn: () => fetchNotes('', 1, 12, tagName),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tagName={tagName} />
    </HydrationBoundary>
  );
};

export default FilteredNotesPage;
