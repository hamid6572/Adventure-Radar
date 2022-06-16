import { useNavigate } from 'react-router-dom';
let bookingArray = [];
export default function Users(props) {
  let toBeDeletedBookings = [];

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
  getAllBookings().then((data) => {
    bookingArray = data.Tours;
    return bookingArray;
  });
  console.log(bookingArray);
  console.log(props.user);

  console.log(toBeDeletedBookings);
  const navigate = useNavigate();
  const onDelete = (event) => {
    event.preventDefault();
    bookingArray.forEach((booking) => {
      if (booking.user._id == props.user._id) {
        console.log(booking);
        fetch(`http://localhost:8000/deletebooking/${booking._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    });
    // fetch(`http://localhost:8000/booking/${props.user.username}`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     booking = data[0];
    //   });
    // console.log(booking);

    fetch(`http://localhost:8000/users/deleteuser/${props.user._id}`, {
      mode: 'no-cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {});
    navigate('/');
  };
  return (
    <tr className="candidates-list" style={{ fontSize: '18px' }}>
      <td className="title">
        <div className="candidate-list-details">
          <div className="candidate-list-info">
            <div className="candidate-list-option">
              <ul className="list-unstyled">
                <li style={{ listStyle: 'none' }}>{props.name}</li>
              </ul>
            </div>
          </div>
        </div>
      </td>
      <td className="candidate-list-favourite-time">
        <span className="candidate-list-time order-1">{props.email}</span>
      </td>
      <td>
        <ul
          className="list-unstyled mb-0 d-flex"
          style={{
            display: 'flex',
            flexDirection: 'row',
            listStyle: 'none',
          }}
        >
          {props.user.username !== 'admin' ? (
            <li>
              <button
                onClick={onDelete}
                className="text-danger custom-btn"
                data-toggle="tooltip"
                title
                data-original-title="Delete"
              >
                <i className="far fa-trash-alt" />
              </button>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </td>
    </tr>
  );
}
