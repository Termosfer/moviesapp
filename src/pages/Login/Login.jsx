import { Link } from "react-router-dom";
import "./login.css";
import { IoClose } from "react-icons/io5";
const Login = ({ setshow, show }) => {
  const closeHandler = () => {
    setshow(false);
  };
  return (
    <div className="login">
      <div className="d-flex gap-2 flex-column align-items-center pt-4  pb-3 form">
        <div className="header text-center">
          <h4>Welcome back!</h4>
          <IoClose className="close-icon" onClick={closeHandler} />
        </div>
        <form action="" className="pb-3 px-4">
          <label htmlFor="email" className="pb-2">
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
          <div className=" py-3 d-flex aling-items-center justify-content-between">
            <div className=" gap-1 d-flex align-items-center">
              <input type="checkbox" name="" id="" className="check-box" />
              <span>Remember me</span>
            </div>
            <span className="form_forgot">Forgot password?</span>
          </div>
          <button className="py-2 login-btn">Login</button>
        </form>
        <div className="footer">
          <h4>
            Don't have an account?{" "}
            <Link to="/auth/register">
              <span> Register</span>
            </Link>{" "}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Login;
