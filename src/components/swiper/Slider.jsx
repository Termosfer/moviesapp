import { FaPlay } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./slider.css";

import { Pagination, Navigation } from "swiper/modules";
import {
  useGetGenresMovieListQuery,
  useGetMovieByNameQuery,
} from "../../service/moviesdata";
import { original_img } from "../../api/api";
import { useNavigate } from "react-router-dom";
const Slider = () => {
  const navigate = useNavigate();
  const {
    data: movieData,
    isLoading: isMovieLoading,
    error: movieDataError,
  } = useGetMovieByNameQuery([]);
  const {
    data: genresMoviesData,
    isLoading: isGenresMoviesLoading,
    error: genresMoviesError,
  } = useGetGenresMovieListQuery();
  const handleClick = (id) => {
    navigate(`details/${id}`);
  };
  console.log(movieData, "asd");

  if (isMovieLoading) {
    return (
      <div
        style={{ height: "65vh" }}
        className="d-flex align-items-center justify-content-center text-center text-light"
      >
        <div className=" spinner-border" role="status"></div>
      </div>
    );
  }

  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={1}
        loop={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {movieData?.results?.map((item) => {
          const genresName = item.genre_ids
            .map(
              (id) =>
                genresMoviesData?.genres.find((gen) => gen.id === id)?.name
            )
            .filter((name) => name)
            .join(", ");
          return (
            <SwiperSlide key={item.id}>
              <img
                src={original_img + item.backdrop_path}
                alt="img"
                className="img"
              />
              <div className="img-details p-4">
                <div className="pb-3">
                  <h3 className="h3">{item.title}</h3>
                  <span className="text-light">
                    {item.overview.slice(0, 150)} ...
                  </span>
                </div>
                <div className="details-info p-3">
                  <span className="text-light">Genre: {genresName}</span>
                  <span className="text-light">
                    Release Date: {item.release_date}
                  </span>
                  <span className="text-light">Score: {item.vote_average}</span>
                </div>
                <div className="pt-4">
                  <button
                    className="btn d-flex align-items-center gap-3"
                    onClick={() => handleClick(item.id)}
                  >
                    <FaPlay />
                    Watch
                  </button>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Slider;
