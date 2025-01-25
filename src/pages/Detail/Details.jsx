import { useEffect, useState } from "react";
import "./detail.css";
import { original_img } from "../../api/api";
import { IoMdVideocam } from "react-icons/io";
import { FaAngleRight, FaMinus, FaPlay, FaPlus } from "react-icons/fa";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import Recommend from "../../components/recommend/Recommend";
import {
  useGetCastsIdQuery,
  useGetMovieDetailsQuery,
  useGetMovieYoutubeIdQuery,
  useGetRecommentIdQuery,
  useGetTvCastsIdQuery,
  useGetTvDetailsQuery,
  useGetTvRecommentIdQuery,
  useGetTvYoutubeIdQuery,
} from "../../service/moviesdata";
import Youtube from "../Youtube/Youtube";
import logo from "../../assets/logo.png";
import Dropdown from "../../components/dropdown/Dropdown";
const Details = () => {
  const { id } = useParams();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMovie, setIsMovie] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [color, setColor] = useState("#07ab4c");
  const {
    data: movieData,
    isLoading: isMovieLoading,
    error: movieError,
  } = useGetMovieDetailsQuery(id);
  const {
    data: tvData,
    isLoading: isTvLoading,
    error: tvError,
  } = useGetTvDetailsQuery(id);

  const {
    data: castData,
    isLoading: isCastLoading,
    error: castError,
  } = useGetCastsIdQuery(id);
  const {
    data: tvCastData,
    isLoading: isTvCastsLoading,
    error: tvCastError,
  } = useGetTvCastsIdQuery(id);

  const {
    data: recommend,
    isLoading: isRecommendLoading,
    error: recommendError,
  } = useGetRecommentIdQuery(id);
  const {
    data: tvRecommentData,
    isLoading: isTvRecommentLoading,
    error: tvRecommentError,
  } = useGetTvRecommentIdQuery(id);

  const {
    data: movieYoutubeData,
    isLoading: ismovieYoutubeLoading,
    error: movieYoutubeError,
  } = useGetMovieYoutubeIdQuery(id);
  const {
    data: tvYoutubeData,
    isLoading: istvYoutubeLoading,
    error: tvYoutubeError,
  } = useGetTvYoutubeIdQuery(id);

  const dat = isMovie ? movieData : tvData;
  const backdropPath = dat?.backdrop_path || dat?.poster_path;
  const posterPath = dat?.poster_path || "";
  const title = dat?.title || dat?.name || "Unknown Title";
  const overview = dat?.overview || "";
  const releaseDate =
    dat?.release_date || dat?.first_air_date || "Unknown release date";
  const runtime =
    dat?.runtime ||
    (dat?.last_episode_to_air?.runtime
      ? dat?.last_episode_to_air?.runtime
      : "N/A");
  const casts = isMovie ? castData?.cast || [] : tvCastData?.cast || [];
  const videoAvailable = isMovie
    ? movieYoutubeData?.results?.length > 0
    : tvYoutubeData?.results?.length > 0;
  const score = dat?.vote_average ?? 0;
  const filterMovieYoutube =
    movieYoutubeData?.results.filter(
      (movie) => movie.type === "Trailer" /* || movie.type === "Featurette" */
    ) ?? [];
  const filterTvYoutube =
    tvYoutubeData?.results.filter(
      (tv) =>
        tv.type ===
        "Trailer" /* || tv.type === "Featurette" || tv.type === "Clip" */
    ) ?? [];
  console.log(filterTvYoutube, "data");
  console.log(filterMovieYoutube, "movie");
  useEffect(() => {
    if (movieData && !tvData) {
      setIsMovie(true);
    } else if (!movieData && tvData) {
      setIsMovie(false);
    } else if (movieData && tvData) {
      setIsMovie(false);
    }
  }, [movieData, tvData]);

  useEffect(() => {
    if (score <= 5) {
      setColor("#dc3546");
    } else if (score > 6 && score <= 10) {
      setColor("#07ab4c");
    }
  }, [score]);
  const clickHandler = () => {
    setActive(!active);
  };
  const favorites = JSON.parse(localStorage.getItem("watchlist")) || [];
  const openHandler = () => {
    setOpen(true);
    
      const chehkData = favorites.find(fav=>fav.id === dat.id)
      if (!chehkData) {
        favorites.push(dat);
        localStorage.setItem("watchlist", JSON.stringify(favorites));
        setIsFavorite(true);
      }else {
        console.log("This movie is already in your watchlist");
      }
  };
  const removeHandle = ()=>{
  const updatedFavorite = favorites.filter(fav => fav.id !== dat.id)
  localStorage.setItem("watchlist", JSON.stringify(updatedFavorite))
  setOpen(false);
  setIsFavorite(false);
  }
  return (
    <>
      <div className="main-div">
        <div>
          {videoAvailable ? (
            <Youtube
              active={active}
              setActive={setActive}
              movieYoutubeData={filterMovieYoutube}
              tvYoutubeData={filterTvYoutube}
              isMovie={isMovie}
            />
          ) : (
            <p className="text-light">No trailer available</p>
          )}
        </div>
        <div className="container p-0">
          <p className="text-light py-3 my-0">
            {isMovie ? "Movies" : "TV Shows"} / {title}
          </p>
        </div>
        <div className="container bg px-0">
          <div className="detail-img">
            <img src={original_img + backdropPath} alt="" />
            <div className="detail-img-cover"></div>
            <img src={logo} alt="" className="detail-img-logo" />
          </div>
          <div className="row  align-items-start py-3 ">
            <div className="col">
              <img
                src={original_img + posterPath}
                alt=""
                className="poster-img"
              />
            </div>
            <div className="col-7 details-title">
              <h4 className="text-light">{title}</h4>
              <div className="d-flex align-items-center gap-2 details-inf pb-1">
                <p className="first-p" onClick={clickHandler}>
                  <IoMdVideocam />
                  Trailer
                </p>
                <p className="second-p">HD</p>
                <p
                  className="third-p"
                  style={{ color: color, border: `1px solid ${color}` }}
                >
                  Score: {score.toFixed(1)}
                </p>
              </div>

              <span>{overview}</span>
              <div className="row text-light align-items-start pt-3">
                <div className="col-5 px-0">
                  <p>
                    Released:<span className="text-light">{releaseDate}</span>
                  </p>
                  <div>
                    Genre:
                    {(isMovie ? movieData?.genres : tvData?.genres)
                      ?.map((item) => item.name)
                      .join(", ")}
                  </div>
                  <div>
                    Casts:
                    {casts
                      .slice(0, 5)
                      ?.map((item) => item.name)
                      .join(", ")}
                  </div>
                </div>
                <div className="col-6 ">
                  <p>
                    Duration:<span className="text-light">{runtime} min</span>
                  </p>
                  <div>
                    Country:
                    {(isMovie
                      ? movieData?.production_countries
                      : tvData?.production_countries
                    )
                      ?.map((item) => item.name)
                      .join(", ")}
                  </div>
                  <div>
                    Production:
                    {(isMovie
                      ? movieData?.production_companies
                      : tvData?.production_companies
                    )
                      ?.map((item) => item.name)
                      .join(", ")}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="d-flex flex-column gap-2 left-details">
                <button className=" py-2 details-btn">
                  <FaPlay className="icon" />
                  Watch List
                </button>
                {open ? (
                  <button
                    className="py-2  details-btn btn2"
                    onClick={removeHandle}
                  >
                    <FaMinus className="icon" /> Remove from favorite
                  </button>
                ) : (
                  <button
                    className="py-2  details-btn btn2"
                    onClick={openHandler}
                  >
                    <FaPlus className="icon" /> Add to favorite
                  </button>
                )}

                <div className=" py-3">
                  <span className="text-light">10 / 7 voted</span>
                  <div className="voted"></div>
                </div>
                <div className="d-flex justify-content-center gap-1">
                  <button className="like ">
                    <AiFillLike />
                    Like
                  </button>
                  <button className="like d">
                    <AiFillDislike />
                    Dislike
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Dropdown dat={dat} />
        <div className="container py-4 px-0">
          <div className="d-flex pb-4">
            <div className="trending-div py-2 px-4">
              You may also like <FaAngleRight />
            </div>
          </div>
          <Recommend
            data={recommend}
            tvdata={tvRecommentData}
            isMovie={isMovie}
          />
        </div>
      </div>
    </>
  );
};

export default Details;
