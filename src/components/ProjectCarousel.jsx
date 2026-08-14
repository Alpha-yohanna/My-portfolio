import { useEffect, useRef, useState } from "react";
import { projectImages } from "../data/siteData";

function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState("next");
  const touchStartX = useRef(null);

  const goToSlide = (nextIndex, nextDirection = "next") => {
    setDirection(nextDirection);
    setActiveIndex((nextIndex + projectImages.length) % projectImages.length);
  };

  useEffect(() => {
    if (isPaused) return undefined;

    const interval = window.setInterval(() => {
      setDirection("next");
      setActiveIndex(
        (currentIndex) => (currentIndex + 1) % projectImages.length,
      );
    }, 4500);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  const handlePointerDown = (event) => {
    touchStartX.current = event.clientX;
  };

  const handlePointerUp = (event) => {
    if (touchStartX.current === null) return;

    const swipeDistance = event.clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(swipeDistance) < 40) return;

    if (swipeDistance < 0) {
      goToSlide(activeIndex + 1, "next");
    } else {
      goToSlide(activeIndex - 1, "previous");
    }
  };

  return (
    <div
      className="group mx-auto w-full max-w-xs overflow-hidden rounded-[1.75rem] border border-slate-800 bg-black/30 p-3"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        touchStartX.current = null;
      }}
    >
      <div className="relative h-[360px] overflow-hidden rounded-[1.25rem] bg-slate-950">
        {projectImages.map((image, index) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            className={`project-carousel-image ${
              index === activeIndex
                ? `project-carousel-image-active project-carousel-image-${direction}`
                : ""
            }`}
            draggable="false"
          />
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {projectImages.map((image, index) => (
          <button
            key={`${image.src}-indicator`}
            type="button"
            className={`h-2.5 rounded-full transition-all ${
              index === activeIndex ? "w-8 bg-white" : "w-2.5 bg-slate-700"
            }`}
            aria-label={`Show project image ${index + 1}`}
            onClick={() =>
              goToSlide(index, index > activeIndex ? "next" : "previous")
            }
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectCarousel;
