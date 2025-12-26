import { useRef, createRef, useCallback, useEffect } from 'react';
import { TreeLeaf } from '../ui/TreeLeaf';
import { experiences } from '../../data/experiences';
import { useThrottledScroll, useResizeEvent } from '../../hooks';
import { APP_CONFIG } from '../../config/app';

const { TREE_OVERSHOOT_DIVISOR } = APP_CONFIG.scroll;

// Cached dimension data to avoid getBoundingClientRect on every scroll
interface CachedDimensions {
  stemOffsetTop: number;
  stemHeight: number;
  branchData: Array<{
    offsetTop: number;
    height: number;
    litPortion: HTMLDivElement | null;
    mobileBranch: HTMLDivElement | null;
  }>;
}

export function ExperienceTree() {
  const stemRef = useRef<HTMLDivElement>(null);
  const stemContainerRef = useRef<HTMLDivElement>(null);
  const branchRefs = useRef(experiences.map(() => createRef<HTMLDivElement>()));

  // Cache element dimensions to avoid expensive getBoundingClientRect calls
  const cachedDimensionsRef = useRef<CachedDimensions | null>(null);

  // Update cached dimensions (only on mount and resize)
  const updateCachedDimensions = useCallback(() => {
    if (!stemContainerRef.current) return;

    const stemRect = stemContainerRef.current.getBoundingClientRect();
    const scrollY = window.scrollY;

    cachedDimensionsRef.current = {
      // Convert viewport-relative to document-relative
      stemOffsetTop: stemRect.top + scrollY,
      stemHeight: stemRect.height,
      branchData: branchRefs.current.map(branchRef => {
        const branch = branchRef.current;
        if (!branch) {
          return { offsetTop: 0, height: 0, litPortion: null, mobileBranch: null };
        }
        const branchRect = branch.getBoundingClientRect();
        return {
          offsetTop: branchRect.top + scrollY,
          height: branchRect.height,
          litPortion: branch.querySelector<HTMLDivElement>('[data-branch-lit]'),
          mobileBranch: branch.parentElement?.querySelector<HTMLDivElement>('[data-branch-lit-mobile]') ?? null,
        };
      }),
    };
  }, []);

  // Initialize dimensions on mount
  useEffect(() => {
    // Small delay to ensure DOM is fully rendered
    const timeoutId = setTimeout(updateCachedDimensions, 50);
    return () => clearTimeout(timeoutId);
  }, [updateCachedDimensions]);

  // Update dimensions on resize
  useResizeEvent(updateCachedDimensions);

  const handleScroll = useCallback((scrollY: number) => {
    if (!stemRef.current || !cachedDimensionsRef.current) return;

    const { stemOffsetTop, stemHeight, branchData } = cachedDimensionsRef.current;
    const windowHeight = window.innerHeight;

    // Calculate viewport-relative position from cached document-relative position
    const stemTop = stemOffsetTop - scrollY;

    // Calculate progress based on stem container position
    let progress = (windowHeight - stemTop) / (stemHeight + windowHeight);
    progress = Math.max(0, Math.min(1, progress));

    // Update stem height
    stemRef.current.style.height = `${progress * 100}%`;

    const litStemBottom = stemTop + stemHeight * progress;

    // Update each branch using cached data
    branchData.forEach(({ offsetTop, height, litPortion, mobileBranch }) => {
      // Calculate viewport-relative Y position
      const branchY = (offsetTop - scrollY) + height / 2;

      if (litPortion) {
        if (litStemBottom >= branchY) {
          const overshoot = Math.min((litStemBottom - branchY) / TREE_OVERSHOOT_DIVISOR, 1);
          litPortion.style.transform = `scaleX(${overshoot})`;
        } else {
          litPortion.style.transform = 'scaleX(0)';
        }
      }

      if (mobileBranch) {
        if (litStemBottom >= branchY) {
          const overshoot = Math.min((litStemBottom - branchY) / TREE_OVERSHOOT_DIVISOR, 1);
          mobileBranch.style.transform = `scaleX(${overshoot})`;
        } else {
          mobileBranch.style.transform = 'scaleX(0)';
        }
      }
    });
  }, []);

  useThrottledScroll(handleScroll);

  return (
    <section
      id="experience"
      className="py-16 sm:py-32 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative px-4 sm:px-8">
        <div className="mb-12 sm:mb-24 flex justify-center">
          <div className="inline-block">
            <h2 className="text-3xl sm:text-5xl font-bold text-center mb-2">Experience</h2>
            <div className="w-full h-0.5 bg-primary/50" />
          </div>
        </div>

        {/* Stem - left on mobile, center on desktop */}
        <div
          ref={stemContainerRef}
          className="absolute left-6 sm:left-1/2 top-32 sm:top-48 sm:-translate-x-1/2 w-1 h-[calc(100%-8rem)] sm:h-[calc(100%-12rem)] bg-gradient-to-b from-primary/50 via-secondary/50 to-primary/10 rounded-sm"
        >
          <div
            ref={stemRef}
            className="absolute left-0 top-0 w-full bg-gradient-to-b from-primary to-secondary shadow-glow rounded-sm"
            style={{ height: '0%' }}
          />
        </div>

        {/* Leaves */}
        {experiences.map((exp, index) => (
          <TreeLeaf
            key={`${exp.company}-${exp.title}-${exp.date}`}
            ref={branchRefs.current[index]}
            experience={exp}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
