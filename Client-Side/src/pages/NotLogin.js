import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import MainNav from '../components/layout/MainNav';

export default function NotLogin() {
  return (
    <div>
      <MainNav />
      <h1 className="text-center m-5">
        <Link to="/login">Click to login</Link>
      </h1>
      <Footer />
    </div>
  );
}
