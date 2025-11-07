import React, { useContext, useState, useEffect } from 'react';
import { MovieContext } from '../context/MovieDetailContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PER_PAGE = 10;

const MovieSearch = ({ data = [] }) => {
  const { handleVideoTrailer } = useContext(MovieContext);
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(data.length / PER_PAGE));

  useEffect(() => {
    setPage(1);
  }, [data]);

  const start = (page - 1) * PER_PAGE;
  const end = start + PER_PAGE;
  const pageItems = data.slice(start, end);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <div className='max-w-full p-20 px-10'>
      <h2 className='mb-4 text-xl text-white uppercase'>Kết quả tìm kiếm</h2>

      <div className='flex items-center justify-center'>
        <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5'>
          {pageItems.map((movie) => {
            const poster = movie?.poster_path
              ? `${import.meta.env.VITE_IMG_URL}${movie.poster_path}`
              : '/fallback-poster.jpg';

            return (
              <div
                key={movie.id}
                className='group relative w-[200px] rounded-xl overflow-hidden bg-zinc-900/60 border border-white/10 shadow-sm hover:shadow-lg transition-shadow'
              >
                <button
                  type='button'
                  aria-label={`Play trailer for ${
                    movie.name || movie.title || movie.original_title
                  }`}
                  onClick={() => handleVideoTrailer(movie.id)}
                  className='relative block w-full overflow-hidden aspect-2/3'
                >
                  <div
                    className='absolute inset-0 transition-transform duration-500 ease-in-out bg-center bg-cover group-hover:scale-105'
                    style={{ backgroundImage: `url(${poster})` }}
                  />
                  <div className='absolute inset-x-0 bottom-0 pointer-events-none h-1/3 bg-linear-to-t from-black/70 to-transparent' />
                </button>

                <div className='absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out translate-y-full opacity-0 pointer-events-none bg-black/70 group-hover:opacity-100 group-hover:translate-y-0'>
                  <h5 className='px-2 text-lg font-semibold text-center text-white'>
                    {movie.name || movie.title || movie.original_title}
                  </h5>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className='flex items-center justify-center gap-2 mt-6'>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className='px-3 py-2 text-white rounded-md bg-white/10 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed'
        >
          <ChevronLeft size={20} />
        </button>

        <span className='text-sm text-white'>
          Trang {page} / {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className='px-3 py-2 text-white rounded-md bg-white/10 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed'
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default MovieSearch;
