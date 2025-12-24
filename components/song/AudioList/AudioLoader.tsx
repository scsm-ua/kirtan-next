import { useEffect, useLayoutEffect } from 'react';

/**/
type Props = {
  isOpen: boolean;
  onPlayStart: () => void;
  url: string;
};

/**
 *
 */
function AudioLoader({ isOpen, onPlayStart, url }: Props) {
  let player;
  const src = 'https://w.soundcloud.com/player/?url=' + encodeURIComponent(url);

  useLayoutEffect(() => {
    player = window.SC.Widget(src);

    player.bind(window.SC.Widget.Events.PLAY, () => onPlayStart());
    player.bind(window.SC.Widget.Events.READY, () => isOpen && player.play());
  }, []);

  useEffect(() => {
    isOpen ? player?.play() : player?.pause();
  }, [isOpen]);

  return (
    <iframe
      allow="autoplay"
      frameBorder="no"
      id={src}
      height="20"
      width="100%"
      scrolling="no"
      src={src}
    />
  );
}

/**/
export default AudioLoader;
