import { Link } from "react-router-dom";
function Card(props) {
	return (
		<div className="card">
			<div className="card__header">
				<div className="card__picture">
					<div className="card__picture-overlay">&nbsp;</div>
					<img
						className="card__picture-img"
						src={props.coverImage}
						alt="Tour 1"
					/>
				</div>
				<h3 className="heading-tertirary">
					<span>{props.name}</span>
				</h3>
			</div>
			<div className="card__details">
				<h4 className="card__sub-heading">
					{props.difficulty} {props.duration}-day tour
				</h4>
				<p className="card__text">{props.summary}</p>
				<div className="card__data">
					<svg className="card__icon">
						<use href="assets/img/icons.svg#icon-map-pin"></use>
					</svg>
					<span>{props.startingLocation}</span>
				</div>
				<div className="card__data">
					<svg className="card__icon">
						<use href="assets/img/icons.svg#icon-calendar"></use>
					</svg>
					<span>April 2022</span>
				</div>
				<div className="card__data">
					<svg className="card__icon">
						<use href="assets/img/icons.svg#icon-flag"></use>
					</svg>
					<span>{props.stops} stops</span>
				</div>
				<div className="card__data">
					<svg className="card__icon">
						<use href="img/icons.svg#icon-user"></use>
					</svg>
					<span>{props.maxGroupSize}</span>
				</div>
			</div>
			<div className="card__footer">
				<p>
					<span className="card__footer-value">${props.price}</span>
					<span className="card__footer-text"> per person</span>
				</p>
				<p className="card__ratings">
					<span className="card__footer-value">{props.ratingsAverage} </span>
					<span className="card__footer-text">
						rating ({props.ratingsQuantity})
					</span>
				</p>
				<Link className="btn btn--green btn--small" to={"tours/" + props.slug}>
					Details
				</Link>
			</div>
		</div>
	);
}

export default Card;
