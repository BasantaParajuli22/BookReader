import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API_BASE from '../api/api';

const Home = () => {
  const [novels, setNovels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/novels`)
      .then(res => res.json())
      .then(data => {
        setNovels(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching novels:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Available Novels</h1>
      {novels.map(novel => (
        <div key={novel.id} className="novel-card">
          <h2>
            <Link to={`/novel/${novel.id}`}>{novel.title}</Link>
          </h2>
          <p>by {novel.author}</p>
          <p>{novel.description}</p>
          <Link to={`/novel/${novel.id}`}>
            <button>Start Reading</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;