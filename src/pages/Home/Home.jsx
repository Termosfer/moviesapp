import React, { useState } from 'react'
import { FaCircleChevronRight } from "react-icons/fa6";

import Slider from '../../components/swiper/Slider'
import { FaFacebookF, FaXTwitter, FaWhatsapp, FaFacebookMessenger, FaReddit, FaTelegram, FaAngleRight } from "react-icons/fa6";
import { FaList, FaPlayCircle } from "react-icons/fa";
import "./home.css"
import Card from '../../components/card/Card';
import { useGetTVshowsQuery, useGetMovieByNameQuery } from '../../service/moviesdata';
import PopularMovies from '../../components/popularM/PopularMovies';
import PopulatTv from '../../components/popularTv/PopulatTv';
import Comingsoon from '../../components/comingsoon/Comingsoon';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate =  useNavigate()
  const [active, setActive] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('movies')
  const { data: tvShows, isLoading: tvLoading, error: tvError } = useGetTVshowsQuery([]);
  const { data: movies, isLoading: moviesLoading, error: moviesError } = useGetMovieByNameQuery([]);
  const handleCategoryChange = (category) => {
    setActive(!active)
    setSelectedCategory(category);
  };

const clickhandler = ()=>{
  navigate("/comingsoon")
}

  return (
    <div className='main-div'>
      <div className='container-fluid px-5'>
        <section className='section'>
          <Slider />
          <div className='d-flex align-items-center justify-content-center gap-2 mt-3'>
            <div className='section__spans'>
              <span className='section-span my-0'>17.9k</span>
              <span className='section-span1 my-0'>Shares</span>
            </div>
            <div className='div face'><FaFacebookF />5.3k</div>
            <div className='div twit'><FaXTwitter />1.5k</div>
            <div className='div what'><FaWhatsapp />598</div>
            <div className='div messe'><FaFacebookMessenger />454</div>
            <div className='div redd'><FaReddit />8.9k</div>
            <div className='div tele'><FaTelegram className='mx-auto' /></div>
          </div>
        </section>
        <section className='section1 py-5'>
          <p>With so many movies streaming sites claiming to be free and safe, it's only wise to do extensive research to choose the best one!</p>
          <span>With the explosion of hd streaming services, there are more and more streaming sites promising to be a safe place for movie watching enthusiasts. However, many of them can be very dangerous as they can steal your private info. Therefore, stick with streaming sites that don’t require any registration or sign-up, stick with FreeMoviesWatch.cc. With thousands of movies and series HD in stock, high quality, and other extraordinary features, FreeMoviesWatch.cc is among the best free online movie streaming sites you can find on the Internet. No matter what movies you are longing to watch, be it the latest blockbusters or a long-forgotten movie, you are highly likely to find them here. Make a list, and watch them all when time allows! </span>
        </section>
        <section className='pb-4'>
          <div className='d-flex align-items-center gap-5'>
            <div className='trending-div py-2 px-4'>Trending <FaAngleRight /></div>
            <div className={`list-div ${active ? "" : "active"}`} onClick={() => handleCategoryChange('movies')}><FaPlayCircle />Movies</div>
            <div className={`list-div ${active ? "active" : ""}`} onClick={() => handleCategoryChange('tvShows')} ><FaList />TV Shows</div>
          </div>
        </section>
        {selectedCategory === 'tvShows' && (
          <Card data={tvShows} />
        )
        }
        {selectedCategory === 'movies' && (
          <Card data={movies} />
        )}

        <section className='py-5'>
          <div className='d-flex pb-4'>
            <div className='trending-div py-2 px-4'>Popular Movies <FaAngleRight />
            </div>
          </div>
          <PopularMovies />
          <div className='d-flex pt-5 pb-4'>
            <div className='trending-div py-2 px-4'>Popular TV Shows <FaAngleRight />
            </div>
          </div>
          <PopulatTv />
          <div className='d-flex align-items-center justify-content-between pt-5 pb-4'>
            <div className='trending-div py-2 px-4'>Coming Soon <FaAngleRight />
            </div>
              <div className='view' onClick={clickhandler}>View more <FaCircleChevronRight />
              </div>
          </div>
          <Comingsoon />
        </section>
      </div>
    </div>
  )
}

export default Home