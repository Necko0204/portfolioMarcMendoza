import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { OperationArtifact } from "../../types/content";

export function Lightbox({ artifact, onClose }: { artifact: OperationArtifact; onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [onClose]);

  return (
    <div className="lightbox-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="lightbox" role="dialog" aria-modal="true" aria-labelledby="lightbox-title">
        <div className="lightbox-header">
          <div>
            <p className="eyebrow">{artifact.category}</p>
            <h2 id="lightbox-title">{artifact.title}</h2>
          </div>
          <button ref={closeButtonRef} className="icon-button" type="button" onClick={onClose} aria-label="Close image preview">
            <X aria-hidden="true" />
          </button>
        </div>
        <div className="lightbox-image-wrap">
          <img src={artifact.image} alt={artifact.alt} width={artifact.width} height={artifact.height} />
        </div>
        <p>{artifact.description}</p>
      </section>
    </div>
  );
}
