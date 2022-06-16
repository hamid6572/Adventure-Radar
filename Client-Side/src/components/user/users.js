import { useNavigate } from 'react-router-dom';

export default function Users(props) {
  const navigate = useNavigate();
  const onDelete = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8000/users/deleteuser/${props.user._id}`, {
      mode: 'no-cors',
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
                className="text-danger"
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
