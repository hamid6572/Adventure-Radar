import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
function Signup() {
  const usernameRef = useRef(); //reference to the form input of username
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  let err= new Error();
  function signupHandeler(event) {
    event.preventDefault();
    const userData = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    console.log(userData);
    fetch("http://localhost:8000/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      err.status = res.status;
      return res.json();
    })
    .then((data) => {
      if (err.status !== 200) {
        console.log(data.message);
        throw new Error("Failed to fetch user status.");
      }
      console.log("success");
      navigate("/login");
    })
    .catch((err) => console.log(err));
  }
  return (
    <Layout>
      <div>
        <main className="main">
          <div className="user-view">
            <nav className="user-view__menu">
              <ul className="side-nav">
                <li className="side-nav--active">
                  <a href="#">
                    <svg>
                      <use xlinkHref="assets/img/icons.svg#icon-settings" />
                    </svg>
                    Settings
                  </a>
                </li>
                <li>
                  <a href="#">
                    <svg>
                      <use xlinkHref="assets/img/icons.svg#icon-briefcase" />
                    </svg>
                    My bookings
                  </a>
                </li>
                <li>
                  <a href="#">
                    <svg>
                      <use xlinkHref="assets/img/icons.svg#icon-star" />
                    </svg>
                    My reviews
                  </a>
                </li>
                <li>
                  <a href="#">
                    <svg>
                      <use xlinkHref="assets/img/icons.svg#icon-credit-card" />
                    </svg>
                    Billing
                  </a>
                </li>
              </ul>
            </nav>
            <div className="user-view__content">
              <div className="user-view__form-container">
                <h2 className="heading-secondary ma-bt-md">Sign Up</h2>
                <form className="form form-user-data" onSubmit={signupHandeler}>
                  <div className="form__group">
                    <label className="form__label" htmlFor="name">
                      Name
                    </label>
                    <input
                      className="form__input"
                      id="name"
                      type="text"
                      defaultValue="Jonas Schmedtmann"
                      required="required"
                      ref={usernameRef}
                    />
                  </div>
                  <div className="form__group ma-bt-md">
                    <label className="form__label" htmlFor="email">
                      Email address
                    </label>
                    <input
                      className="form__input"
                      id="email"
                      type="email"
                      defaultValue="admin@natours.io"
                      required="required"
                      ref={emailRef}
                    />
                  </div>
                  <div className="form__group">
                    <label className="form__label" htmlFor="password">
                      New password
                    </label>
                    <input
                      className="form__input"
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      required="required"
                      minLength={8}
                      ref={passwordRef}
                    />
                  </div>
                  <div className="form__group form__photo-upload">
                    <img
                      className="form__user-photo"
                      src="./assets/img/users/user-1.jpg"
                      alt="User photo"
                    />
                    <a className="btn-text" href>
                      Choose new photo
                    </a>
                  </div>
                  <div className="form__group right">
                    <button className="btn btn--small btn--green">
                      Signup
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
export default Signup;
