/* eslint-disable react/prop-types */

import ImageComponent from "./ImageComponent";
import { useState } from "react";
import { useAutoAnimate } from '@formkit/auto-animate/react'


function ImagesGrid({imagesArray,setData}) {
  const [isFullSize, setIsFullSize] = useState(null);
  const [fullSizeImageId, setFullSizeImageId] = useState(null);
  const [animationParent] = useAutoAnimate();

  if (!imagesArray) {
    return <div>Loading...</div>;
  }

  // Function for resizing per Image based on Id so only one image gets resized at a time
  const handleImageClick = (id) => {
    if (isFullSize && id === fullSizeImageId) {
      setIsFullSize(false);
      setFullSizeImageId(null);
    } else {
      setIsFullSize(true);
      setFullSizeImageId(id);
    }
  };

  // Function to render Image component for reusability
  const renderImageComponent = (image, index, column) => (
    <div key={`Col-${column}--${index}--${image.id}`}>
      <ImageComponent 
        image={image} 
        isFullSize={isFullSize && image.id === fullSizeImageId} 
        onImageClick={() => handleImageClick(image.id)}
        handleImageClick={handleImageClick}
        setData={setData} 
      />
    </div>
  );

  return (
    <>
    <div className='flex flex-row justify-center w-full '>
      <div className='flex flex-row max-w-screen-lg w-full'>
        <div ref={animationParent} className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-1 w-full">
        {imagesArray.map((image,index)=>renderImageComponent(image, index, 1))}        
        </div>
      </div>
    </div>
    </>
  )
}

export default ImagesGrid;