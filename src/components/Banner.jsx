'use client';
import ImgMovie from '../assets/temp-1.jpeg';
import IconPlay from '../assets/play-button.png';
import IconRating from '../assets/rating.png';
import IconRatingHalf from '../assets/rating-half.png';
import { motion } from 'framer-motion';

export default function Banner() {
  return (
    <section
      className='relative flex items-center w-full min-h-screen px-4 py-4 mx-auto bg-center bg-no-repeat bg-cover md:px-10'
      style={{ backgroundImage: "url('/banner-1.jpg')" }}
    >
      {/* Overlay */}
      <div className='absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80'></div>

      {/* Nội dung */}
      <div
        className='relative z-10 flex flex-col items-center justify-center w-full h-full px-4 md:flex-row md:justify-between md:px-10'
        style={{ paddingTop: 'var(--nav-h)' }}
      >
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className='flex flex-col items-start space-y-6 text-white md:w-1/2'
        >
          <h1 className='text-3xl font-bold leading-tight md:text-6xl'>
            Nghe nói em thích tôi
          </h1>

          <div className='flex items-center space-x-2'>
            {[...Array(4)].map((_, i) => (
              <img key={i} src={IconRating} alt='rating' className='w-7 h-7' />
            ))}
            <img src={IconRatingHalf} alt='rating' className='w-7 h-7' />
          </div>

          <p className='max-w-lg leading-relaxed text-gray-200'>
            Một câu chuyện tình đầy cảm xúc giữa hai con người đến từ hai thế
            giới khác biệt. Khi lòng tự tôn và định kiến bị thử thách, chỉ có
            tình yêu mới đủ mạnh để hàn gắn mọi vết thương.
          </p>

          <div className='flex space-x-5'>
            <button className='px-5 py-2 font-bold text-white transition bg-black border border-white rounded hover:scale-105'>
              Chi tiết
            </button>
            <button className='flex items-center px-5 py-2 font-bold text-white transition bg-red-600 rounded hover:scale-105'>
              <img src={IconPlay} alt='play' className='w-5 h-5 mr-2' />
              Xem phim
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='flex justify-end mt-5 md:mt-0 md:w-1/2'
        >
          <div className='relative w-[280px] md:w-[340px] h-[400px] group overflow-hidden rounded-lg shadow-xl'>
            <img
              src={ImgMovie}
              alt='movie'
              className='object-cover w-full h-full transition-transform duration-700 group-hover:scale-105'
            />
            <div className='absolute inset-0 flex items-center justify-center transition opacity-0 bg-black/40 group-hover:opacity-100'>
              <img src={IconPlay} alt='play' className='w-14 h-14' />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
