export default function Bookings(props) {
  return (
    <tr className="candidates-list">
      <td className="title">
        <div className="candidate-list-details">
          <div className="candidate-list-info">
            <div className="candidate-list-title">
              <h5 className="mb-0">
                <a href="#">{props.username}</a>
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
        <a className="candidate-list-favourite order-2 text-danger" href="#">
          <i className="fas fa-heart" />
        </a>
        <span className="candidate-list-time order-1">{props.paid}</span>
      </td>
      <td>
        <ul className="list-unstyled mb-0 justify-content-end" style={{display:"flex", flexDirection:"row", listStyle: "none"}}>
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
            <a
              href="#"
              className="text-danger"
              data-toggle="tooltip"
              title
              data-original-title="Delete"
            >
              <i className="far fa-trash-alt" />
            </a>
          </li>
        </ul>
      </td>
    </tr>
  );
}
