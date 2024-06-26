import { useSelector } from 'react-redux';
import ImagesGrid from './ImagesGrid';
import { useState,useEffect } from 'react';
import { AiOutlineSortAscending,AiOutlineSortDescending } from "react-icons/ai";
export default function Favorites() {
  const favoritesList = useSelector(state => state.favorites);
  const [favoriteImagesList,setFavoriteImagesList] = useState(favoritesList); // Initalizing state with favorites redux state
  const [sortList,setSortList] = useState(false);
  const inputString = useSelector(state => state.input)
  const [filteredFavoriteList, setFilteredFavoriteList] = useState([]);
  useEffect(() => {
    const sortArray = (array) => {
      return [...array].sort((a, b) => {
        const nameA = a.title.toUpperCase();
        const nameB = b.title.toUpperCase();
        if (nameA < nameB) {
          return sortList ? -1 : 1;
        }
        if (nameA > nameB) {
          return sortList ? 1 : -1;
        }
        return 0;
      });
    };
  
    const sortedList = sortArray(favoritesList);
    setFavoriteImagesList(sortedList);
  
    const filteredList = sortedList.filter(image => 
      !inputString || image.title.toLowerCase().includes(inputString.toLowerCase())
    );
    setFilteredFavoriteList(filteredList);
  }, [favoritesList, sortList, inputString]);

  if(favoritesList.length === 0){
    return <div className='flex w-full h-dvh justify-center items-center'>No favorite items.</div>
  } 
  

  return (
    <div className='flex flex-col items-center w-full max-w-screen-lg'>
      <div className='flex flex-row gap-2 place-self-start items-center px-2 py-1'>
        <h1 className='font-bold'>Sort :</h1>
        <button 
          className='text-2xl bg-teal-500 p-2 m-1 hover:bg-teal-700'
          onClick={() => setSortList(!sortList)}
          >
          {sortList ?
        <AiOutlineSortAscending />: 
        <AiOutlineSortDescending />
        }
        </button>
      </div>
    <ImagesGrid imagesArray={inputString ? filteredFavoriteList:favoriteImagesList} />
    {(inputString && filteredFavoriteList.length === 0) && <div>No item found for &quot;{inputString}&quot;</div>}
    </div>
  )
}
