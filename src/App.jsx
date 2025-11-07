import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchList from './pages/SearchList';

function App() {
  const [searchData, setSearchData] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  // Fetch dữ liệu phim hot và đề cử khi trang load
  useEffect(() => {
    const fetchMovies = async () => {
      const urls = [
        'https://api.themoviedb.org/3/trending/movie/day?language=vi',
        'https://api.themoviedb.org/3/movie/top_rated?language=vi',
      ];
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };
      try {
        const responses = await Promise.all(
          urls.map((url) => fetch(url, options).then((res) => res.json()))
        );
        setTrendingMovies(responses[0].results);
        setTopRatedMovies(responses[1].results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <Router>
      <div className='w-full h-full bg-black'>
        <Navbar setSearchData={setSearchData} />
        <Routes>
          <Route
            path='/'
            element={
              <Home
                searchData={searchData}
                trendingMovies={trendingMovies}
                topRatedMovies={topRatedMovies}
              />
            }
          />
          <Route
            path='/search'
            element={<SearchList searchData={searchData} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
