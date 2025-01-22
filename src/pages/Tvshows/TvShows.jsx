import { useGetNowPlayingTvQuery } from '../../service/moviesdata'
import { FaAngleRight, FaFilter } from "react-icons/fa6";
import Paginationn from "../../components/pagination/Pagination";
import "../../components/card/card.css"
import { useState } from "react";
import { img_500 } from "../../api/api";
import {  useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png"
const TvShows = () => {
  const navigate = useNavigate();
  const [currentpage, setCurrentPage] = useState(1);
   const {data, isLoading, error} = useGetNowPlayingTvQuery(currentpage)

  const handlePageChange = (pagenumber) => {
    setCurrentPage(pagenumber);
  };

  const clickhandler = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div className="main-div">
      <div className="container-fluid px-5 py-4">
        <div className="d-flex align-items-center justify-content-between pt-3 pb-4">
          <div className="trending-div py-2 px-4">
            Now Playing
            <FaAngleRight />
          </div>
          <div className="filter">
            <FaFilter />
            Filter
          </div>
        </div>
        <Paginationn
          handlePageChange={handlePageChange}
          currentpage={currentpage}
          totalPages={data?.total_pages}
        />
        <div className="row">
          {
            data?.results.map((items) => {
              return (
                <div
                  className="card "
                  key={items.id}
                  onClick={() => clickhandler(items.id)}
                >
                  <img
                    src={img_500 + items.poster_path}
                    className="card-img"
                    alt="..."
                  />
                  <div className="cover-img">
                    <img src={logo} alt="" className="cover-logo" />
                  </div>
                  <div className="card-img-overlay">
                    <p className="card-text">{items.title}</p>
                  </div>
                </div>
              );
            })}
        </div>
        <Paginationn
          handlePageChange={handlePageChange}
          currentpage={currentpage}
          totalPages={data?.total_pages}
        />
      </div>
    </div>
  )
}

export default TvShows