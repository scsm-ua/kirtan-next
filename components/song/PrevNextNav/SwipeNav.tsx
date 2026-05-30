'use client';
import './SwipeNav.scss';
import { useEffect, useRef, useState } from 'react';

import type { TNavItems } from '@/types/song';

const MIN_SHOW = 50;            // px before the indicator appears
const MIN_HORIZONTAL = 200;     // px to fully fill the ring (triggers nav)
const DIRECTION_LOCK = 5;       // px before we decide horizontal vs vertical

const RING_RADIUS = 28;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

type Props = { prevNext: TNavItems };
type Direction = 'left' | 'right' | null;
type SwipeState = { direction: Direction; progress: number };

const INITIAL: SwipeState = { direction: null, progress: 0 };

export function SwipeNav({ prevNext }: Props) {
  const [swipe, setSwipe] = useState<SwipeState>(INITIAL);
  const stateRef = useRef<SwipeState>(INITIAL);
  const prevNextRef = useRef(prevNext);
  prevNextRef.current = prevNext;

  const update = (next: SwipeState) => {
    stateRef.current = next;
    setSwipe(next);
  };

  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let lock: 'horizontal' | 'vertical' | null = null;

    const onStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      lock = null;
    };

    const onMove = (e: TouchEvent) => {
      if (document.body.style.overflow === 'hidden') return;
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;
      const ax = Math.abs(dx);
      const ay = Math.abs(dy);

      if (!lock && (ax > DIRECTION_LOCK || ay > DIRECTION_LOCK)) {
        lock = ax >= ay ? 'horizontal' : 'vertical';
      }
      if (lock !== 'horizontal') return;

      // { passive: false } registration lets us prevent native horizontal scroll,
      // but the browser may have already committed to a scroll (cancelable=false).
      if (e.cancelable) e.preventDefault();

      if (ax < MIN_SHOW) {
        update(INITIAL);
        return;
      }
      const progress = Math.min((ax - MIN_SHOW) / (MIN_HORIZONTAL - MIN_SHOW), 1);
      update({ direction: dx < 0 ? 'left' : 'right', progress });
    };

    const onEnd = () => {
      const { direction, progress } = stateRef.current;
      lock = null;
      update(INITIAL);

      if (!window.getSelection()?.isCollapsed) return;
      if (progress < 1) return;

      const { prev, next } = prevNextRef.current;
      const target = direction === 'left' ? next : prev;
      if (target) window.location.href = target.path;
    };

    document.body.addEventListener('touchstart', onStart, { passive: true });
    document.body.addEventListener('touchmove', onMove, { passive: false });
    document.body.addEventListener('touchend', onEnd);
    document.body.addEventListener('touchcancel', onEnd);

    return () => {
      document.body.removeEventListener('touchstart', onStart);
      document.body.removeEventListener('touchmove', onMove);
      document.body.removeEventListener('touchend', onEnd);
      document.body.removeEventListener('touchcancel', onEnd);
    };
  }, []);

  const { direction, progress } = swipe;
  if (!direction) return null;

  const onLeftEdge = direction === 'right';
  const target = onLeftEdge ? prevNext.prev : prevNext.next;
  if (!target) return null;

  const ready = progress >= 1;
  const cls =
    `SwipeNav SwipeNav--${onLeftEdge ? 'left' : 'right'} SwipeNav--visible` +
    (ready ? ' SwipeNav--ready' : '');

  return (
    <div className={cls} aria-hidden="true">
      <svg className="SwipeNav__ring" viewBox="0 0 64 64">
        <circle className="SwipeNav__ring-bg" cx="32" cy="32" r={RING_RADIUS} />
        <circle
          className="SwipeNav__ring-fg"
          cx="32"
          cy="32"
          r={RING_RADIUS}
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={RING_CIRCUMFERENCE * (1 - progress)}
        />
      </svg>
      <span className="SwipeNav__arrow">{onLeftEdge ? '←' : '→'}</span>
    </div>
  );
}


