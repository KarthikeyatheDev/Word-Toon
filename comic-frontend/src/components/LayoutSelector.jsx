import React from "react";
import "./LayoutSelector.css";

const layouts = [
  { id: "single", name: "Single Panel" },
  { id: "double", name: "Two Panels (Side by Side)" },
  { id: "strip", name: "Three Panels (Strip)" },
  { id: "grid", name: "Grid (2x2)" },
];

function LayoutSelector({ selectedLayout, setSelectedLayout }) {
  return (
    <div className="layout-selector">
      <h3>🖼️ Choose a Page Layout</h3>
      <div className="layout-options">
        {layouts.map((layout) => (
          <button
            key={layout.id}
            className={selectedLayout === layout.id ? "selected" : ""}
            onClick={() => setSelectedLayout(layout.id)}
          >
            {layout.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default LayoutSelector;
