import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import MainNav from '../components/layout/MainNav';
export default function InvalidPath() {
  return (
    <div>
      <MainNav />
      <h1 className="text-center m-5">
        <Link to="/">Invalid Path! Go to MainPage</Link>
      </h1>
      <Footer />
    </div>
  );
}
