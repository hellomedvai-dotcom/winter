import React from 'react';
import { ChevronRight } from 'lucide-react';

interface SwipeHintProps {
  active: boolean;
  label?: string;
}

/**
 * Directional cue for a horizontally scrollable row. The host owns useSwipeHint()
 * so scrolling/arrow clicks on the row also dismiss the hint.
 */
export const SwipeHint: React.FC<SwipeHintProps> = ({ active, label = 'Swipe to explore' }) => {
  if (!active) return null;
  return (
    <span className="swipe-hint hint-shown" aria-hidden="true">
      {label}
      <ChevronRight className="swipe-chevron" size={14} />
    </span>
  );
};
