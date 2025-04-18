import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Novel from './components/Novel';
import Navbar from './components/Navbar';
import './App.css';
// import AddChapter from './components/AddChapter';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/novel/:id" element={<Novel />} />
            {/* <Route path="/novel/:novelId/add-chapter" element={<AddChapter />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;