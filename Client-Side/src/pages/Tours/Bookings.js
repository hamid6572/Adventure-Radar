import Layout from '../../components/layout/Layout';
import { useEffect, useState } from 'react';
import Booking from '../../components/bookings/Bookings';
import { ThreeDots } from 'react-loader-spinner';

let bookingArray;

function Bookings(props) {
  const [isLoading, setIsLoading] = useState(true);

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
      console.log(data.Tours);
      bookingArray = data.Tours;
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
      <div className="card-container">
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
            return (
              <div>
                <div className="container mt-3 mb-4">
                  <div className="col-lg-9 mt-4 mt-lg-0">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="user-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm">
                          <table className="table manage-candidates-top mb-0">
                            <thead>
                              <tr>
                                <th>Tourist Name</th>
                                <th className="text-center">Status</th>
                                <th className="action text-right">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <Booking
                                name={booking.location}
                                price={booking.price}
                                createdAt={booking.createdAt}
                                username={booking.user.username}
                                paid={booking.paid ? 'paid' : 'pending'}
                              ></Booking>
                              <br />
                              <th></th>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Layout>
  );
}

export default Bookings;
