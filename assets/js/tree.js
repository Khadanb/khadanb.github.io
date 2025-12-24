console.log("Landing page initialized with premium effects.")
// Tree Diagram Growth Logic
class WorkTree {
    constructor() {
        this.section = document.querySelector('.tree-section');
        this.stemProgress = document.querySelector('.tree-stem-progress');
        this.leaves = document.querySelectorAll('.tree-leaf');
        this.scrollIndicator = document.querySelector('.scroll-indicator');

        if (!this.section || !this.stemProgress) return;

        this.init();
    }

    init() {
        // Stem growth on scroll
        window.addEventListener('scroll', () => {
            this.updateStem();
            this.handleScrollIndicator();
        });

        // Leaf observer
        const leafOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };

        const leafObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, leafOptions);

        this.leaves.forEach(leaf => leafObserver.observe(leaf));

        // Initial call
        this.updateStem();
    }

    updateStem() {
        if (!this.section || !this.stemProgress) return;
        const rect = this.section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate progress through the section
        // 0 when top enters screen, 1 when bottom leaves screen
        let progress = (windowHeight - rect.top) / (rect.height + windowHeight / 2);
        progress = Math.max(0, Math.min(1, progress));

        this.stemProgress.style.height = `${progress * 100}%`;
    }

    handleScrollIndicator() {
        if (!this.scrollIndicator) return;
        if (window.scrollY > 100) {
            this.scrollIndicator.classList.add('hidden');
        } else {
            this.scrollIndicator.classList.remove('hidden');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WorkTree();
});
