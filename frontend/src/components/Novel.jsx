import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';  // Added Link import
import ChapterList from './ChapterList';
import Chapter from './Chapter';
import API_BASE from '../api/api';


const Novel = () => {
  const { id } = useParams();
  const [novel, setNovel] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleChapterSelect = (chapter) => {
    setCurrentChapter(chapter);
  };

  useEffect(() => {
    const fetchNovel = async () => {
      try {
        const response = await fetch(`${API_BASE}/novels/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setNovel(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        console.error('Error fetching novel:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNovel();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!novel) return <div>Novel not found. Please check the server connection.</div>;

  return (
    <div>
      <h1>{novel.title}</h1>
      <p>by {novel.author}</p>
      <p>{novel.description}</p>

      {currentChapter ? (
        <Chapter
          chapter={currentChapter}
          novelId={novel.id}
          onBack={() => setCurrentChapter(null)}
          onSelectChapter={handleChapterSelect}
        />
      ) : (
        <>
          <ChapterList
            chapters={novel.chapters}
            onSelectChapter={handleChapterSelect}
          />
          {/* <Link to={`/novel/${novel.id}/add-chapter`}>
            <button style={{
              margin: '20px 0',
              padding: '10px 20px',
              backgroundColor: '#2a6496',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              + Add New Chapter
            </button>
          </Link>*/}
        </>
      )}
    </div>
  );
};

export default Novel;