'use client'
import React from 'react';
import Link from 'next/link';
import { useUser } from '@/app/context/UserContext';
import { UserMenuDropDown } from './UserMenuDropdown';

const Header = () => {

  const { user } = useUser();

  return (
    <header className="bg-gray-100 border-b border-gray-300 fixed w-full top-0 z-50 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800">emlakburada.com</Link>
        <div className="flex items-center space-x-4">
          <UserMenuDropDown />
          <span className="text-gray-800">{user.name}</span>
          <Link href="/my-ads">
            <p className="text-blue-500 hover:text-blue-700">İlanlarım</p>
          </Link>
          <Link href="/create-ad" className='bg-blue-500 px-4 py-2 hover:bg-blue-600'>
            <p className="text-white">İlan Ver</p>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
