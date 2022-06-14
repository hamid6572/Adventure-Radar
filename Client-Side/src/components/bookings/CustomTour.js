import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Createtour(props) {
  const priceRef = useRef();
  const locationRef = useRef();
  const durationRef = useRef();
  const personsRef = useRef();
  const pickupPointRef = useRef();
  const navigate = useNavigate();
  let err = new Error();
  let tourData;
  function bookTourHandeler(event) {
    event.preventDefault();
    tourData = {
      price: priceRef.current.value,
      location: locationRef.current.value,
      duration: durationRef.current.value,
      persons: personsRef.current.value,
      pickupPoint: pickupPointRef.current.value,
      user: localStorage.getItem('userId'),
    };
    event.preventDefault();
    console.log(tourData);
    fetch('http://localhost:8000/custombooking', {
      method: 'POST',
      body: JSON.stringify(tourData),
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
          console.log(data.message);
          throw new Error('Failed to fetch tour status.');
        }
        console.log('success');
        navigate('/bookings');
      })
      .catch((err) => {
        toast.error('Validation failed', {
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
      <main className="main">
        <div className="singup-form">
          <h2 className="heading-secondary ma-bt-lg">
            create your custom tour!
          </h2>
          <form className="form form--signup" onSubmit={bookTourHandeler}>
            <div className="form__group">
              <label className="form__label" htmlFor="name">
                Tour Location
              </label>
              <input
                className="form__input"
                id="name"
                type="text"
                placeholder=""
                required=""
                ref={locationRef}
              />
            </div>
            <div className="form__group">
              <label className="form__label" htmlFor="price">
                Price
              </label>
              <input
                className="form__input"
                id="price"
                type="text"
                placeholder=""
                required=""
                ref={priceRef}
              />
            </div>

            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="duration">
                Duration
                <input
                  className="form__input"
                  id="duration"
                  type="text"
                  placeholder=""
                  required=""
                  ref={durationRef}
                />
              </label>
            </div>
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="maxGroupSize">
                Persons
                <input
                  className="form__input"
                  id="maxGroupSize"
                  type="text"
                  placeholder=""
                  required=""
                  ref={personsRef}
                />
              </label>
            </div>
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="startingLocation">
                Pickup Point
                <input
                  className="form__input"
                  id="startingLocation"
                  type="text"
                  placeholder=""
                  required=""
                  ref={pickupPointRef}
                />
              </label>
            </div>
            <div className="form__group">
              <button className="btn btn--green">Book Tour</button>
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
export default Createtour;
