import { ArrowRight } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { architectureNodes } from "../../data/capabilities";

export function ArchitectureExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const activeNode = architectureNodes[activeIndex];

  function selectIndex(index: number): void {
    const normalized = (index + architectureNodes.length) % architectureNodes.length;
    setActiveIndex(normalized);
    buttons.current[normalized]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number): void {
    const movement: Record<string, number> = { ArrowRight: 1, ArrowDown: 3, ArrowLeft: -1, ArrowUp: -3 };
    if (event.key in movement) {
      event.preventDefault();
      selectIndex(index + movement[event.key]);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      selectIndex(architectureNodes.length - 1);
    }
  }

  return (
    <div className="architecture-explorer">
      <div className="architecture-node-grid" role="tablist" aria-label="System architecture capabilities">
        {architectureNodes.map((node, index) => (
          <button
            ref={(element) => { buttons.current[index] = element; }}
            key={node.id}
            id={`architecture-tab-${node.id}`}
            type="button"
            role="tab"
            tabIndex={index === activeIndex ? 0 : -1}
            aria-selected={index === activeIndex}
            aria-controls="architecture-panel"
            className={index === activeIndex ? "architecture-node active" : "architecture-node"}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{node.label}</strong>
            <small>{node.eyebrow}</small>
          </button>
        ))}
      </div>
      <div
        id="architecture-panel"
        className="architecture-panel"
        role="tabpanel"
        aria-labelledby={`architecture-tab-${activeNode.id}`}
      >
        <p className="eyebrow">Selected system layer</p>
        <h3>{activeNode.label}</h3>
        <p>{activeNode.description}</p>
        <Link to={activeNode.evidenceHref}>
          {activeNode.evidenceLabel} <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
