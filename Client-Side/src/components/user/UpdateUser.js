import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//let tour = {};
function UpdateUser(props) {
  const navigate = useNavigate();

  const usernameRef = useRef();
  const passwordRef = useRef();
  let userData = {};
  let err = new Error();
  function userUpdateHandeler(event) {
    event.preventDefault();
    userData = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    fetch(
      `http://localhost:8000/users/updateuser/${localStorage.getItem(
        'userId'
      )}`,
      {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => {
        err.status = res.status;
        return res.json();
      })
      .then((data) => {
        if (err.status !== 200) {
          throw new Error('Invalid Input');
        }
        console.log('success');
      })
      .catch((err) => {
        toast.error(`${err}`, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    localStorage.setItem('Username', usernameRef.current.value);

    navigate('/');
  }

  return (
    <Layout>
      <main className="main">
        <div className="singup-form">
          <h2 className="heading-secondary ma-bt-lg">create your account!</h2>
          <form className="form form--signup" onSubmit={userUpdateHandeler}>
            <div className="form__group">
              <label className="form__label" htmlFor="name">
                Your name
              </label>
              <input
                className="form__input"
                id="name"
                type="text"
                placeholder=""
                required=""
                defaultValue={localStorage.getItem('Username')}
                ref={usernameRef}
              />
            </div>

            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="password">
                New Password
                <input
                  className="form__input"
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required=""
                  minLength="8"
                  ref={passwordRef}
                />
              </label>
            </div>

            <div className="form__group">
              <button className="btn btn--green">Update User</button>
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
      </main>
    </Layout>
  );
}
export default UpdateUser;
