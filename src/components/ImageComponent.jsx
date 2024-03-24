import { BsCamera2 } from "react-icons/bs";
import { IoHeartSharp } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites,removeFromFavorites } from '../redux/slice/favoritesSlice';
import { toast } from 'react-toastify';
import { useState } from "react";
import { SlSizeActual,SlSizeFullscreen } from "react-icons/sl";
import '../index.css';
import { useLocation } from 'react-router-dom';
import { AiFillEdit } from "react-icons/ai";
import EditModal from "./EditModal";

function ImageComponent({
      image,
      isFullSize,
      onImageClick,
    }) {
  const favoritesList = useSelector(state => state.favorites);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
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
      <a
        className={`${!isFullSize ? "hidden group-hover:flex" : "flex text-base"} hover:underline absolute top-0 m-1 mx-2 text-xs font-bold gap-1 items-center z-10 ${location.pathname === "/favorites" && "mt-10"}`}
        href={image.url}
        target="_blank"
        rel="noopener noreferrer" 
        id={image.url}
        title={image.photographer}
        >
      <BsCamera2 className={`text-base  ${isFullSize && "mt-1"}`} />
      {image.photographer}
      </a>
          <img 
          src={image.src.large} 
          alt={image?.alt || image.photographer} 
          width="100%" 
          height="auto"
          className={`${!isFullSize ? `group-hover:opacity-30` : ""} transition-all duration-250 ease-linear`}
          style={imgStyle}
          />
        <p 
          className={`${!isFullSize ? "hidden group-hover:flex" : "text-base"} absolute bottom-0 text-xs m-1 italic`}
          title={image?.alt}
          id={image?.alt}
          >&quot;{image.alt}&quot;</p>
        <div className={`${!isFullSize ? "hidden group-hover:flex m-1" : "flex m-2"} flex-col justify-center items-center absolute top-0 right-0`}>
        <span className={`hover:scale-125 transition-all ease-in text-lg hover:text-red-500`}>
          <button id="Add-to-favorites" onClick={handleAddToFavorites}>
            <IoHeartSharp className={`${isInFavoritesList ? "text-red-500" : ""} ${isFullSize ? "text-xl":""}`} />
          </button>
        </span>
          <button id="resize" onClick={onImageClick} className={`${isFullSize ? "text-base":"text-xs"} hover:text-violet-500 hover:scale-110 transition-all ease-in relative`}>
            {isFullSize ? <SlSizeActual /> : <SlSizeFullscreen />}
          </button>
          {isFullSize &&
          <span className="text-xs bg-gray-200 text-black rounded-md px-2 mt-2">close</span>}
        
          </div>

        {location.pathname === "/favorites" && 
          <button 
          className="absolute top-0 left-0 m-2 bg-white text-black p-1 rounded-md hover:bg-gray-400"
          onClick={()=> setIsModelOpen(!isModelOpen)}
          >
            <AiFillEdit />
            </button>}

      </div>
        {location.pathname === "/favorites" &&
        (isModelOpen &&
          <EditModal image={image} setIsModelOpen={setIsModelOpen} />)}      
    </>
  );
}
export default ImageComponent;