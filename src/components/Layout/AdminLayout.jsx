import React, { useEffect } from 'react'
import { Link, Outlet, ScrollRestoration } from 'react-router-dom';
import Footer from '../shared/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import AdminNavbar from '../shared/Navbar/AdminNavbar';
import PrivateNavbar from '../shared/Navbar/PrivateNavbar';
import PublicNavbar from '../shared/Navbar/PublicNavbar';

const AdminLayout = () => {
    const { userAuth } = useSelector((state) => state.users);
  const { token } = useSelector((state) => state.account);

  const isAccountVerified = userAuth ? userAuth.isAccountVerified : true;

  const dispatch = useDispatch();
  
  return (
    <div>
      {userAuth ? (
        userAuth?.isAdmin ? (
          <AdminNavbar />
        ) : (
          <PrivateNavbar />
        )
      ) : (
        <PublicNavbar />
      )}

      {isAccountVerified===true ? (
        <p></p>
      ) : (
        <p className="bg-red-500 text-white px-[5%] py-1">
          Your account is not verified{" "}
          <Link
            to="/"
            onClick={() => dispatch(accVerificationSendTokenAction())}
            className="underline"
          >
            Click this link to verify
          </Link>
        </p>
      )}

      {token && (
        <p className="bg-green-500 text-white px-[5%] py-1">
          Email Sent. Check your mailbox
        </p>
      )}

      <div className="py-3 px-[5%]">
        {userAuth?.isAdmin ?<Outlet /> :<h1 className='text-center text-5xl font-bold h-[80vh]'>Admin Route. Access denied</h1>}
        <ScrollRestoration
          getKey={(location, matches) => {
            const paths = ["/posts/:id"];

            return paths.includes(location.pathname)
              ? location.pathname
              : location.key;
          }}
        />
      </div>
      <Footer />
    </div>
  )
}

export default AdminLayout
