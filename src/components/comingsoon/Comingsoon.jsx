import "../card/card.css";
import logo from "../../assets/logo.png";
import { img_500 } from "../../api/api";
import { useGetUpcomingMoviesQuery } from "../../service/moviesdata";
import { useNavigate } from "react-router-dom";
const Comingsoon = () => {
  const navigate = useNavigate();
  const clickhandler = (id) => {
    navigate(`/details/${id}`);
  };
  const { data, isLoading, error } = useGetUpcomingMoviesQuery(2);
  return (
    <div className="row">
      {data?.results.slice(0, 30).map((items) => {
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
  );
};

export default Comingsoon;
