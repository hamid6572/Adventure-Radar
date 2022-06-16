import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import MainNav from '../components/layout/MainNav';


export default function PaymentFailure() {
  return (
    <div style={{}}>
      <MainNav />
      <h4 className="text-center m-5" style={{fontSize:'22px', color: 'crimson'}}>
        Error making the payment :(
        <br /><br />
        <Link to="/">Go to home</Link>
      </h4>
      <Footer />
    </div>
  );
}
