import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';
import Overview from './pages/Tours/Overview';
import Tour from './pages/Tours/Tour';
import CreateTour from './pages/Tours/createTour';
import CustomTour from './pages/Tours/CustomTour';
import Bookings from './pages/Tours/Bookings';
import UpdateTour from './pages/Tours/UpdateTour';
import Users from './pages/Users/Users';
import InvalidPath from './pages/InvalidPath';
import UpdateUser from './pages/Users/UpdateUser';

import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailure from './pages/PaymentFailure';
import { useState } from 'react';
const App = () => {
  const [user, setUser] = useState({});

  return (
    <Routes>
      <Route
        path="/"
        exact
        element={<Overview user={user} setUser={setUser} />}
      />
      <Route
        path="/login"
        exact
        element={<Login user={user} setUser={setUser} />}
      />
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/tours/:slug" element={<Tour />} />
      <Route path="/tour" element={<CreateTour />} />
      <Route path="/customtour" element={<CustomTour />} />
      <Route path="/bookings" exact element={<Bookings />} />
      <Route path="/users" exact element={<Users />} />
      <Route path="/updatetour/:slug" exact element={<UpdateTour />} />
      <Route path="/paymentSuccess" exact element={<PaymentSuccess />} />
      <Route path="/paymentFailure" exact element={<PaymentFailure />} />
      <Route path="/editprofile/:slug" exact element={<UpdateUser />} />
      <Route path="*" exact element={<InvalidPath />} />
    </Routes>
  );
};

export default App;
