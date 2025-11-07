import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Menu, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function Navbar({
  setSearchData,
  links = ['Home', 'About', 'Contact'],
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState('');
  const navRef = useRef(null);
  const navigate = useNavigate(); // Hook điều hướng

  // Scroll handling for navbar visibility
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || 0;
      setShowNavbar(y < lastScrollY || y < 10);
      setLastScrollY(y);
      setScrolled(y > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Resize observer for navbar height
  useEffect(() => {
    const setNavHeight = () => {
      const h = navRef.current?.offsetHeight || 0;
      document.documentElement.style.setProperty('--nav-h', `${h}px`);
    };
    setNavHeight();
    const ro =
      'ResizeObserver' in window ? new ResizeObserver(setNavHeight) : null;
    if (ro && navRef.current) ro.observe(navRef.current);
    window.addEventListener('resize', setNavHeight);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', setNavHeight);
    };
  }, []);

  // Handle Esc key for closing the mobile menu
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  // Handle search on Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      handleSearch(search.trim());
    }
  };

  // Perform search and navigate to the search results page
  const handleSearch = async (value) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=vi&page=1`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    };

    if (value === '') return setSearchData([]);
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setSearchData(data.results); // Update search data
      navigate('/search'); // Navigate to search page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-70 transition-transform duration-300
          ${showNavbar ? 'translate-y-0' : '-translate-y-full'}
          ${
            scrolled
              ? 'bg-black/70 backdrop-blur-md shadow-md'
              : 'bg-transparent'
          }
        `}
      >
        <div className='flex items-center justify-between w-full px-4 py-4 mx-auto md:px-10'>
          {/* Logo */}
          <a
            href='/'
            className='text-3xl font-bold tracking-wide text-transparent uppercase md:text-4xl bg-gradient-to-r from-red-500 to-pink-400 bg-clip-text'
          >
            Movie
          </a>

          {/* Links Desktop */}
          <div className='hidden space-x-10 md:flex'>
            {links.map((label) => (
              <a
                key={label}
                href='/'
                className='text-white transition hover:text-pink-400'
              >
                {label}
              </a>
            ))}
          </div>

          {/* Search + Toggle */}
          <div className='flex items-center space-x-4'>
            <div className='relative flex items-center py-1 pl-3 bg-white rounded-full pr-9'>
              <input
                type='text'
                placeholder='Search...'
                className='w-32 px-2 py-1 text-sm text-black bg-transparent md:w-40 focus:outline-none'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown} // Trigger handleSearch on Enter
                aria-label='Search movies'
              />
              <Search className='absolute w-5 h-5 text-gray-500 pointer-events-none right-3 top-2' />
            </div>

            <button
              className='text-white md:hidden'
              aria-label='Open menu'
              onClick={() => setIsOpen(true)}
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key='mobileMenu'
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.36, ease: 'easeInOut' }}
              className='fixed inset-0 flex flex-col items-center justify-center z-90 md:hidden bg-black/90 backdrop-blur-md gap-y-6'
              role='dialog'
              aria-modal='true'
            >
              <button
                aria-label='Close menu'
                onClick={() => setIsOpen(false)}
                className='absolute p-2 rounded-full top-4 right-4 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40'
              >
                <X size={28} className='text-white' />
              </button>

              {links.map((label) => (
                <motion.a
                  key={label}
                  href='/'
                  onClick={() => setIsOpen(false)}
                  className='text-2xl font-semibold text-white transition-all hover:text-pink-400'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {label}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
