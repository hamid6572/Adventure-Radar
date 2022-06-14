import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login(props) {
  const emailRef = useRef(); //reference to the form input of email
  const passwordRef = useRef();
  const navigate = useNavigate(); //auto navigate on login click

  function loginHandler(event) {
    let err = new Error();
    event.preventDefault();

    const userData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        err.status = res.status;
        return res.json();
      })
      .then((data) => {
        if (err.status !== 200) {
          throw new Error('Failed to fetch user status.');
        }
        localStorage.setItem('Username', data.userName);
        localStorage.setItem('userId', data.userId);
        console.log('success');
        navigate('/');
      })
      .catch((err) => {
        toast.error('Incorrect email/password !', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }

  return (
    <Layout>
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
        <form className="form form--login">
          <div className="form__group">
            <label className="form__label" htmlFor="email">
              Email address
            </label>
            <input
              className="form__input"
              id="email"
              type="email"
              placeholder="you@example.com"
              required="required"
              ref={emailRef}
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="password">
              Password
            </label>
            <input
              className="form__input"
              id="password"
              type="password"
              placeholder="••••••••"
              required="required"
              minLength="8"
              ref={passwordRef}
            />
          </div>
          <div className="form__group">
            <button className="btn btn--green" onClick={loginHandler}>
              Login
            </button>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </form>
      </div>
    </Layout>
  );
}
export default Login;
