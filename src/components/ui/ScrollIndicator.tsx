import { useState, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { useThrottledScroll } from '../../hooks/useThrottledScroll';

// Constants
const SCROLL_THRESHOLD = 100;

interface ScrollIndicatorProps {
  targetId: string;
}

export function ScrollIndicator({ targetId }: ScrollIndicatorProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleScroll = useCallback((scrollY: number) => {
    setIsVisible(scrollY <= SCROLL_THRESHOLD);
  }, []);

  useThrottledScroll(handleScroll);

  return (
    <div
      className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 transition-all duration-500 ${
        isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      <a
        href={`#${targetId}`}
        className="flex flex-col items-center cursor-pointer animate-bounce"
      >
        <ChevronDown className="w-8 h-8 text-white opacity-70" />
        <ChevronDown className="w-8 h-8 text-white opacity-40 -mt-6" />
      </a>
    </div>
  );
}
