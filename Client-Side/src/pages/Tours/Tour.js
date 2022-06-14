/* eslint-disable react/jsx-no-undef */
import Layout from '../../components/layout/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { useState } from 'react';
import { toast } from 'react-toastify';
let tour = {};

function Tour(props) {
  let { slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(localStorage.getItem('Username'));
  const navigate = useNavigate();
  let err = new Error();

  const getTour = async () => {
    const response = await fetch(`http://localhost:8000/tours/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  };

  getTour().then((data) => {
    tour = data[0];
    console.log(tour);
    setIsLoading(false);
  });
  let bookingData;

  const onBooking = (event) => {
    event.preventDefault();
    bookingData = {
      tour: tour._id,
      user: localStorage.getItem('userId'),
      location: tour.name,
      price: tour.price,
    };
    console.log(bookingData);
    fetch('http://localhost:8000/booking', {
      method: 'POST',
      body: JSON.stringify(bookingData),
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
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
  console.log('assss', typeof tour.user, typeof localStorage.getItem('userId'));
  return (
    <Layout>
      {isLoading ? (
        <div style={style}>
          <ThreeDots type="ThreeDots" color="#55c57a" height={80} width={80} />
        </div>
      ) : (
        <div>
          <section className="section-header">
            <div className="header__herp">
              <div className="header__hero-overlay">&nbsp;</div>
              <img
                src={`../${tour.coverImage}`}
                alt="alt"
                className="header__hero-img"
              />
            </div>
            <div className="heading-box">
              <h1 className="heading-primary">
                <span>{tour.name}</span>
              </h1>
              <div className="heading-box__group">
                <div className="heading-box__detail">
                  <svg className="heading-box__icon">
                    <use xlinkHref="../assets/img/icons.svg#icon-clock" />
                  </svg>
                  <span className="heading-box__text">
                    {tour.duration} days
                  </span>
                </div>
                <div className="heading-box__detail">
                  <svg className="heading-box__icon">
                    <use xlinkHref="../assets/img/icons.svg#icon-map-pin" />
                  </svg>
                  <span className="heading-box__text">
                    {tour.startingLocation}
                  </span>
                </div>
              </div>
            </div>
          </section>
          <center>
            {tour.user !== localStorage.getItem('userId') ? (
              <button className="btn btn--green btn--small" onClick={onBooking}>
                Book Tour
              </button>
            ) : (
              <div>
                <button
                  className="btn btn--green btn--small"
                  onClick={onBooking}
                >
                  Update Tour
                </button>
                <button
                  className="btn btn--green btn--small"
                  onClick={onBooking}
                >
                  Delete Tour
                </button>
              </div>
            )}
          </center>
          <section className="section-description">
            <div className="overview-box">
              <div>
                <div className="overview-box__group">
                  <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
                  <div className="overview-box__detail">
                    <svg className="overview-box__icon">
                      <use xlinkHref="../assets/img/icons.svg#icon-calendar" />
                    </svg>
                    <span className="overview-box__label">Next date</span>
                    <span className="overview-box__text">April 2022</span>
                  </div>
                  <div className="overview-box__detail">
                    <svg className="overview-box__icon">
                      <use xlinkHref="../assets/img/icons.svg#icon-trending-up" />
                    </svg>
                    <span className="overview-box__label">Difficulty</span>
                    <span className="overview-box__text">Medium</span>
                  </div>
                  <div className="overview-box__detail">
                    <svg className="overview-box__icon">
                      <use xlinkHref="../assets/img/icons.svg#icon-user" />
                    </svg>
                    <span className="overview-box__label">Participants</span>
                    <span className="overview-box__text">
                      {tour.maxGroupSize} people
                    </span>
                  </div>
                  <div className="overview-box__detail">
                    <svg className="overview-box__icon">
                      <use xlinkHref="../assets/img/icons.svg#icon-star" />
                    </svg>
                    <span className="overview-box__label">Rating</span>
                    <span className="overview-box__text">
                      {tour.ratingsAverage} / 5
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="description-box">
              <h2 className="heading-secondary ma-bt-lg">
                About the {tour.name} tour
              </h2>
              <p className="description__text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
              <p className="description__text">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum!
              </p>
            </div>
          </section>

          <section className="section-pictures">
            <div className="picture-box">
              <img
                className="picture-box__img picture-box__img--1"
                src="../assets/img/tours/tour-1-1.jpg"
                alt="The Park Camper Tour 1"
              />
            </div>
            <div className="picture-box">
              <img
                className="picture-box__img picture-box__img--2"
                src="../assets/img/tours/tour-1-2.jpg"
                alt="The Park Camper Tour 1"
              />
            </div>
            <div className="picture-box">
              <img
                className="picture-box__img picture-box__img--3"
                src="../assets/img/tours/tour-1-3.jpg"
                alt="The Park Camper Tour 1"
              />
            </div>
          </section>
          <section className="section-map">
            <div id="map" />
          </section>
          <section className="section-reviews">
            <div className="reviews">
              <div className="reviews__card">
                <div className="reviews__avatar">
                  <img
                    src=".../assets/img/users/user-7.jpg"
                    alt="Jim Brown"
                    className="reviews__avatar-img"
                  />
                  <h6 className="reviews__user">Jim Brown</h6>
                </div>
                <p className="reviews__text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Cumque dignissimos sint quo commodi corrupti accusantium
                  veniam saepe numquam.
                </p>
                <div className="reviews__rating">
                  <svg className="reviews__star reviews__star--active">
                    <use xlinkHref="../assets/img/icons.svg#icon-star" />
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                    <use xlinkHref="../assets/img/icons.svg#icon-star" />
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                    <use xlinkHref="../assets/img/icons.svg#icon-star" />
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                    <use xlinkHref="../img/icons.svg#icon-star" />
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                    <use xlinkHref="../assets/img/icons.svg#icon-star" />
                  </svg>
                </div>
              </div>
              <div className="reviews__card">
                <div className="reviews__avatar">
                  <img
                    src="../assets/img/users/user-14.jpg"
                    alt="Laura Wilson"
                    className="reviews__avatar-img"
                  />
                  <h6 className="reviews__user">Laura Wilson</h6>
                </div>
                <p className="reviews__text">
                  Veniam adipisci blanditiis, corporis sit magnam aperiam ad,
                  fuga reiciendis provident deleniti cumque similique itaque
                  animi, sapiente obcaecati beatae accusantium.
                </p>
                <div className="reviews__rating">
                  <svg className="reviews__star reviews__star--active">
                    <use xlinkHref="../assets/img/icons.svg#icon-star" />
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                    <use xlinkHref="../assets/img/icons.svg#icon-star" />
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                    <use xlinkHref="../assets/img/icons.svg#icon-star" />
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                    <use xlinkHref="../assets/img/icons.svg#icon-star" />
                  </svg>
                  <svg className="reviews__star reviews__star--inactive">
                    <use xlinkHref="../assets/img/icons.svg#icon-star" />
                  </svg>
                </div>
              </div>
              <div className="reviews__card">
                <div className="reviews__avatar">
                  <img
                    src="../assets/img/users/user-15.jpg"
                    alt="Ben Hadley"
                    className="reviews__avatar-img"
                  />
                  <h6 className="reviews__user">Ben Hadley</h6>
                </div>
                <p className="reviews__text">
                  Debitis, nesciunt itaque! At quis officia natus. Suscipit,
                  reprehenderit blanditiis mollitia distinctio ducimus porro
                  tempore perspiciatis sunt vel.
                </p>
                <div className="reviews__rating">
                  <svg className="reviews__star reviews__star--active">
                    <use xlinkHref="../assets/img/icons.svg#icon-star" />
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                    <use xlinkHref="../assets/img/icons.svg#icon-star" />
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                    <use xlinkHref="../assets/img/icons.svg#icon-star" />
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                    <use xlinkHref="../assets/img/icons.svg#icon-star" />
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                    <use xlinkHref="../assets/img/icons.svg#icon-star" />
                  </svg>
                </div>
              </div>
              <div className="reviews__card">
                <div className="reviews__avatar">
                  <img
                    src="../assets/img/users/user-6.jpg"
                    alt="Alexander Jones"
                    className="reviews__avatar-img"
                  />
                  <h6 className="reviews__user">Alexander Jones</h6>
                </div>
                <p className="reviews__text">
                  Quaerat laborum eveniet ut aut maiores doloribus mollitia
                  aperiam quis praesentium sed inventore harum aliquam veritatis
                  at adipisci ea assumenda!
                </p>
                <div className="reviews__rating">
                  <svg className="reviews__star reviews__star--active">
                    <use xlinkHref="../assets/img/icons.svg#icon-star" />
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                    <use xlinkHref="../assets/img/icons.svg#icon-star" />
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                    <use xlinkHref="../assets/img/icons.svg#icon-star" />
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                    <use xlinkHref="../assets/img/icons.svg#icon-star" />
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                    <use xlinkHref="../assets/img/icons.svg#icon-star" />
                  </svg>
                </div>
              </div>
              <div className="reviews__card">
                <div className="reviews__avatar">
                  <img
                    src="../assets/img/users/user-3.jpg"
                    alt="Ayla Cornell"
                    className="reviews__avatar-img"
                  />
                  <h6 className="reviews__user">Ayla Cornell</h6>
                </div>
                <p className="reviews__text">
                  Perferendis quo aliquid iste quas laboriosam molestias illo
                  est voluptatem odit ea. Vero placeat culpa provident dicta
                  maiores!
                </p>
                <div className="reviews__rating">
                  <svg className="reviews__star reviews__star--active">
                    <use xlinkHref="../assets/img/icons.svg#icon-star" />
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                    <use xlinkHref="../assets/img/icons.svg#icon-star" />
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                    <use xlinkHref="../assets/img/icons.svg#icon-star" />
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                    <use xlinkHref="../assets/img/icons.svg#icon-star" />
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                    <use xlinkHref="../assets/img/icons.svg#icon-star" />
                  </svg>
                </div>
              </div>
            </div>
          </section>
          <section className="section-cta">
            <div className="cta">
              <div className="cta__img cta__img--logo">
                <img
                  src="../assets/img/logo-white.png"
                  alt="Natours logo"
                  className
                />
              </div>
              <img
                src="../assets/img/tours/tour-1-1.jpg"
                alt=""
                className="cta__img cta__img--1"
              />
              <img
                src="../assets/img/tours/tour-1-2.jpg"
                alt=""
                className="cta__img cta__img--2"
              />
              <div className="cta__content">
                <h2 className="heading-secondary">What are you waiting for?</h2>
                <p className="cta__text">
                  {tour.duration} days. Infinite memories. Make it yours today!
                </p>
                <button className="btn btn--green span-all-rows">
                  Book tour now!
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </Layout>
  );
}
export default Tour;
