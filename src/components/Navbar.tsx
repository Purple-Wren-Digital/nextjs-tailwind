import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuthContext } from '../context/AuthContext';
import { firebaseSignOut } from '../firebase/utils';

const Navbar = () => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);

  const handleSignIn = async () => {
    try {
      // await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <div className='flex h-20 w-full items-center justify-between border-b-2 p-2'>
      <ul className='flex'>
        <li className='cursor-pointer p-2'>
          <Link href='/'>Home</Link>
        </li>
        <li className='cursor-pointer p-2'>
          <Link href='/about'>About</Link>
        </li>

        {!user ? null : (
          <li className='cursor-pointer p-2'>
            <Link href='/profile'>Profile</Link>
          </li>
        )}
      </ul>

      {loading ? null : !user ? (
        <ul className='flex'>
          <li onClick={handleSignIn} className='cursor-pointer p-2'>
            Login
          </li>
          <li onClick={handleSignIn} className='cursor-pointer p-2'>
            Sign up
          </li>
        </ul>
      ) : (
        <div>
          <p>Welcome, {user.displayName}</p>
          <p className='cursor-pointer' onClick={handleSignOut}>
            Sign out
          </p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
