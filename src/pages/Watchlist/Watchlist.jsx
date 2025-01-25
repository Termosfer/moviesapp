import "./watchlist.css";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaArrowDownAZ, FaArrowUpAZ } from "react-icons/fa6";

import { useEffect, useState } from "react";
import { img_500 } from "../../api/api";
const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [filteredWatchlist, setFilteredWatchlist] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [color, setColor] = useState("#07ab4c");
  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(savedWatchlist);
    setFilteredWatchlist(savedWatchlist);
  }, []);

  useEffect(() => {
    const sortedList = [...filteredWatchlist];
    if (sortOrder === "asc") {
      sortedList.sort((a, b) => {
        const nameA = a.title || a.name || "";
        const nameB = b.title || b.name || "";
        return nameA.localeCompare(nameB);
      });
    } else {
      sortedList.sort((a, b) => {
        const nameA = a.title || a.name || "";
        const nameB = b.title || b.name || "";
        return nameB.localeCompare(nameA);
      });
    }

    setWatchlist(sortedList);
  }, [sortOrder, filteredWatchlist]);
  console.log(filteredWatchlist, "filter");

  const removeHander = (id) => {
    const filteredData = watchlist.filter((watch) => watch.id !== id);
    setWatchlist(filteredData);
    setFilteredWatchlist(filteredData);
    localStorage.setItem("watchlist", JSON.stringify(filteredData));
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const textColor = (score) => {
    if (score <= 5 && color !== "#dc3546") {
      setColor("#dc3546"); 
    } else if (score > 6 && score <= 10 && color !== "#07ab4c") {
      setColor("#07ab4c"); 
    }
    return score;
  };
  return (
    <div className="main-div">
      <div className="container-fluid p-5 ">
        <div className="text-white  text-end py-2">
          <button
            className="btn"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            Filter by Name:{" "}
            {sortOrder === "asc" ? <FaArrowDownAZ /> : <FaArrowUpAZ />}
          </button>
        </div>
        {watchlist?.map((list) => {
          return (
            <div
              key={list.id}
              className="d-flex gap-5 watchlist text-white mb-4"
            >
              <div className="">
                <img src={img_500 + list.poster_path} alt="" />
              </div>
              <div className="d-flex flex-column gap-2 p-3">
                <div className="w-75 d-flex flex-column gap-3">
                  <div className="d-flex align-items-center gap-5">
                    <div className="p-2 fs-4 " style={{backgroundColor: color, border:`1px solid ${color}`, borderRadius:"50%",}}>{textColor(list.vote_average.toFixed(1))}</div>
                    <div className=" d-flex flex-column align-items-center">
                      <h4 className="wathclistName">{list.title || list.name}</h4>
                      <span className="date">
                        {formatDate(list.release_date || list.last_air_date)}
                      </span>
                    </div>
                  </div>
                  <span className="overview">{list.overview}</span>
                </div>
                <div className="d-flex gap-5 ">
                  <div className="d-flex align-items-center gap-2 fs-5 favorite">
                    <FaRegHeart className="fs-5" />
                    Favorite
                  </div>
                  <div
                    className="d-flex align-items-center  gap-2 fs-5 remove"
                    onClick={() => removeHander(list.id)}
                  >
                    <IoCloseCircleOutline className="fs-3" />
                    Remove
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Watchlist;
