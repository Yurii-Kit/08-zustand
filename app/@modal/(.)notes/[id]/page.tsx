// app/@modal/(.)notes/[id]/page.tsx

// import { fetchNoteById } from '@/lib/api';
// import ModalClient from '@/components/Modal/ModalClient';
// import css from './NotePreview.module.css';

// type Props = {
//   params: Promise<{ id: string }>;
// };

// const NotePreview = async ({ params }: Props) => {
//   const { id } = await params;
//   const note = await fetchNoteById(id);

//   return (
//     <ModalClient>
//       <div className={css.container}>
//         <div className={css.item}>
//           <div className={css.header}>
//             <h2>{note.title}</h2>
//             <span className={css.tag}>{note.tag}</span>
//           </div>
//           <p className={css.content}>{note.content}</p>
//           <p className={css.date}>
//             {new Date(note.createdAt).toLocaleString()}
//           </p>
//         </div>
//       </div>
//     </ModalClient>
//   );
// };

// export default NotePreview;

import { fetchNoteById } from '@/lib/api';
import NotePreviewClient from './NotePreview.client';

type Props = {
  params: Promise<{ id: string }>;
};

const NotePreview = async ({ params }: Props) => {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return <NotePreviewClient note={note} />;
};

export default NotePreview;
