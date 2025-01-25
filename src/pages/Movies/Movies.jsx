import { FaAngleRight, FaFilter } from "react-icons/fa6";
import Paginationn from "../../components/pagination/Pagination";
import { useGetNowPlayingMoviesQuery } from "../../service/moviesdata";
import { useEffect, useState } from "react";
import { img_500 } from "../../api/api";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Filter from "../../components/filter/Filter";
import { useGetFilteredContentQuery } from "../../service/filter";
const Movies = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [currentpage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useGetNowPlayingMoviesQuery(currentpage);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [triggerFilter, setTriggerFilter] = useState(false);
  const {
    data: filteredData,
    isLoading: isFilteredLoading,
    error: filteredError,
    isSuccess   } = useGetFilteredContentQuery({
    page: currentpage,
    type: selectedType === "all" ? "movie" : selectedType,
    year: selectedYear,
  },  { skip: !triggerFilter });
  console.log(filteredData, "filteredData")
  console.log(data, "data")
useEffect(()=>{
  if (isSuccess) {
    setTriggerFilter(false)
  }
},[isSuccess])


  const handlePageChange = (pagenumber) => {
    setCurrentPage(pagenumber);
  };

  const clickhandler = (id) => {
    navigate(`/details/${id}`);
    window.scrollTo(0, 0);
  };

  const openHandler = () => {
    setOpen(!open);
  };
  const handleFilterSubmit = (event) => {
    event.preventDefault(); 
    setTriggerFilter(true); 
    setOpen(false)
  };
  return (
    <div className="main-div">
      <div className="container-fluid px-5 py-4">
        <div className="d-flex align-items-center justify-content-between pt-3 pb-4">
          <div className="trending-div py-2 px-4">
            Now Playing
            <FaAngleRight />
          </div>
          <div className="filter" onClick={openHandler}>
            <FaFilter />
            Filter
          </div>
        </div>
        {open ? (
          <Filter
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            handleFilterSubmit ={handleFilterSubmit}
            setOpen={setOpen}
          />
        ) : (
          ""
        )}
        <Paginationn
          handlePageChange={handlePageChange}
          currentpage={currentpage}
          totalPages={triggerFilter ? filteredData?.total_pages : data?.total_pages}
        />
        <div className="row">
          {(triggerFilter ? filteredData : data)?.results.map((items) => {
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
          totalPages={triggerFilter ? filteredData?.total_pages : data?.total_pages}
        />
      </div>
    </div>
  );
};

export default Movies;
