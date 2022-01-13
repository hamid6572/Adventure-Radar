import { Link } from "react-router-dom";
import { useState } from "react";
function MainNav(props) {
	const [user, setUser] = useState(localStorage.getItem("Username"));

	const handleLogout = () => {
		localStorage.removeItem("Username");
		setUser(undefined);
	};

	return (
		<header className="header">
			<nav className="nav nav--tours">
				<a href="#" className="nav__el">
					Adventure Radar
				</a>
			</nav>
			<div className="header__logo">
				<img src="/assets/img/logo-white.png" alt="Natours logo" />
			</div>
			<nav className="nav nav--user">
				{user ? (
					<>
						<span className="nav__el">Hi, {user}!</span>
						<Link to="/" className="nav__el" onClick={handleLogout}>
							Logout
						</Link>
					</>
				) : (
					<>
						<Link to="/signup" className="nav__el">
							SignUp
						</Link>
						<Link to="/login" className="nav__el">
							{/* <img
								src="./assets/img/users/user-1.jpg"
								alt="User photo"
								className="nav__user-img"
							/> */}
							<span>Login</span>
						</Link>
					</>
				)}

				{/* <button class="nav__el">Log in</button>
                <button class="nav__el nav__el--cta">Sign up</button> */}
			</nav>
		</header>
	);
}
export default MainNav;
