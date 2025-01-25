import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./header.css";
import {
  useGetMovieDetailsQuery,
  useGetSearchIdQuery,
  useGetTvDetailsQuery,
} from "../../service/moviesdata";
import { img_500 } from "../../api/api";
import { LuDot } from "react-icons/lu";
import { RiArrowDropRightLine } from "react-icons/ri";
import Login from "../../pages/Login/Login";
import { useGetProfileQuery } from "../../service/login";
import { FaUserCircle } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [show, setShow] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [currentpage, setCurrentpage] = useState(1);
  const { data, isloading, error } = useGetSearchIdQuery({
    query: search,
    page: currentpage,
  });

  const { data: userData, isLoading: isUserDataLoading } = useGetProfileQuery();
  /*   useEffect(() => {
    if (!isUserDataLoading && userData) {
      setUserName(userData.name); 
    }
  }, [userData, isUserDataLoading]); */

  /* if (isUserDataLoading) {
  return <span>loading...</span>
} */

  const clickHandler = () => {
    navigate(`searchpage?query=${search}&page=${currentpage}`);
    setSearch("");
  };
  const clickHandle = (id) => {
    navigate(`/details/${id}`);
    setSearch("");
  };

  const openHandler = (e) => {
    e.preventDefault();
    setShow(true);
  };
  const clickUserData = () => {
    setShowUserMenu(!showUserMenu);
  };
  const handlerProfile = (id) => {
    navigate(`/auth/login/profile/${id}`);
  };
  const removeHandler = () => {
    dispatch(localStorage.removeItem("token"));
    navigate("/");
    setShowUserMenu(false);
  };

  console.log(userData, "user");
  console.log(userName, "username");
  console.log(showUserMenu, "asd");
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid px-5">
          <Link to="/" className="d-flex align-items-center gap-2">
            <img src={logo} alt="logo" width={40} height={40} />
            <h4 className="h4">FreeMoviesWatch.cc</h4>
          </Link>
          <ul className="navbar-nav m-auto  mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/movies">
                Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tvshows">
                TvShows
              </Link>
            </li>
          </ul>
          <form className="d-flex w-25" role="search" onSubmit={openHandler}>
            <input
              className="form-control me-2 "
              type="search"
              placeholder="Enter Keywords..."
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {userData ? (
              <div className=" userdata" onClick={clickUserData}>
                {userData.name}
                {showUserMenu && (
                  <div className="userdata-submenu">
                    <div
                      onClick={() => handlerProfile(userData.id)}
                      className="d-flex align-items-center gap-1 submenu-datail"
                    >
                      <FaUserCircle />
                      Profile
                    </div>
                    <Link
                      to="/auth/login/watchlist"
                      className="d-flex align-items-center gap-1 submenu-datail"
                    >
                      <FaRegHeart />
                      Watchlist
                    </Link>
                    <Link
                      className="d-flex align-items-center gap-1 submenu-datail"
                      onClick={removeHandler}
                    >
                      <IoLogOutOutline />
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <button className="btn" type="submit">
                LOGIN
              </button>
            )}

            {
              <div className="w-100 d-flex flex-column search">
                {data &&
                  data?.results.slice(0, 4).map((item) => {
                    const releaseYear = new Date(
                      item.media_type == "tv"
                        ? item.first_air_date
                        : item.release_date
                    ).getFullYear();
                    return (
                      <div
                        className="d-flex align-items-center gap-3 p-2 sub-search"
                        key={item.id}
                        onClick={() => clickHandle(item.id)}
                      >
                        <div className="">
                          <img
                            src={img_500 + item.poster_path}
                            alt=""
                            className="search-img"
                          />
                        </div>
                        <div className="">
                          <p className="text-light my-2">
                            {item.media_type == "tv" ? item.name : item.title}
                          </p>
                          <div className="d-flex align-items-center gap-1 search-info">
                            <span className="search-info-span">
                              {releaseYear}
                            </span>
                            <LuDot className="search-info-span" />
                            <span className="search-info-span">93 min</span>
                            <LuDot className="search-info-span" />
                            <span className="search-info-span">
                              {item.media_type.slice(0, 1).toUpperCase() +
                                item.media_type.slice(1).toLowerCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                {data?.results.length > 0 && (
                  <div className="search-view" onClick={clickHandler}>
                    View all results <RiArrowDropRightLine className="fs-3" />
                  </div>
                )}
              </div>
            }
          </form>
        </div>
      </nav>
      {show && <Login setShow={setShow} show={show} />}
    </>
  );
};

export default Header;
