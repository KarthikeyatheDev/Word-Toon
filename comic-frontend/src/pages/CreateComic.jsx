import React, { useState } from "react";
import LayoutSelector from "../components/LayoutSelector";


export default function CreateComic() {
  const [story, setStory] = useState("");
  const [style, setStyle] = useState("default");
  const [layout, setLayout] = useState("single");
  const [panels, setPanels] = useState([]);
  const [bubbles, setBubbles] = useState({});
  const [loading, setLoading] = useState(false); // 🔄 Loading state

  const generateComic = async () => {
    setLoading(true); // Start loading
    try {
      const res = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ story, style, layout })
      });

      if (!res.ok) {
        throw new Error("Failed to generate comic.");
      }

      const data = await res.json();
      setPanels(data.panels);
      localStorage.setItem("wordtoon_" + Date.now(), JSON.stringify(data.panels));
    } catch (err) {
      console.error(err);
      alert("Something went wrong while generating the comic.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleBubbleChange = (index, value) => {
    setBubbles(prev => ({ ...prev, [index]: value }));
  };

  return (
    <div className="App">
      <h1>Create Comic</h1>

      <textarea
        rows={4}
        value={story}
        onChange={(e) => setStory(e.target.value)}
        placeholder="Enter your story..."
      />

      <select value={style} onChange={(e) => setStyle(e.target.value)}>
        <option value="default">Default</option>
        <option value="anime">Anime</option>
        <option value="sci-fi">Sci-Fi</option>
        <option value="fantasy">Fantasy</option>
        <option value="noir">Noir</option>
      </select>

      <LayoutSelector selectedLayout={layout} setSelectedLayout={setLayout} />

      <button onClick={generateComic} disabled={loading}>
        {loading ? "Generating..." : "Generate Comic"}
      </button>

      <div id="comic-page" className={`comic-layout ${layout}`}>
        {panels.map((p, i) => (
          <div key={i} className="comic-panel">
            <img src={p.image} alt={`panel-${i}`} />
            <p>{p.prompt}</p>
            <input
              type="text"
              placeholder="Speech bubble text"
              value={bubbles[i] || ""}
              onChange={(e) => handleBubbleChange(i, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
