import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="App">
      <h1>🎨 Welcome to WordToon</h1>
      <p>Turn your stories into beautiful AI-generated comics with custom styles and layouts.</p>
      <Link to="/create">
        <button>Start Creating</button>
      </Link>
    </div>
  );
}
