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
    <div>
      <div className="container mt-3 mb-4">
        <div className="col-lg-9 mt-4 mt-lg-0">
          <div className="row">
            <div className="col-md-12">
              <div className="user-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm">
                <table
                  className="table manage-candidates-top mb-0"
                  style={{ fontSize: '22px' }}
                >
                  <thead>
                    <tr>
                      <th>Tourist Name</th>
                      <th className="text-center">Status</th>
                      <th className="action text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="candidates-list">
                      <td className="title">
                        <div className="candidate-list-details">
                          <div className="candidate-list-info">
                            <div className="candidate-list-title">
                              <h5 className="mb-0">
                                <p>{props.username}</p>
                              </h5>
                            </div>
                            <div className="candidate-list-option">
                              <ul className="list-unstyled">
                                <li>
                                  <i className="fas fa-filter pr-1" />
                                  {props.createdAt}
                                </li>
                                <li>
                                  <i className="fas fa-map-marker-alt pr-1" />
                                  {props.name}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="candidate-list-favourite-time text-center">
                        <a
                          className="candidate-list-favourite order-2 text-danger"
                          href="#"
                        >
                          <i className="fas fa-heart" />
                        </a>
                        <span className="candidate-list-time order-1">
                          {props.paid}
                        </span>
                      </td>
                      <td>
                        <ul
                          className="list-unstyled mb-0 justify-content-end"
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            listStyle: 'none',
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
                          <li>
                            <a
                              href="#"
                              className="text-info"
                              data-toggle="tooltip"
                              title
                              data-original-title="Edit"
                            >
                              <i className="fas fa-pencil-alt" />
                            </a>
                          </li>
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
                        </ul>
                      </td>
                    </tr>
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
}
