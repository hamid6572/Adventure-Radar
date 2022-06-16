import { Link } from 'react-router-dom';
import { useState } from 'react';
function MainNav(props) {
  const [user, setUser] = useState(localStorage.getItem('Username'));

  const handleLogout = () => {
    localStorage.removeItem('Username');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    setUser(undefined);
  };

  return (
    <header className="header">
      <nav className="nav nav--tours">
        <Link className="nav__el" to="/">
          Adventure Radar
        </Link>
        {user ? <span className="nav__el">Hi, {user}!</span> : <></>}{' '}
      </nav>
      <div className="header__logo">
        <img src="/assets/img/logo-white.png" alt="Natours logo" />
      </div>
      <nav className="nav nav--user">
        {user ? (
          user == 'touragency1' ? (
            <>
              <Link to="/tour" className="nav__el">
                Create Tour
              </Link>
              <Link to="/" className="nav__el" onClick={handleLogout}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/bookings" className="nav__el">
                Bookings
              </Link>
              {user == 'admin' ? (
                <>
                  <Link to="/users" className="nav__el">
                    Users
                  </Link>
                </>
              ) : (
                <div>
                  <Link to="/customtour" className="nav__el">
                    Custom Tour
                  </Link>
                  <Link
                    to={`/editprofile/${localStorage.getItem('Username')}}`}
                    className="nav__el"
                  >
                    Edit Profile
                  </Link>
                </div>
              )}
              <Link to="/" className="nav__el ml-5" onClick={handleLogout}>
                Logout
              </Link>
            </>
          )
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
