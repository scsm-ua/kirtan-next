import '../styles/index.scss';
import { getBookIdParamList } from '@/lib/books';

/**
 * The `generateStaticParams` has been moved from the `page.tsx` up
 * to this `layout.tsx` file due to the issue reported at:
 * https://github.com/vercel/next.js/issues/53717
 * In our case the `generateStaticParams` of the `[slug]/page.tsx` wouldn't
 * receive the expected `bookId` param.
 */
export const generateStaticParams = getBookIdParamList;
// export const generateStaticParams = Promise.resolve([{ bookId: 'en-pe' }]);

/**/
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
