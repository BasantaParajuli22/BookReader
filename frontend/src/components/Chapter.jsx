import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API_BASE from '../api/api';

const Chapter = ({ chapter, novelId, onBack, onSelectChapter }) => {
  const { id } = useParams();
  const [nextChapter, setNextChapter] = useState(null);
  const [prevChapter, setPrevChapter] = useState(null);
  const [currentChapterContent, setCurrentChapterContent] = useState(chapter.content);

  useEffect(() => {
    // Fetch novel to get all chapters for navigation
    fetch(`${API_BASE}/novels/${novelId}`)
      .then(res => res.json())
      .then(novel => {
        // Handle array response from proxy
        const novelData = Array.isArray(novel) ? novel[0] : novel;
        const chapters = novelData.chapters.sort((a, b) => a.order - b.order);
        const currentIndex = chapters.findIndex(c => c.id === chapter.id);

        if (currentIndex > 0) {
          setPrevChapter(chapters[currentIndex - 1]);
        }
        if (currentIndex < chapters.length - 1) {
          setNextChapter(chapters[currentIndex + 1]);
        }
      })
      .catch(err => console.error('Error fetching novel:', err));
  }, [novelId, chapter.id]);

  const handleChapterChange = (newChapter) => {
    // Update the content when changing chapters
    setCurrentChapterContent(newChapter.content);
    // Call the onSelectChapter function to update the parent component
    onSelectChapter(newChapter);
  };

  return (
    <div>
      <button onClick={() => onBack()} style={{ marginBottom: '20px' }}>
        ← Back to Chapter List
      </button>

      <h2>{chapter.title}</h2>
      <div className="chapter-content">
        {currentChapterContent}
      </div>

      <div className="chapter-nav">
        {prevChapter && (
          <button
            onClick={() => handleChapterChange(prevChapter)}
            style={{ marginRight: '10px' }}
          >
            ← Previous: {prevChapter.title}
          </button>
        )}
        {nextChapter && (
          <button
            onClick={() => handleChapterChange(nextChapter)}
            style={{ marginLeft: '10px' }}
          >
            Next: {nextChapter.title} →
          </button>
        )}
      </div>
    </div>
  );
};

export default Chapter;