import React from 'react';
import MovieSearch from '../components/MovieSearch';

const SearchList = ({ searchData }) => {
  return (
    <div className='max-w-full p-4 px-10'>
      {searchData.length === 0 ? (
        <p className='py-20 text-center text-white/70'>
          Không có kết quả tìm kiếm. Vui lòng thử lại!
        </p>
      ) : (
        <MovieSearch data={searchData} />
      )}
    </div>
  );
};

export default SearchList;
