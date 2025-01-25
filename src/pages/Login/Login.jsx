import "./login.css";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useCreateUserMutation, useGetUserMutation } from "../../service/login";
import toast, { Toaster } from "react-hot-toast";
const Login = ({ setShow, show }) => {
  const [closing, setClosing] = useState(false);
  const [currentForm, setCurrentForm] = useState("login");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newUser, { isLoading, error }] = useCreateUserMutation();
  const [user, { isLoading: userIsLoading, error: userError }] =
    useGetUserMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await newUser({ name, surname, email, password }).unwrap();
      setCurrentForm("login");
      toast.success("Successfully registered in!");
      setName("");
      setSurname("");
      setEmail("");
      setPassword("");
      
      setTimeout(() => {
        setShow(false); 
      }, 400);
    } catch (error) {
      toast.error("This didn't work.")
      
    }
  };
  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      await user({ email, password }).unwrap();
      toast.success("Successfully logged in!");
      setEmail("");
      setPassword("");
      setClosing(true);
      setTimeout(() => {
        setShow(false);
        setClosing(false);
      }, 400);
    } catch (error) {
      toast.error("Invalid username or password")
      
    }
  };

  {
    isLoading && userIsLoading && <p>Loading...</p>;
  }
  {
    error && userError && <p>Error: {error?.message}</p>;
  }
  const closeHandler = () => {
    setClosing(true);
    setTimeout(() => {
      setShow(false);
      setClosing(false);
    }, 400);
  };
  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    if (show) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [show]);

  const chooseForm = () => {
    setCurrentForm((prevForm) => (prevForm === "login" ? "register" : "login"));
  };

  return (
    <div className={`login ${closing ? "closing" : ""}`}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="d-flex gap-2 flex-column align-items-center pt-4  pb-3 form">
        <div className="header text-center">
          <h4>
            {currentForm === "login" ? "Welcome back!" : "Create an Account"}
          </h4>
          <IoClose className="close-icon" onClick={closeHandler} />
        </div>
        {currentForm === "login" ? (
          <form action="" className="pb-3 px-4" onSubmit={handlerSubmit}>
            <label htmlFor="email" className="pb-2">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              name="email"
              placeholder="name@gmail.com"
              className="py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password" className="pb-2 pt-3">
              PASSWORD
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
        ) : (
          <form action="" className="pb-3 px-4" onSubmit={submitHandler}>
            <label htmlFor="text" className="pb-2">
              NAME
            </label>
            <input
              type="text"
              name="text"
              placeholder="Name"
              className="py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="text" className="pb-2 pt-3">
              SURNAME
            </label>
            <input
              type="text"
              name="text"
              placeholder="Surname"
              className="py-2"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <label htmlFor="email" className="pb-2 pt-3">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              name="email"
              placeholder="name@gmail.com"
              className="py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password" className="pb-2 pt-3">
              PASSWORD
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
            />
            <button className="py-2 login-btn mt-4">Register</button>
          </form>
        )}
        {currentForm === "login" ? (
          <div className="footer">
            <h4>
              Don't have an account? <span onClick={chooseForm}> Register</span>
            </h4>
          </div>
        ) : (
          <div className="footer">
            <h4>
              Have an account?
              <span onClick={chooseForm}> Login</span>
            </h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
