import ImageComponent from "./ImageComponent";
import { useState } from "react";
import { useLocation } from 'react-router-dom';

function ImagesGrid({imagesArray}) {
  const [isFullSize, setIsFullSize] = useState(null);
  const [fullSizeImageId, setFullSizeImageId] = useState(null);

  if (!imagesArray) {
    return <div>Loading...</div>;
  }

  // Remove duplicates
  const seen = new Set();
  const uniqueImagesArray = imagesArray.filter(el => {
    const duplicate = seen.has(el.id);
    seen.add(el.id);
    return !duplicate;
  });

  // Dividing into 4 parts to map 4 uniform columns for layout rather than grid for maintaining image ratio

  const quarterLength = Math.ceil(uniqueImagesArray.length / 4);
  const part1 = uniqueImagesArray.slice(0, quarterLength);
  const part2 = uniqueImagesArray.slice(quarterLength, quarterLength * 2);
  const part3 = uniqueImagesArray.slice(quarterLength * 2, quarterLength * 3);
  const part4 = uniqueImagesArray.slice(quarterLength * 3, uniqueImagesArray.length);

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
      />
    </div>
  );

  return (
    <>
    <div className='flex flex-row justify-center w-full '>
      <div className='flex flex-row max-w-screen-lg w-full'>
        <div className="flex flex-row gap-1 w-full">

          
          <div className="flex flex-col md:flex-row gap-1 w-full">
            <div className="flex flex-col gap-1 w-full">
              {part1.map((image,index)=>renderImageComponent(image, index, 1))}
            </div>
            <div className="flex flex-col gap-1 w-full">
            {part2.map((image,index)=>renderImageComponent(image, index, 2))}
            </div>
          </div>
          
          
          <div className="flex flex-col md:flex-row gap-1 w-full">
            <div className="flex flex-col gap-1 w-full">
            {part3.map((image,index)=>renderImageComponent(image, index, 3))}
            </div>
            <div className="flex flex-col gap-1 w-full">
            {part4.map((image,index)=>renderImageComponent(image, index, 4))}
            </div>
          </div>

          
        </div>
      </div>
    </div>
    </>
  )
}

export default ImagesGrid;