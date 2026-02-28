'use client';
import Script from 'next/script';

/**/
type Props = {
  bookId?: string;
  songId?: string;
};

/**
 *
 */
export function GoogleAnalytics({ bookId = null, songId = null }: Props) {
  const GA_ID = process.env.NEXT_PUBLIC_G_ID;
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />

      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            songbook: ${bookId},
            song: ${songId}
          });
        `}
      </Script>
    </>
  );
}
