import { useNavigate } from 'react-router-dom';

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
          <li>
            <a
              href="#"
              className="text-primary"
              data-toggle="tooltip"
              title
              data-original-title="view"
            >
              <i className="far fa-eye" />
            </a>
          </li>
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
        </ul>
      </td>
    </tr>
  );
}
