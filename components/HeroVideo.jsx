'use client';

export default function HeroVideo() {
  return (
    <iframe
      id="hero-vid"
      className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[100vw] h-[56.25vw] min-h-[110vh] min-w-[195vh] max-w-none pointer-events-none"
      src="https://www.youtube.com/embed/Am4X4xwjk6o?autoplay=1&mute=1&loop=1&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&playlist=Am4X4xwjk6o&controls=0&iv_load_policy=3&cc_load_policy=0"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  );
}
