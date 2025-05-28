import React from 'react';

const ChapterList = ({ chapters, onSelectChapter }) => {
  return (
    <div>
      <h2>Chapters</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {chapters.sort((a, b) => a.order - b.order).map(chapter => (
          <li key={chapter.id} style={{ marginBottom: '10px' }}>
            <button
              onClick={() => onSelectChapter(chapter)}
              style={{
                background: 'none',
                border: 'none',
                color: '#2a6496',
                cursor: 'pointer',
                padding: '5px 0',
                textAlign: 'left'
              }}
            >
              {chapter.order}. {chapter.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChapterList;