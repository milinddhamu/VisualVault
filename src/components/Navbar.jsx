import { useDispatch,useSelector } from 'react-redux';
import { setInputString } from "../redux/slice/inputSlice";
import { Link, useLocation } from 'react-router-dom';
import { HiHome, HiCollection } from "react-icons/hi";

function Navbar() {
  const dispatch = useDispatch();
  const inputString = useSelector(state => state.input);
  const handleInputChange = (event) => {
    dispatch(setInputString(event.target.value));
  };
  const location = useLocation();
  const PagePath = location.pathname;
  const isIndexPage = PagePath === "/"
  const isfavoritesPage = PagePath === "/favorites"
  if(!isIndexPage && !isfavoritesPage){
    return;
  }

  return (
    <div className='fixed z-10 flex w-full top-0 h-16 bg-black/50 backdrop-blur-xl max-w-screen-lg p-2 border-b-4 border-violet-500/50'>
      <div className='flex flex-row w-full gap-2'>
        <input 
          placeholder={isIndexPage ? 'Search photos..' : 'Search my photos..'}
          className={`flex w-full p-4 focus:outline-none bg-black`}
          onChange={handleInputChange}
          value={inputString}
          />
          <Link 
            to={PagePath === '/' ? '/favorites' : '/'}
            className='bg-violet-500 hover:bg-violet-700 transition-all w-full px-4 h-full flex items-center justify-center tracking-tighter font-semibold max-w-fit gap-2'>
            {!isfavoritesPage ? <><HiCollection /> My Favorites</> : <><HiHome /> Home</>}
          </Link>
      </div>
    </div>
  )
}

export default Navbar