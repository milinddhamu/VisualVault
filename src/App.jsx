import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import ImagesGrid from './components/ImagesGrid';
import { useSelector } from 'react-redux';

function App() {
  const [data, setData] = useState([]); // Initializing empty array ,To access prevData without null error.
  const [loading, setLoading] = useState(false); // Loading state for data fetching.
  const [page, setPage] = useState(1); // State for pagination.
  const inputString = useSelector(state => state.input); // Extracting data from Input state of Navbar search.
  const url = inputString.trim().length === 0 
    ? `https://api.pexels.com/v1/curated?per_page=20&page=${page}`
    : `https://api.pexels.com/v1/search?query=${encodeURIComponent(inputString)}&per_page=20&page=${page}`; // Two endpoints for fetching random or search images.

  const fetchImages = useCallback(async (page) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': import.meta.env.VITE_API_KEY
        }
      });
      const data = response?.data;
      setData((prevData) => [...prevData, ...data.photos]);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
  }, [loading,inputString]); // Using useCallback here to cache the function if loading or input string state doesnt change.

  useEffect(() => {
    fetchImages(page);
  }, [page,inputString]); // To call the function whenever page & input string data gets updated.
  
  useEffect(() => {
      setData((prev)=>[]);
  }, [inputString]); // Clear the data state when the inputString changes to switch between search and random images

  const observer = useRef(); // Creating a ref
  const lastImageElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect(); // if observer is already set somewhere then disconnect it.
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1); // Incrementing as per previous state when the ref element intersecting the view (or gets in view.)
      }
    })
    if (node) observer.current.observe(node); // setting to observe the node when its rendered.

  }, [loading,data]); // Used useCallback here to cache the fn and run it only when loading is changed so it doesnt fetch data again and again when user is at bottom of the page.

  return (
    <div className='flex flex-col w-full items-center relative'>
      {(data.length !== 0) && <ImagesGrid imagesArray={data} />}
      {(data.length === 0 && loading) && "Loading...."}
      <div ref={lastImageElementRef} className='h-10'></div> {/* Displaying an element at last for pagination */}
    </div>
  );
}

export default App;