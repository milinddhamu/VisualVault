/* eslint-disable react/prop-types */

import { useState, useRef, useCallback } from 'react';
import ImagesGrid from './components/ImagesGrid';
import { useSelector,useDispatch } from 'react-redux';
import { incrementPage,appendImages } from './redux/slice/indexSlice'
import { useQuery } from "@apollo/client";
import { GET_IMAGES } from './gql/queries/getImages';

function App() {
  const limit = 10;
  const dispatch = useDispatch();
  const inputString = useSelector(state => state.input); // Extracting data from Input state of Navbar search.
  const {page,data:imagesArray} = useSelector(state => state.index); // Extracting data from Index slice
  const {error,loading} = useQuery(GET_IMAGES,{ variables :{
    "limit": `${limit}`,
    "offset" : `${(page-1)*limit}`
  },
  onCompleted:(response)=>dispatch(appendImages(response.slingacademyQuery.photos)),
  onError:(e)=> console.log(`[ERROR]:${e}`)

  });
  
  const filteredImagesArray = imagesArray.filter(image => image.title.toLowerCase().includes(inputString.toLowerCase()));
  console.log(loading,page,imagesArray)

  const observer = useRef(); // Creating a ref
  const lastImageElementRef = useCallback(node => {
    if (loading) return;
    if(page === 14) return;
    if (observer.current) observer.current.disconnect(); // if observer is already set somewhere then disconnect it.
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
          dispatch(incrementPage()) // Incrementing as per previous state when the ref element intersecting the view (or gets in view.)
          // setIsDataLoaded(false); // Reset the flag as we're fetching new data
      }
    })
    if (node) observer.current.observe(node); // setting to observe the node when its rendered.
    
  }, [loading]); // Used useCallback here to cache the fn and run it only when loading is changed so it doesnt fetch data again and again when user is at bottom of the page. passing data here doesnt make much of sense as its taking its memory path and comparing to new memory path
  return (
    <div className='flex flex-col w-full items-center relative'>

      {(imagesArray.length !== 0) && <ImagesGrid imagesArray={inputString ? filteredImagesArray : imagesArray} />}

      {(imagesArray.length !== 0 && inputString && filteredImagesArray.length === 0) && 
      `No results found for "${inputString}"`}

      {(imagesArray.length === 0 && loading) && "Loading...."}

      {error && `${error}`}

      {!inputString &&
      <div ref={lastImageElementRef} className='h-10'></div>} {/* Displaying an element at last for pagination */}

    </div>
  );
}

export default App;