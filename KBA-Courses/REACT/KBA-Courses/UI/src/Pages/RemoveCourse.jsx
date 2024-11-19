import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RemoveCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${id}`);
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleRemoveCourse = async () => {
    try {
      // Send DELETE request to API
      await fetch(`/api/courses/${id}`, {
        method: 'DELETE',
      });
      // Redirect to courses list page
      navigate('/courses');
    } catch (error) {
      console.error('Failed to remove course:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
<>
  <div className="container mx-auto p-4 pt-6">
    <h1 className="text-3xl font-bold mb-4">Remove Course</h1>
    <p className="text-lg mb-6">Are you sure you want to remove the course "{course.title}"?</p>
    <div className="flex justify-end gap-4">
      <button
        onClick={handleRemoveCourse}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Remove Course
      </button>
      <button
        onClick={() => navigate('/courses')}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
      >
        Cancel
      </button>
    </div>
  </div>
</>
  );
};

export default RemoveCourse;