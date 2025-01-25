import "./filter.css";
import { IoIosSearch, IoMdClose } from "react-icons/io";

const Filter = ({
  selectedType,
  setSelectedType,
  selectedYear,
  setSelectedYear,
  handleFilterSubmit, 
  setOpen
}) => {
 
  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };
  const handleReset = () => {
    setSelectedType("all");
    setSelectedYear("2025");
setOpen(false)
  };
 

  return (
    <div className="container-fluid p-3 text-white filter-section">
      <form onSubmit={handleFilterSubmit}>
        <div className="d-flex flex-column gap-4">
          <div className="d-flex align-items-center gap-3">
            <span>Type:</span>
            <label htmlFor="type" className="d-flex align-items-center gap-1">
              <input
                type="radio"
                name="type"
                required
                className="radio"
                onChange={() => handleTypeChange("all")}
              />
              All
            </label>
            <label htmlFor="type" className="d-flex align-items-center gap-1">
              <input
                type="radio"
                name="type"
                required
                className="radio"
                checked={selectedType === "movie"}
                onChange={() => handleTypeChange("movie")}
              />
              Movie
            </label>
            <label htmlFor="type" className="d-flex align-items-center gap-1">
              <input
                type="radio"
                name="type"
                required
                className="radio"
                checked={selectedType === "tv"}
                onChange={() => handleTypeChange("tv")}
              />
              TV
            </label>
          </div>
          <div className="d-flex align-items-center gap-3">
            <span>Released:</span>
            {["All", "2025", "2024", "2023", "2022", "2021", "older"].map(
              (year) => (
                <label key={year}>
                  <input
                    type="radio"
                    name="year"
                    checked={selectedYear === year}
                    onChange={() => handleYearChange(year)}
                  />
                  {year}
                </label>
              )
            )}
          </div>
          <div></div>
          <div className="d-flex gap-3">
            <button type="submit" className=" filter-btn green">
              <IoIosSearch className="search" />
              Filter
            </button>
            <button className=" filter-btn">
              <IoMdClose className="search" onClick={handleReset} />
              Close
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Filter;
