import React, { useState, useEffect } from 'react';

export default function MyComics() {
  const [savedComics, setSavedComics] = useState([]);

  useEffect(() => {
    const keys = Object.keys(localStorage).filter(k => k.startsWith("wordtoon_"));
    const comics = keys.map(k => {
      try {
        const panels = JSON.parse(localStorage[k]);
        if (panels && Array.isArray(panels)) {
          return { id: k, panels };
        }
      } catch {
        // Invalid JSON, skip
      }
      return null;
    }).filter(Boolean);
    setSavedComics(comics);
  }, []);

  const deleteComic = (id) => {
    localStorage.removeItem(id);
    setSavedComics(savedComics.filter(c => c.id !== id));
  };

  return (
    <div className="App">
      <h1>📁 My Comics</h1>
      {savedComics.map((comic, idx) => (
        <div key={comic.id} style={{ marginBottom: "2rem" }}>
          <h3>Comic #{idx + 1}</h3>
          <div className="grid grid-cols-2 gap-2">
            {comic.panels.map((p, i) => (
              <img key={i} src={p.image} alt={`comic-${idx}-panel-${i}`} />
            ))}
          </div>
          <button onClick={() => deleteComic(comic.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
