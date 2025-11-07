import React from 'react';
import Banner from '../components/Banner';
import MovieList from '../components/MovieList';

const Home = ({ searchData, trendingMovies, topRatedMovies }) => {
  return (
    <div>
      {searchData.length === 0 && (
        <div>
          <Banner />
          <div className='w-full h-full'>
            <MovieList title='Phim Hot' data={trendingMovies.slice(0, 10)} />
            <MovieList title='Phim đề cử' data={topRatedMovies.slice(0, 10)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
