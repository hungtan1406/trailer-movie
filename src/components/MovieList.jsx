import { useContext } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { MovieContext } from '../context/MovieDetailContext';

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 10 },
  desktop: { breakpoint: { max: 3000, min: 1200 }, items: 6 },
  tablet: { breakpoint: { max: 1200, min: 600 }, items: 3 },
  mobile: { breakpoint: { max: 600, min: 0 }, items: 2 },
};

const MovieList = ({ title, data }) => {
  const { handleVideoTrailer } = useContext(MovieContext);

  return (
    <div className='max-w-full px-4 py-6'>
      <h2 className='mb-4 text-xl text-white uppercase'>{title}</h2>

      <Carousel
        responsive={responsive}
        draggable={false}
        containerClass='pb-4'
        itemClass='px-2 gap-2'
        removeArrowOnDeviceType={['mobile']}
      >
        {data?.map((movie) => {
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
      </Carousel>
    </div>
  );
};

export default MovieList;
