import "./profile.css";
const Profile = () => {
  return (
    <div className="main-div">
      <div className="container-fluid p-5 ">
        <div className="px-4 py-4 profile-container">
          <h3 className="text-white">Update Profile</h3>
          <form action="" className="text-white d-flex">
            <div className="d-flex flex-column">
              <label htmlFor="name" className="">
                YOUR NAME
              </label>
              <input type="text" name="name" className=""/>
              <label htmlFor="email">EMAIL ADDRESS</label>
              <input type="email" name="email" />
            </div>
            <div className="d-flex flex-column ">
              <label htmlFor="password">NEW PASSWORD</label>
              <input type="password" name="password" />
              <label htmlFor="password">CONFIRM NEW PASSWORD</label>
              <input type="password" name="password" />
            </div>
          </form>
          <button type="submit" className="btn">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
