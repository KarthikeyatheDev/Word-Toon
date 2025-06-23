import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateComic from "./pages/CreateComic";
import MyComics from "./pages/MyComics";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateComic />} />
        <Route path="/mycomics" element={<MyComics />} />
      </Routes>
    </>
  );
}

export default App;
