import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col gap-2 w-full h-dvh justify-center items-center -mt-16">
      <h1 className="text-4xl font-bold">404</h1>
      <h1 className="uppercase tracking-widest">page not found</h1>
      <Link to={"/"} className="p-1 px-3 bg-violet-500 hover:bg-violet-700 uppercase">
      Return to home
      </Link>
    </div>
  )
}

export default NotFound;