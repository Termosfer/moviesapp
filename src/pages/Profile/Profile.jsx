import { useState } from "react";
import { useGetProfileQuery } from "../../service/login";
import "./profile.css";
import { useParams } from 'react-router-dom';
const Profile = () => {
  const {id} = useParams()
 
console.log(id,"idd")
  const { user, data: userData, isLoading: isUserDataLoading } = useGetProfileQuery();
  console.log(userData, "data")
const [name, setName] = useState(userData?.name)
const [surname, setSurname] = useState(userData?.surname)
const [email, setEmail] = useState(userData?.email)
const [address, setAddress] = useState(userData?.address)
console.log(name, surname, email, address)
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
              <input type="text" name="name" className="" value={name}/>
              <label htmlFor="text">SURNAME</label>
              <input type="text" name="text" value={surname}/>
            </div>
            <div className="d-flex flex-column ">
              <label htmlFor="email">EMAIL ADDRESS</label>
              <input type="email" name="email" value={email}/>
              <label htmlFor="text">ADDRESS</label>
              <input type="text" name="text" value={address}/>
            </div>
          </form>
          <button type="submit" className="btn">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
