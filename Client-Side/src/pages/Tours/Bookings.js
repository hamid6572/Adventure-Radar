import Layout from '../../components/layout/Layout';
import { useEffect, useState } from 'react';
import Booking from '../../components/bookings/Bookings';
import { ThreeDots } from 'react-loader-spinner';
import NotLogin from '../NotLogin';

function Bookings(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [bookingArray, setBooking] = useState([]);

  const getAllBookings = async () => {
    const response = await fetch('http://localhost:8000/getAllBookings', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  };
  useEffect(() => {
    getAllBookings().then((data) => {
      setBooking(data.Tours);
      setIsLoading(false);
    });
  }, []);

  const style = {
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  };

  return localStorage.getItem('userId') !== null ? (
    <Layout user={props.user}>
      {isLoading ? (
        <div style={style}>
          <ThreeDots type="ThreeDots" color="#55c57a" height={80} width={80} />
        </div>
      ) : (
        <div className="container">
          <h3 className="p-3 text-center"></h3>
          <table className="table table-striped table-bordered">
            <thead style={{ fontSize: '18px' }}>
              <tr>
                <th>
                  <i className="fas fa-user pr-1" />
                  Name
                </th>
                <th>
                  <i className="fas fa-envelope pr-1" />
                  Email
                </th>
                <th>Destination</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookingArray.map((booking) => (
                <Booking
                  name={booking.location}
                  price={booking.price}
                  createdAt={booking.createdAt}
                  username={booking.user.username}
                  paid={booking.paid ? 'paid' : 'pending'}
                  booking={booking}
                ></Booking>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  ) : (
    <NotLogin />
  );
}

export default Bookings;
