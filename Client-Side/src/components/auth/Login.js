import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../popup/Modal";
import Backdrop from "../popup/Backdrop";
import Layout from "../layout/Layout";
function Login() {
  const emailRef = useRef(); //reference to the form input of email
  const passwordRef = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate(); //auto navigate on login click
  function loginHandeler(event) {
    let err = new Error();
    event.preventDefault();
    const userData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    console.log(userData);
    fetch("http://localhost:8000/auth/login", {
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
        navigate("/overview");
      })
      .catch((err) => console.log(err));
  }
  function loginClickHandeler() {
    setModalIsOpen(true);
  }
  function closeModalHandler() {
    setModalIsOpen(false);
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
                <h2 className="heading-secondary ma-bt-md">Login</h2>
                <form className="form form-user-data" onSubmit={loginHandeler}>
                  <div className="form__group ma-bt-md">
                    <label className="form__label" htmlFor="email">
                      Email address
                    </label>
                    <input
                      className="form__input"
                      id="email"
                      type="email"
                      placeholder="Email Address"
                      required="required"
                      ref={emailRef}
                    />
                  </div>
                  <div className="form__group">
                    <label className="form__label" htmlFor="password">
                      Password
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
                  <div className="form__group right">
                    <button
                      className="btn btn--small btn--green"
                      onClick={loginClickHandeler}
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
              <div className="line">&nbsp;</div>
            </div>
            {/* {modalIsOpen && <Modal onCancel={closeModalHandler} onConfirm={closeModalHandler}/>}
             {modalIsOpen && <Backdrop onCancel={closeModalHandler} />}   */}
          </div>
        </main>
      </div>
    </Layout>
  );
}
export default Login;
