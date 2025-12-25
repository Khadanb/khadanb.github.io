import { useEffect, useRef, createRef } from 'react';
import { TreeLeaf } from '../ui/TreeLeaf';
import { experiences } from '../../data/experiences';

// Constants
const OVERSHOOT_DIVISOR = 50;

export function ExperienceTree() {
  const stemRef = useRef<HTMLDivElement>(null);
  const stemContainerRef = useRef<HTMLDivElement>(null);
  const branchRefs = useRef(experiences.map(() => createRef<HTMLDivElement>()));

  useEffect(() => {
    const handleScroll = () => {
      if (!stemRef.current || !stemContainerRef.current) return;

      const stemContainerRect = stemContainerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const stemTop = stemContainerRect.top;
      const stemHeight = stemContainerRect.height;

      // Calculate progress based on stem container position
      let progress = (windowHeight - stemTop) / (stemHeight + windowHeight);
      progress = Math.max(0, Math.min(1, progress));

      // Update stem height
      stemRef.current.style.height = `${progress * 100}%`;

      const litStemBottom = stemTop + stemHeight * progress;

      // Update each branch based on whether the stem has reached it
      branchRefs.current.forEach((branchRef) => {
        const branch = branchRef.current;
        if (!branch) return;

        const branchRect = branch.getBoundingClientRect();
        const branchY = branchRect.top + branchRect.height / 2;

        // Find the lit portion div inside the branch
        const litPortion = branch.querySelector<HTMLDivElement>('div');
        // Also find mobile branch (sibling)
        const mobileBranch = branch.parentElement?.querySelector<HTMLDivElement>('.sm\\:hidden > div');

        if (litPortion) {
          if (litStemBottom >= branchY) {
            const overshoot = Math.min((litStemBottom - branchY) / OVERSHOOT_DIVISOR, 1);
            litPortion.style.transform = `scaleX(${overshoot})`;
          } else {
            litPortion.style.transform = 'scaleX(0)';
          }
        }

        if (mobileBranch) {
          if (litStemBottom >= branchY) {
            const overshoot = Math.min((litStemBottom - branchY) / OVERSHOOT_DIVISOR, 1);
            mobileBranch.style.transform = `scaleX(${overshoot})`;
          } else {
            mobileBranch.style.transform = 'scaleX(0)';
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            key={index}
            ref={branchRefs.current[index]}
            experience={exp}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
