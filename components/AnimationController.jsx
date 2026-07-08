'use client';

import usePageAnimations from '@/hooks/usePageAnimations';

// Thin mount point for the document-wide GSAP engine. Rendered only where the
// marketing chrome is active (i.e. not on /admin), so the hook's rules-of-hooks
// contract stays clean while the effect itself is fully gated.
export default function AnimationController() {
  usePageAnimations();
  return null;
}
