/* eslint-disable react/prop-types */

import { IoHeartSharp } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites,removeFromFavorites } from '../redux/slice/favoritesSlice';
import { toast } from 'react-toastify';
import { useState } from "react";
import { SlSizeActual,SlSizeFullscreen } from "react-icons/sl";
import '../index.css';
import { AiFillEdit } from "react-icons/ai";
import EditModal from "./EditModal";

function ImageComponent({
      image,
      isFullSize,
      onImageClick
    }) {
  const favoritesList = useSelector(state => state.favorites);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const dispatch = useDispatch();
  const isInFavoritesList = favoritesList.find((item)=> item.id === image.id);
  const AdditionToast = () => toast("❤️ Added to favorites");
  const RemovalToast = () => toast("💔 Removed from favorites");
  const handleAddToFavorites = () => {
    if (isInFavoritesList) {
      dispatch(removeFromFavorites(image.id));
      RemovalToast()
    } else {
      dispatch(addToFavorites(image));
      AdditionToast()
    }
  };

  const imgStyle = isFullSize ? {
    position: 'fixed',
    height: '80%',
    width: 'auto',
    objectFit: 'cover',
    zIndex: 20,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  } : {};

  return (
    <>
    <div className={`relative group ${isFullSize ? 'dark-background mx-auto max-w-screen-lg' : ''} `}>
      <h1
        className={`${!isFullSize ? "hidden group-hover:flex" : "flex text-base"} absolute top-0 m-1 mx-2 text-xs font-bold gap-1 items-center mt-10`}
        id={image.id}
        title={image.title}
        >
      {image.title}
      </h1>
          <img 
          src={image.url} 
          alt={image.title} 
          width="100%" 
          height="auto"
          className={`${!isFullSize ? `group-hover:opacity-30` : ""} transition-all duration-250 ease-linear`}
          style={imgStyle}
          />
        <p 
          className={`${!isFullSize ? "hidden group-hover:flex" : "text-base"} absolute bottom-0 text-xs m-1 italic`}
          title={image.description}
          id={image.description}
          >&quot;{image.description}&quot;</p>
        <div className={`${!isFullSize ? "hidden group-hover:flex m-1" : "flex m-2"} flex-col justify-center items-center absolute top-0 right-0`}>
        <span className={`hover:scale-125 transition-all ease-in text-lg hover:text-red-500`}>
          <button id="Add-to-favorites" title={isInFavoritesList ? "Remove from favorites":"Add to favorites"} onClick={handleAddToFavorites}>
            <IoHeartSharp className={`${isInFavoritesList ? "text-red-500" : ""} ${isFullSize ? "text-xl":""}`} />
          </button>
        </span>
          <button 
            id="resize" 
            title={isFullSize ? "Zoom-out" : "Zoom-in"}
            onClick={onImageClick} className={`${isFullSize ? "text-base":"text-xs"} hover:text-violet-500 hover:scale-110 transition-all ease-in relative`}>
            {isFullSize ? <SlSizeActual /> : <SlSizeFullscreen />}
          </button>
          </div>
          <button 
          className="absolute top-0 left-0 m-2 bg-white text-black p-1 rounded-md hover:text-violet-600 hover:bg-gray-200 transition-all"
          onClick={()=> setIsModelOpen(!isModelOpen)}
          >
            <AiFillEdit />
            </button>

      </div>
        {isModelOpen &&
          <EditModal image={image} setIsModelOpen={setIsModelOpen} />}      
    </>
  );
}
export default ImageComponent;