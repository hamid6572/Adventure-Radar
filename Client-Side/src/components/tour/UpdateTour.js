import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//let tour = {};
function Updatetour(props) {
  const [tour, setTour] = useState({});
  let { slug } = useParams();
  const navigate = useNavigate();
  const getTour = async () => {
    const response = await fetch(`http://localhost:8000/tours/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  };
  useEffect(() => {
    getTour().then((data) => {
      setTour(data[0]);
    });
  }, []);
  const priceRef = useRef();
  const durationRef = useRef();
  const maxGroupSizeRef = useRef();
  const startingLocation = useRef();
  const coverImage = useRef();
  let tourData = {};
  let err = new Error();
  function tourHandeler(event) {
    event.preventDefault();
    tourData = {
      user: localStorage.getItem('userId'),
      price: priceRef.current.value,
      duration: durationRef.current.value,
      maxGroupSize: maxGroupSizeRef.current.value,
      startingLocation: startingLocation.current.value,
      coverImage: coverImage.current.value,
    };

    fetch(`http://localhost:8000/updatetour/${tour._id}`, {
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
    navigate('/');
  }
  return (
    <Layout>
      <main className="main">
        <div className="singup-form">
          <h2 className="heading-secondary ma-bt-lg">update your tour!</h2>
          <form className="form form--signup" onSubmit={tourHandeler}>
            <div className="form__group">
              <label className="form__label" htmlFor="price">
                Price
              </label>
              <input
                className="form__input"
                id="price"
                type="number"
                min="1"
                defaultValue={tour.price}
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
                  type="number"
                  min="1"
                  defaultValue={tour.duration}
                  required=""
                  ref={durationRef}
                />
              </label>
            </div>
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="maxGroupSize">
                Group Maximum size
                <input
                  className="form__input"
                  id="maxGroupSize"
                  type="number"
                  min="1"
                  defaultValue={tour.maxGroupSize}
                  required=""
                  ref={maxGroupSizeRef}
                />
              </label>
            </div>
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="startingLocation">
                Starting Location
                <input
                  className="form__input"
                  id="startingLocation"
                  type="text"
                  defaultValue={tour.startingLocation}
                  required=""
                  ref={startingLocation}
                />
              </label>
            </div>
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="coverImage">
                Cover Image
                <input
                  className="form__input"
                  id="coverImage"
                  type="file"
                  defaultValue={tour.coverImage}
                  required=""
                  ref={coverImage}
                />
              </label>
            </div>
            <div className="form__group">
              <button className="btn btn--green">Update Tour</button>
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
export default Updatetour;
