"use client";

import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { ProjectScreenshot } from "../../src/content/site";

type ProjectGalleryProps = {
  project: string;
  screenshots: readonly ProjectScreenshot[];
};

export function ProjectGallery({ project, screenshots }: ProjectGalleryProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingId = useId();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const screenshot = activeIndex === null ? null : screenshots[activeIndex];
  const hasMultipleScreens = screenshots.length > 1;

  function openGallery() {
    dialogRef.current?.showModal();
    setActiveIndex(0);
  }

  function changeScreen(direction: -1 | 1) {
    setActiveIndex((index) => index === null
      ? null
      : (index + direction + screenshots.length) % screenshots.length);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (!hasMultipleScreens) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      changeScreen(event.key === "ArrowLeft" ? -1 : 1);
    }
  }

  return (
    <>
      <button
        type="button"
        className="project-link project-gallery-trigger"
        aria-haspopup="dialog"
        aria-label={`Ver telas do ${project}`}
        onClick={openGallery}
      >
        Ver telas <Images size={15} aria-hidden="true" />
      </button>
      <dialog
        ref={dialogRef}
        className="project-gallery"
        aria-labelledby={headingId}
        onKeyDown={handleKeyDown}
        onClose={() => setActiveIndex(null)}
      >
        <div className="project-gallery-panel">
          <header className="project-gallery-header">
            <h2 id={headingId}>Telas do {project}</h2>
            <button
              type="button"
              className="project-gallery-control"
              aria-label="Fechar galeria"
              onClick={() => dialogRef.current?.close()}
            >
              <X size={20} aria-hidden="true" />
            </button>
          </header>
          {screenshot && activeIndex !== null && (
            <>
              <Image
                key={screenshot.src}
                className="project-gallery-image"
                src={screenshot.src}
                alt={screenshot.alt}
                width={screenshot.width}
                height={screenshot.height}
                loading="eager"
                unoptimized
              />
              <div className="project-gallery-navigation">
                {hasMultipleScreens && (
                  <button
                    type="button"
                    className="project-gallery-control"
                    aria-label="Tela anterior"
                    onClick={() => changeScreen(-1)}
                  >
                    <ChevronLeft size={21} aria-hidden="true" />
                  </button>
                )}
                <p className="project-gallery-caption" aria-live="polite" aria-atomic="true">
                  <span>{screenshot.title}</span>
                  <span>{activeIndex + 1} de {screenshots.length}</span>
                </p>
                {hasMultipleScreens && (
                  <button
                    type="button"
                    className="project-gallery-control"
                    aria-label="Próxima tela"
                    onClick={() => changeScreen(1)}
                  >
                    <ChevronRight size={21} aria-hidden="true" />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
