// app/notes/filter/[...slug]/page.tsx
import NotesClient from '@/app/notes/filter/[...slug]/Notes.client';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';

type Props = {
  params: Promise<{ slug?: string[] }>;
};

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
