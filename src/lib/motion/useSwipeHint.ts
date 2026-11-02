import { useCallback, useEffect, useState } from 'react';

/**
 * Shows a swipe hint once the row enters view AND actually overflows.
 * Hides permanently after the first real interaction (scroll/click inside the row).
 * Uses a callback ref so it also works for rows that mount later (e.g. feature tabs).
 */
export function useSwipeHint<T extends HTMLElement = HTMLDivElement>() {
  const [node, setNode] = useState<T | null>(null);
  const [hintShown, setHintShown] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [overflows, setOverflows] = useState(false);

  const rowRef = useCallback((el: T | null) => setNode(el), []);

  useEffect(() => {
    if (!node) return undefined;

    const measure = () => setOverflows(node.scrollWidth > node.clientWidth + 4);
    measure();
    const resize =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    resize?.observe(node);

    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver === 'undefined') {
      setHintShown(true);
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setHintShown(true);
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      observer.observe(node);
    }

    return () => {
      resize?.disconnect();
      observer?.disconnect();
    };
  }, [node]);

  const onRowScroll = useCallback(() => {
    if (node && Math.abs(node.scrollLeft) > 8) {
      setInteracted(true);
    }
  }, [node]);

  const notify = useCallback(() => {
    setInteracted(true);
  }, []);

  return {
    rowRef,
    active: hintShown && !interacted && overflows,
    notify,
    onRowScroll,
  };
}
