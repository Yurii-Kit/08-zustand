// app/not-found.tsx
import type { Metadata } from 'next';
import css from './page.module.css';

export const metadata: Metadata = {
  title: '404 - Page Not Found | NoteHub',
  description:
    'Сторінка не знайдена. Можливо, ви ввели неправильну адресу або сторінка була видалена.',
  openGraph: {
    title: '404 - Page Not Found | NoteHub',
    description:
      'Сторінка не знайдена. Можливо, ви ввели неправильну адресу або сторінка була видалена.',
    url: 'http://localhost:3000', // Замінити на реальну URL!!!!!!!!!!!!!!!!!!!!!
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: '404 - Page Not Found Image',
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
