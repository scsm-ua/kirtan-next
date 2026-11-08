'use client';

import type { MouseEvent, ReactNode } from 'react';

import { playerManager } from '@/other/player/PlayerManager';

/**/
type Props = {
  children: ReactNode;
  className?: string;
  href: string;
  title?: string;
};

/**
 * Opens the song in a new tab while audio is playing, so navigation doesn't stop it.
 */
function PlaylistLink({ children, className, href, title }: Props) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const isPlaying = !!playerManager.getSnapshot().active?.isBusy();
    e.currentTarget.target = isPlaying ? '_blank' : '';
  };

  return (
    <a className={className} href={href} onClick={handleClick} rel="noopener" title={title}>
      {children}
    </a>
  );
}

/**/
export default PlaylistLink;
