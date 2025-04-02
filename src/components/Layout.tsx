import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer'; // Keep Footer for now, can be removed if not needed

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50"> {/* Added bg color */}
      <Header />
      <main className="flex-grow">
        <Outlet /> {/* Page content will be rendered here */}
      </main>
      {/* Consider removing Footer if it's not part of the internal app design */}
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
