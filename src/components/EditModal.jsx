import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateFavorite } from '../redux/slice/favoritesSlice';
import { toast } from 'react-toastify';
import validator from 'validator';
import { IoCloseSharp } from "react-icons/io5";
import { useLocation } from 'react-router-dom';
import { updateImage } from '../redux/slice/indexSlice';

function EditModal({image,setIsModelOpen}) {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;
  // Initializing state as per Image data
  const [editData, setEditData] = useState({
    photographer:image.photographer,
    alt:image.alt,
    url:image.url
  });


  // Function to update the component state of the fields
  const handleChange = (field) => (event) => {
    setEditData({
      ...editData,
      [field]: event.target.value,
    });
  };

  // Function to submit the modal data to store into redux state
  const handleSubmit = (event) => {
    event.preventDefault();
    if(urlRegexTest){
      if(currentPath === "/"){
        dispatch(updateImage({ id: image.id, ...editData }));
        setIsModelOpen(false);
        toast(`${image.id} updated successfully`)
      } else if(currentPath === "/favorites"){ 
          dispatch(updateFavorite({ id: image.id, ...editData }));
          setIsModelOpen(false);
          toast(`${image.id} updated successfully`)
        }
    } else {
      toast.error("Please provider valid URL")
    }
  };

  const handleCloseModal = () => setIsModelOpen(false)

  const urlRegex = /^(https?|ftp):\/\/(?:www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(?:\/[^\s]*)?$/;
  const urlRegexTest = urlRegex.test(editData.url); // regex test variable either returns true or false
  // const isUrlValid = validator.isURL(editData.url) ----> its a package to properly checkout for valid link even if those are any type of url
  return (
    <div className="fixed top-0 right-0 left-0 flex h-dvh max-h-dvh z-50 w-full justify-center">
        <div className="flex h-full w-full justify-center items-center backdrop-brightness-50 backdrop-blur-sm max-w-screen-lg">
          <div className="bg-stone-950 p-4 rounded-sm w-1/3 min-w-96 relative">
            <span className="flex flex-col gap-4 items-end">
              <h1 className="place-self-center text-sm font-semibold tracking-widest">UPDATE IMAGE INFORMATION</h1>
              <div className='border-b w-full'>
              </div>
              <span className='flex flex-col w-full gap-2  '>
              <p className='place-self-start text-sm text-gray-400'>Photographer's name :</p>
              <input 
                className="focus:outline-none p-2 w-full bg-stone-900" 
                value={editData.photographer || ""}
                onChange={handleChange('photographer')}
                />
                </span>
              <span className='flex flex-col w-full gap-2  '>
              <p className='place-self-start text-sm text-gray-400'>Photographer's link :</p>
              <textarea 
                className={`focus:outline-none p-2 w-full ${urlRegexTest ? "text-green-500" : "text-red-500"} bg-stone-900`} 
                value={editData.url || ""}
                onChange={handleChange('url')}
                />
                </span>
                <span className='flex flex-col w-full gap-2  '>
              <p className='place-self-start text-sm text-gray-400'>Description :</p>
              <textarea 
                className="focus:outline-none p-2 w-full bg-stone-900"
                value={editData.alt || ""}
                onChange={handleChange('alt')}
                />
                </span>
              <span className="flex flex-row gap-2">

              <button 
                type="submit" 
                className="bg-red-500 hover:bg-red-700 font-semibold tracking-tight p-1 px-2 rounded-sm text-sm" 
                onClick={handleCloseModal}>Cancel</button>

              <button 
                type="submit" 
                className="bg-violet-500 hover:bg-violet-700 font-semibold tracking-tight p-1 px-2 rounded-sm text-sm"
                onClick={handleSubmit}
                >Submit</button>

              </span>
            </span>
            <button 
              className='absolute top-0 right-0 m-4'
              onClick={handleCloseModal}
              >
             <IoCloseSharp className='hover:text-violet-500 text-lg' /> 
            </button>
          </div> 
      </div>
    </div>
  )
}

export default EditModal