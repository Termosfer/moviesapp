import { Link } from "react-router-dom";
import "./login.css";
import { IoClose } from "react-icons/io5";
const Register = () => {
 
  return (
    <div className="login">
      <div className="d-flex gap-2 flex-column align-items-center pt-4  pb-3 form">
        <div className="header text-center">
          <h4>Create an Account</h4>
          <IoClose className="close-icon" />
        </div>
        <form action="" className="pb-3 px-4">
          <label htmlFor="text" className="pb-2">
            YOUR NAME
          </label>
          <input
            type="text"
            name="text"
            placeholder="Name"
            className="py-2"
          />
          <label htmlFor="email" className="pb-2 pt-3">
            EMAIL ADDRESS
          </label>
          <input
            type="email"
            name="email"
            placeholder="name@gmail.com"
            className="py-2"
          />
          <label htmlFor="password" className="pb-2 pt-3">
            PASSWORD
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="py-2"
          />
           <label htmlFor="password" className="pb-2 pt-3">
            CONFIRM PASSWORD
          </label>
          <input
            type="password"
            name="password"
            placeholder="Confirm Password"
            className="py-2"
          />
          <button className="py-2 login-btn mt-4">Register</button>
        </form>
        <div className="footer">
          <h4>
            Have an account?
            <Link to="/auth/login">
              <span> Login</span>
            </Link>{" "}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Register;
