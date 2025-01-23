import { useState, useEffect, useRef } from 'react';

const ImagesPage = () => {
  const [images, setImages] = useState([]); // Store fetched images
  const [page, setPage] = useState(1); // Track the current page
  const [loading, setLoading] = useState(false); // Show loading indicator
  const observerRef = useRef(null); // Ref for the Intersection Observer

  // Fetch images from Picsum Photos API
  const fetchImages = async (page) => {
    setLoading(true);
    try {
      const res = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=50`);
      const data = await res.json();
      setImages((prev) => [...prev, ...data]); // Append new images
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  // Observe the last image to trigger more loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1); // Increment page number when the last image is visible
        }
      },
      { threshold: 1.0 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, []);

  // Fetch images whenever the page changes
  useEffect(() => {
    fetchImages(page);
  }, [page]);

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Lazy Loading Images</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {images.map((img) => (
          <div key={img.id} style={{ position: 'relative', overflow: 'hidden' }}>
            <img
              src={img.download_url}
              alt={img.author}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '10px',
              }}
            />
            <p style={{ textAlign: 'center', marginTop: '5px' }}>{img.author}</p>
          </div>
        ))}
      </div>
      {loading && <p style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</p>}
      {/* Invisible div to detect scrolling */}
      <div ref={observerRef} style={{ height: '1px' }} />
    </div>
  );
};

export default ImagesPage;
