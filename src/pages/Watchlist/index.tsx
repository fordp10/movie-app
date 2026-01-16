import { Link } from "react-router-dom";
import { BsBookmarkX } from "react-icons/bs";

import { MovieCard } from "@/common";
import { useWatchlist } from "@/context/watchlistContext";
import { smallMaxWidth } from "@/styles";

const Watchlist = () => {
  const { watchlist } = useWatchlist();

  return (
    <section className={`${smallMaxWidth} pt-24 min-h-screen`}>
      <h1 className="text-2xl font-bold dark:text-gray-50 text-gray-900 mb-6">
        My Watchlist
      </h1>

      {watchlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <BsBookmarkX className="text-6xl dark:text-gray-500 text-gray-400" />
          <h2 className="text-xl dark:text-gray-300 text-gray-700 font-medium">
            Your watchlist is empty
          </h2>
          <p className="dark:text-gray-400 text-gray-600 text-center max-w-md">
            Start adding movies and TV shows to your watchlist by clicking the bookmark icon on any title.
          </p>
          <Link
            to="/"
            className="mt-4 py-2 px-6 bg-[#ff0000] text-gray-50 rounded-full text-sm shadow-md hover:-translate-y-1 transition-all duration-300 font-medium font-nunito"
          >
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="flex flex-wrap xs:gap-4 gap-[14px] justify-center">
          {watchlist.map((item) => (
            <div
              key={item.id}
              className="flex flex-col xs:gap-4 gap-2 xs:max-w-[170px] max-w-[124px] rounded-lg lg:mb-6 md:mb-5 sm:mb-4 mb-[10px]"
            >
              <MovieCard movie={item} category={item.category} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Watchlist;
