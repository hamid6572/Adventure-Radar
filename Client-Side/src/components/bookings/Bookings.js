import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

export default function Bookings(props) {
  const navigate = useNavigate();
  const onDelete = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8000/deletebooking/${props.booking._id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    navigate('/');
  };

  const onStripeRedirection = async (e) => {
    const stripePromise = await loadStripe(
      'pk_test_51LBC7iF2SLIp0YJ6gtk6x2syeZq0t2Cv6tpRdIpXQL0InPuTLt5WPfUjj0ivyLdTSkyd8yYfwLkrcVNVMkSIFHQl009UOVFlpS'
    );

    const response = await fetch('http://localhost:8000/pay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: props.id }),
    });

    const data = await response.json();

    return stripePromise.redirectToCheckout({ sessionId: data.id });
  };
  return (
    <tr className="candidates-list" style={{ fontSize: '18px' }}>
      <td className="title">
        <div className="candidate-list-details">
          <div className="candidate-list-info">
            <div className="candidate-list-title">
              <p className="mb-0">
                <p>{props.username}</p>
              </p>
            </div>
          </div>
        </div>
      </td>
      <td className="candidate-list-favourite-time text-center">
        <div className="candidate-list-option">
          <p>{props.createdAt}</p>
        </div>
      </td>
      <td>
        <p>{props.name}</p>
      </td>
      <td>
        <ul
          className="list-unstyled mb-0"
          style={{
            display: 'flex',
            flexDirection: 'row',
            listStyle: 'none',
            fontSize: '18px',
          }}
        >
          <li class="ml-5">
            <button
              onClick={onDelete}
              className="text-danger"
              data-toggle="tooltip"
              title
              data-original-title="Delete"
            >
              <i className="far fa-trash-alt" />
            </button>
          </li>
          <li>
            <button onClick={onStripeRedirection}>Pay Now</button>
          </li>
        </ul>
      </td>
    </tr>
  );
}
