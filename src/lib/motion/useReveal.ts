import { useEffect, useRef, useState } from 'react';

interface RevealOptions {
  threshold?: number;
  rootMargin?: string;
}
/**
 * Adds `is-visible` to the node once it enters the viewport (fires once).
 * Pair with the [data-reveal] classes in globals.css or an is-visible CSS contract.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  rootMargin = '0px 0px -8% 0px',
}: RevealOptions = {}) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}

/**
 * Single global IntersectionObserver that adds `is-visible` to every
 * [data-reveal] container when it scrolls into view. Call once at app root.
 */
export function useRevealScan() {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      document.querySelectorAll('[data-reveal]').forEach((node) => node.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    const scan = () => {
      document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((node) => observer.observe(node));
    };
    scan();
    const mutation = new MutationObserver(scan);
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
    };
  }, []);
}
