import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { systemNodes } from "../../data/capabilities";

const positions = ["north-west", "north", "north-east", "west", "east", "south-west", "south-east"];
const linePoints = [
  [17, 20],
  [50, 13],
  [83, 20],
  [16, 52],
  [84, 52],
  [25, 84],
  [75, 84]
];

export function SystemConsole() {
  const [activeId, setActiveId] = useState("frontend");
  const activeNode = systemNodes.find((node) => node.id === activeId) || systemNodes[0];

  return (
    <section className="system-console" aria-labelledby="system-console-title">
      <div className="console-toolbar">
        <div>
          <p className="console-status"><span aria-hidden="true" /> System map online</p>
          <h2 id="system-console-title">Capability architecture</h2>
        </div>
        <p>Select a layer</p>
      </div>
      <div className="console-body">
        <div className="console-map">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {linePoints.map(([x, y], index) => (
              <line key={`${x}-${y}`} x1="50" y1="50" x2={x} y2={y} className={systemNodes[index]?.id === activeId ? "active" : ""} />
            ))}
          </svg>
          <div className="console-core">
            <small>Operating principle</small>
            <strong>Reliable digital products</strong>
          </div>
          {systemNodes.map((node, index) => (
            <button
              key={node.id}
              type="button"
              className={`console-node ${positions[index]} ${node.id === activeId ? "active" : ""}`}
              aria-pressed={node.id === activeId}
              onClick={() => setActiveId(node.id)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {node.label}
            </button>
          ))}
        </div>
        <div className="console-detail" aria-live="polite">
          <p className="eyebrow">{activeNode.eyebrow}</p>
          <h3>{activeNode.label}</h3>
          <p>{activeNode.description}</p>
          <Link to={activeNode.evidenceHref}>
            {activeNode.evidenceLabel} <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
