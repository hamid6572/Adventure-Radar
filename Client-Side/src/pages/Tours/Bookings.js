import Layout from '../../components/layout/Layout';
import { useEffect, useState } from 'react';
import Booking from '../../components/bookings/Bookings';
import { ThreeDots } from 'react-loader-spinner';

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

  return (
    <Layout user={props.user}>
      <div
        className="card-container"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {isLoading ? (
          <div style={style}>
            <ThreeDots
              type="ThreeDots"
              color="#55c57a"
              height={80}
              width={80}
            />
          </div>
        ) : (
          bookingArray.map((booking) => {
            <>{booking.location}</>;
            console.log(booking);
            return (
              <Booking
                name={booking.location}
                price={booking.price}
                createdAt={booking.createdAt}
                username={booking.user.username}
                paid={booking.paid ? 'paid' : 'pending'}
                booking={booking}
              ></Booking>
            );
          })
        )}
      </div>
    </Layout>
  );
}

export default Bookings;
