import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE from './api/api';

const AddChapter = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Get the current novel
      const novelResponse = await fetch(`${API_BASE}/novels/1`);
      if (!novelResponse.ok) throw new Error('Failed to fetch novel');
      const novel = await novelResponse.json();

      // 2. Create the new chapter
      const newChapter = {
        id: novel.chapters.length + 1,
        title,
        content,
        order: novel.chapters.length + 1
      };

      // 3. Update the novel with the new chapter
      const updateResponse = await fetch(`${API_BASE}/novels/update/1`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...novel,
          chapters: [...novel.chapters, newChapter]
        }),
      });

      if (!updateResponse.ok) throw new Error('Failed to add chapter');

      // 4. Redirect back to the novel
      navigate(`/novel/1`);
    } catch (error) {
      console.error('Error adding chapter:', error);
      alert('Failed to add chapter. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Chapter</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Chapter Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            required
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Chapter'}
        </button>
      </form>
    </div>
  );
};

export default AddChapter;