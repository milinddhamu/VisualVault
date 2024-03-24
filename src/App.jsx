import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import ImagesGrid from './components/ImagesGrid';
import { useDispatch,useSelector } from 'react-redux';
import { setInputString } from "./redux/slice/inputSlice";


function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const inputString = useSelector(state => state.input);
  const fetchImages = useCallback(async (page) => {
    if (loading) return; // Add this line
    setLoading(true);
    try {
      const url = inputString.trim().length === 0 
        ? `https://api.pexels.com/v1/curated?per_page=20&page=${page}`
        : `https://api.pexels.com/v1/search?query=${encodeURIComponent(inputString)}&per_page=20&page=${page}`;
  
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
  }, [loading,inputString]);

  useEffect(() => {
    fetchImages(page);
  }, [page,inputString]);
  
  useEffect(() => {
    // Clear the data state when the inputString changes
    if(inputString !== ""){
      setData([]);
    }
  }, [inputString]);

  const observer = useRef();
  const lastImageElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1);
      }
    })
    if (node) observer.current.observe(node);
  }, [loading]);

  return (
    <div className='flex flex-col w-full items-center relative'>
      {(data && data.length !== 0) && <ImagesGrid imagesArray={data} />}
      {(data.length === 0 && loading) && "Loading...."}
      <div ref={lastImageElementRef} className='h-10'></div>
    </div>
  );
}

export default App;