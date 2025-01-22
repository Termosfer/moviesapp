import "./watchlist.css";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";

import img from "../../assets/2E1x1qcHqGZcYuYi4PzVZjzg8IV.webp";
const Watchlist = () => {
  return (
    <div className="main-div">
      <div className="container-fluid p-5 ">
        <div className="d-flex gap-5 watchlist text-white mb-4">
          <div className="">
            <img src={img} alt="" />
          </div>
          <div className="d-flex flex-column justify-content-evenly p-3">
            <div className="w-75">
              <div className="d-flex align-items-center gap-5">
                <h1>score</h1>
                <div className=" d-flex flex-column align-items-center">
                  <p>Wicked</p>
                  <p>November 20, 2024</p>
                </div>
              </div>
              <span >
                In the land of Oz, ostracized and misunderstood green-skinned
                Elphaba is forced to share a room with the popular aristocrat
                Glinda at Shiz University, and the two's unlikely friendship is
                tested as they begin to fulfill their respective destinies as
                Glinda the Good and the Wicked Witch of the West.
              </span>
            </div>
            <div className="d-flex gap-5 ">
              <div className="d-flex align-items-center gap-2 fs-5 favorite">
                <FaRegHeart className="fs-5"/>
                Favorite
              </div>
              <div className="d-flex align-items-center  gap-2 fs-5 remove">
                <IoCloseCircleOutline className="fs-3" />
                Remove
              </div>
            </div>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default Watchlist;
