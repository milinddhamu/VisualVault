import { Routes, Route } from 'react-router-dom';
import NotFound from '../components/NotFound';
import App from '../App';
import Favorites from '../components/Favorites';
import Navbar from '../components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppRouter = () => {
  return (
    <div className='flex flex-col w-full items-center gap-2 mt-16'>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route element={<NotFound />} />
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          limit={2}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          />
    </div>
  );
};

export default AppRouter;
